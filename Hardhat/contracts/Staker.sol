// SPDX-License-Identifier: MIT
pragma solidity 0.8.4; //Do not change the solidity version as it negativly impacts submission grading

import "hardhat/console.sol";
import "./ExampleExternalContract.sol";

contract Staker {
	ExampleExternalContract public exampleExternalContract;

	constructor(address exampleExternalContractAddress) {
		exampleExternalContract = ExampleExternalContract(
			exampleExternalContractAddress
		);
	}

	mapping(address => uint256) public balances;

	uint256 public constant threshold = 1 ether;
	uint256 public deadline = block.timestamp + 5 days;
	// Boolean to track whether withdrawals are allowed
	bool public openForWithdraw = false;

	// Event to log staking actions
	event Stake(address indexed user, uint256 amount);

	// Modifier to check if the external contract has NOT completed its task
	modifier notCompleted() {
		require(
			!exampleExternalContract.completed(),
			"Execution already completed!"
		);
		_;
	}

	// Collect funds in a payable `stake()` function and track individual `balances` with a mapping:
	function stake() public payable notCompleted {
		// Ensure some ETH is being sent
		require(msg.value > 0, "Must send ETH to stake");

		// Update the user's balance with the amount staked
		balances[msg.sender] += msg.value;

		// Emit an event for logging the staking action (optional but recommended)
		emit Stake(msg.sender, msg.value);
	}

	// (Make sure to add a `Stake(address,uint256)` event and emit it for the frontend `All Stakings` tab to display)

	// After some `deadline` allow anyone to call an `execute()` function
	// If the deadline has passed and the threshold is met, it should call `exampleExternalContract.complete{value: address(this).balance}()`

	// If the `threshold` was not met, allow everyone to call a `withdraw()` function to withdraw their balance

	// Execute function to check the threshold and perform actions
	function execute() public notCompleted {
		// Ensure the deadline has passed
		require(
			block.timestamp >= deadline,
			"Deadline has not been reached yet"
		);

		// Check if the contract's balance has met or exceeded the threshold
		if (address(this).balance >= threshold) {
			// If threshold is met, call the external contract's complete() method
			exampleExternalContract.complete{ value: address(this).balance }();
		} else {
			// If threshold is not met, open withdrawals
			openForWithdraw = true;
		}
	}

	// Function for users to withdraw their staked funds if the threshold is not met (optional for later)
	function withdraw() public notCompleted {
		// Ensure withdrawals are allowed
		require(openForWithdraw, "Withdrawals are not open yet");

		// Ensure the user has a balance to withdraw
		uint256 userBalance = balances[msg.sender];
		require(userBalance > 0, "No balance to withdraw");

		// Reset the user's balance before transferring to avoid re-entrancy attacks
		balances[msg.sender] = 0;

		// Use the call method to transfer ETH
		(bool success, ) = msg.sender.call{ value: userBalance }("");
		require(success, "ETH transfer failed");
	}

	// Add a `timeLeft()` view function that returns the time left before the deadline for the frontend
	function timeLeft() public view returns (uint256) {
		if (block.timestamp >= deadline) {
			return 0;
		} else {
			return deadline - block.timestamp;
		}
	}

	receive() external payable {
		stake();
	}
}
// Add the `receive()` special function that receives eth and calls stake()
