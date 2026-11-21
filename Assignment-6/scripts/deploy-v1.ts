import { network } from "hardhat";

const { ethers } = await network.connect();

const [deployer] = await ethers.getSigners();

console.log("Deployer:", deployer.address);

// 1. Deploy V1 implementation
const implementation = await ethers.deployContract("MyTokenV1");
await implementation.waitForDeployment();

const implementationAddress = await implementation.getAddress();

console.log("V1 implementation:", implementationAddress);

// 2. Encode initialize()
const initData = implementation.interface.encodeFunctionData("initialize");

// 3. Deploy proxy pointing to V1
const proxy = await ethers.deployContract("MyTokenProxy", [
  implementationAddress,
  initData,
]);

await proxy.waitForDeployment();

const proxyAddress = await proxy.getAddress();

console.log("Proxy:", proxyAddress);

// 4. Interact with proxy using MyTokenV1 ABI
const token = await ethers.getContractAt("MyTokenV1", proxyAddress);

console.log("Token name:", await token.name());
console.log("Token symbol:", await token.symbol());
console.log(
  "Owner balance:",
  ethers.formatEther(await token.balanceOf(deployer.address))
);
console.log(
  "Total supply:",
  ethers.formatEther(await token.totalSupply())
);
