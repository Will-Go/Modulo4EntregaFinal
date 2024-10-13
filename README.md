# Modulo 4 Final Project

This project is a decentralized application (dApp); this serves as a practical demonstration of skills acquired in blockchain development, testing, and frontend integration within the Web3 ecosystem.

The project showcases the ability to create a functional Web3 application, integrating blockchain technology with modern web development practices. It provides users with a platform to stake their ETH, potentially earn rewards, and interact with smart contracts through an intuitive interface.
 


## Contributors:

This project was developed by:

- [Wilson Gong Wu](https://github.com/Will-Go)
- [Nicolas Flores Jimenez](https://github.com/NicoFJ09)
- [Davis Morales Brizulea](https://github.com/ekabaka)

We appreciate their hard work and contributions to make this project possible.


## License: 

This project is licensed under the MIT License. 


## Deployed Contract

The Staker contract is deployed on the Ethereum network. You can view the contract on Etherscan:

[View Staker Contract on Etherscan](https://sepolia.etherscan.io/address/0x1a6497397d9c0ac0557bfb396a937343a76750d8#readContract)


## Project Structure

The project consists of the following key files:

- `Staker.sol`: The main staking contract
- `stackingTest.ts`: Test file for the staking contract
- `01_deploy_staker.ts`: Deployment script for the Staker contract
- `page.tsx`: Main page component of the Next.js application


## Getting Started

First, run the development server: 
```bash
npm run dev
```

Open [http://localhost:3000] with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.


## Smart Contract: Staker.sol

`Staker.sol` is the main smart contract for this project. It implements a staking mechanism where users can:

- Stake ETH
- Withdraw their stake
- Execute a function after a threshold is met

Key features:
- Time-based staking periods
- Threshold-based execution
- Withdrawal functionality


## Testing: stackingTest.ts

`stackingTest.ts` contains the test suite for the Staker contract. It uses Hardhat and Chai for testing. The tests cover:

- Deployment of the contract
- Staking functionality
- Withdrawal scenarios
- Threshold execution

To run the tests: 
```bash
npx hardhat test

```


## 01_deploy_staker.ts

`01_deploy_staker.ts` is the deployment script for the Staker contract. It uses Hardhat's deployment system to:

- Deploy the Staker contract
- Set initial parameters
- Verify the contract on Etherscan (if on a supported network)

To deploy the contract: 
```bash
npx hardhat run scripts/01_deploy_staker.ts --network <your-network>
```


## Frontend: page.tsx

`page.tsx` is the main page component of the Next.js application. It provides the user interface for interacting with the Staker contract.

Key features:
- Connect wallet functionality
- Display of staking information
- Interface for staking and withdrawing tokens



## Learn More

To learn more about this stack, take a look at the following resources:

- [wagmi Documentation](https://wagmi.sh) - Learn about wagmi Hooks and API.
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Hardhat Documentation](https://hardhat.org/getting-started/) - Learn about Hardhat for Ethereum development.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.