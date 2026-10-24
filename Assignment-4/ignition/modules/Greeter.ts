import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GreeterModule = buildModule("GreeterModule", (m) => {
    const greeter = m.contract("Greeter", ["Mikalai"]);

    return { greeter };
});

export default GreeterModule;
