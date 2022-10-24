const hre = require("hardhat");

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("deploying contracts with account ", deployer.address);
    console.log("account balance ", accountBalance.toString());

    const sendFoundsContractFactory = await hre.ethers.getContractFactory("SendFounds");
    const sendFoundsContract = await sendFoundsContractFactory.deploy();

    await sendFoundsContract.deployed();

    console.log("Funds contract address: ", sendFoundsContract.address)

    }

    const runMain = async () => {
        try {
            await main();
            process.exit(0)
        } catch (error) {
            console.log(error);
            process.exit(1)
        }
    }

    runMain();