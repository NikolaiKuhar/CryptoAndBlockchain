import { network } from "hardhat";

const { ethers } = await network.connect({
  network: "sepolia",
});

const greeter = await ethers.getContractAt(
  "Greeter",
  "0x1d2Ca0e2FBF917720d1fDD85ce3931cB8f1Ade1D"
);

console.log(await greeter.greet());
