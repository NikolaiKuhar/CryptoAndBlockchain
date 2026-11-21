import { network } from "hardhat";

const { ethers } = await network.connect();

const proxyAddress = ethers.getAddress(
  "0x54bdcc4240b629183cbaf45e640251e594272a94"
);

const secondAccount = ethers.getAddress(
  "0xc99932219da8ee902ef5994b0a7cae9c334759a7"
);

const tokenV2 = await ethers.getContractAt("MyTokenV2", proxyAddress);

console.log("Version:", await tokenV2.version());

console.log(
  "Second account balance after upgrade:",
  ethers.formatEther(await tokenV2.balanceOf(secondAccount))
);
