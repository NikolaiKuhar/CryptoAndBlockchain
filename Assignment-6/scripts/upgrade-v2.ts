import { network } from "hardhat";

const { ethers } = await network.connect();

const [owner] = await ethers.getSigners();

const proxyAddress = ethers.getAddress(
  "0x54bdcc4240b629183cbaf45e640251e594272a94"
);

// 1. Deploy V2 implementation
const newImplementation = await ethers.deployContract("MyTokenV2");
await newImplementation.waitForDeployment();

const newImplementationAddress = await newImplementation.getAddress();

console.log("V2 implementation:", newImplementationAddress);

// 2. Connect to proxy using V1 ABI
const tokenV1 = await ethers.getContractAt("MyTokenV1", proxyAddress);

console.log("Owner before upgrade:", owner.address);
console.log(
  "Owner balance before upgrade:",
  ethers.formatEther(await tokenV1.balanceOf(owner.address))
);

// 3. Upgrade proxy to V2
const upgradeTx = await tokenV1.upgradeToAndCall(
  newImplementationAddress,
  "0x"
);

await upgradeTx.wait();

console.log("Upgrade tx:", upgradeTx.hash);

// 4. Connect using V2 ABI
const tokenV2 = await ethers.getContractAt("MyTokenV2", proxyAddress);

console.log("Version:", await tokenV2.version());
console.log(
  "Owner balance after upgrade:",
  ethers.formatEther(await tokenV2.balanceOf(owner.address))
);
