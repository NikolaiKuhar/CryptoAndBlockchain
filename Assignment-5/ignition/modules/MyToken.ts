import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MyTokenModule = buildModule("MyTokenModule", (m) => {
  const initialSupply = 1000000n * 10n ** 18n;

  const myToken = m.contract("MyToken", [initialSupply]);

  return { myToken };
});

export default MyTokenModule;
