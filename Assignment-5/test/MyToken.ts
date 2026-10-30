import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("MyToken", function () {
  async function deployToken() {
    const [owner, addr1] = await ethers.getSigners();

    const initialSupply = ethers.parseEther("1000000");

    const token = await ethers.deployContract("MyToken", [initialSupply]);
    await token.waitForDeployment();

    return { token, owner, addr1, initialSupply };
  }

  it("Should assign the initial supply to the owner", async function () {
    const { token, owner, initialSupply } = await deployToken();

    expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
    expect(await token.totalSupply()).to.equal(initialSupply);
  });

  it("Should allow the owner to mint new tokens", async function () {
    const { token, addr1, initialSupply } = await deployToken();

    const mintAmount = ethers.parseEther("100");

    await token.mint(addr1.address, mintAmount);

    expect(await token.balanceOf(addr1.address)).to.equal(mintAmount);
    expect(await token.totalSupply()).to.equal(initialSupply + mintAmount);
  });

  it("Should not allow a non-owner to mint tokens", async function () {
    const { token, addr1 } = await deployToken();

    const mintAmount = ethers.parseEther("100");

    await expect(
      token.connect(addr1).mint(addr1.address, mintAmount)
    ).to.revert(ethers);
  });

  it("Should transfer tokens between accounts", async function () {
    const { token, owner, addr1, initialSupply } = await deployToken();

    const transferAmount = ethers.parseEther("500");

    await token.transfer(addr1.address, transferAmount);

    expect(await token.balanceOf(addr1.address)).to.equal(transferAmount);
    expect(await token.balanceOf(owner.address)).to.equal(
      initialSupply - transferAmount
    );
  });

  it("Should revert when transferring more than the balance", async function () {
    const { token, addr1 } = await deployToken();

    const amount = ethers.parseEther("1");

    await expect(
      token.connect(addr1).transfer(
        "0x0000000000000000000000000000000000000001",
        amount
      )
    ).to.revert(ethers);
  });
});
