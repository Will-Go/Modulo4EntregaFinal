//
// This script executes when you run 'yarn test'
//
import * as dotenv from "dotenv";
dotenv.config();
import { ethers, network } from "hardhat";
import { expect } from "chai";
import { ExampleExternalContract, Staker } from "../typechain-types";

describe("StackingTest", function () {
  let exampleExternalContract: ExampleExternalContract;
  let stakerContract: Staker;

  describe("Staker", function () {
    const contractAddress = process.env.CONTRACT_ADDRESS;

    let contractArtifact: string;
    if (contractAddress) {
      // For the autograder.
      contractArtifact = `contracts/download-${contractAddress}.sol:Staker`;
    } else {
      contractArtifact = "contracts/Staker.sol:Staker";
    }

    it("Debe de hacer deploy del ExampleExternalContract", async function () {
      const ExampleExternalContract = await ethers.getContractFactory("ExampleExternalContract");
      exampleExternalContract = await ExampleExternalContract.deploy();
    });


    it("Debe de hacer deploy del Staker", async function () {
      const Staker = await ethers.getContractFactory(contractArtifact);
      stakerContract = (await Staker.deploy(await exampleExternalContract.getAddress())) as Staker;
      console.log("\t", "Stacker addresss:", await stakerContract.getAddress());
    });

    describe("stake()", function () {
      
      it("El balance debe de subir al hacer stake()", async function () {
        const [owner] = await ethers.getSigners();

        console.log("\t", "Tester Address: ", owner.address);

        const startingBalance = await stakerContract.balances(owner.address);
        console.log("\t", "Starting balance: ", Number(startingBalance));

        console.log("\t", "Staking...");
        const stakeResult = await stakerContract.stake({ value: ethers.parseEther("0.001") });
        console.log("\t", "stakeResult: ", stakeResult.hash);

        console.log("\t", "Esperando confirmacion");
        const txResult = await stakeResult.wait();
        expect(txResult?.status).to.equal(1);

        const newBalance = await stakerContract.balances(owner.address);
        console.log("\t", "Balnce actualizado", ethers.formatEther(newBalance));
        expect(newBalance).to.equal(startingBalance + ethers.parseEther("0.001"));
      });

      
      
    });
  });
});
