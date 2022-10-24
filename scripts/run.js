const hre = require("hardhat");

const main = async () => {
    const sendFoundsContractFactory = await hre.ethers.getContractFactory("SendFounds");
    const sendFoundsContract = await sendFoundsContractFactory.deploy({value: hre.ethers.utils.parseEther("4"),});
    await sendFoundsContract.deployed();
    
    console.log("contract address: ", sendFoundsContract.address);
    let contractBalance = await hre.ethers.provider.getBalance(sendFoundsContract.address);
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

    const [owner, randomPerson] = await hre.ethers.getSigners();
    const sendFounds = await sendFoundsContract
    .connect(randomPerson)
    .sendFounds(randomPerson.address, 2);
    await sendFounds.wait();

    const allTxn = await sendFoundsContract.getAllTxn();
    console.log(allTxn);
}

const runMain = async ()=>{
    try {
       await main();
       process.exit(0); 
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();