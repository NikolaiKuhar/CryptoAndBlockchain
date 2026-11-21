import { network } from "hardhat";

const { ethers } = await network.connect();

const [owner] = await ethers.getSigners();

const proxyAddress = ethers.getAddress(
  "0x54bdcc4240b629183cbaf45e640251e594272a94"
);

const secondAccount = ethers.getAddress(
  "0xc99932219da8ee902ef5994b0a7cae9c334759a7"
);

const token = await ethers.getContractAt("MyTokenV1", proxyAddress);

console.log("Owner:", owner.address);
console.log("Second account:", secondAccount);

console.log(
  "Owner balance before:",
  ethers.formatEther(await token.balanceOf(owner.address))
);

console.log(
  "Second account balance before:",
  ethers.formatEther(await token.balanceOf(secondAccount))
);

// 1. Mint 1000 MUT to second account
const mintAmount = ethers.parseEther("1000");
const mintTx = await token.mint(secondAccount, mintAmount);
await mintTx.wait();

console.log("Mint tx:", mintTx.hash);

// 2. Transfer 250 MUT from owner to second account
const transferAmount = ethers.parseEther("250");
const transferTx = await token.transfer(secondAccount, transferAmount);
await transferTx.wait();

console.log("Transfer tx:", transferTx.hash);

console.log(
  "Owner balance after:",
  ethers.formatEther(await token.balanceOf(owner.address))
);

console.log(
  "Second account balance after:",
  ethers.formatEther(await token.balanceOf(secondAccount))
);
