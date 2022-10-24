import React, {useEffect, useState} from 'react';
import styles from '../../styles/Form.module.css';
import { ethers } from "ethers";
import abi from "../utils/Sendfunds.json";
import { parseEther } from "ethers/lib/utils";
import  Transaction  from "./Transaction";


const Form= () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [allTxns, setAllTxns] = useState([]);
    const [isTxn, setIsTxn] = useState(false);

    const contractAddress = "0x5CA9522E8a675e0E26D9a45E9F2af68c82F0d0FE";
    const contractABI = abi.abi;

    const sendFunds = async () => {
        try {
            const {ethereum} = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const sendFundsContract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );

                const sendFundsTxn = await sendFundsContract.sendFounds(
                    walletAddress,
                    ethers.utils.parseEther(amount),
                    {gasLimit: 300000, value: parseEther(amount)}
                );
                await sendFundsTxn.wait();
                setWalletAddress('');
                setAmount('');
            } else {
                console.log("Ethereum objet does not exist!")
            }
        } catch (error) {
            console.log(error);            
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendFunds();
    };

    const getAllTransactions = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const sendFundsContract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );
                let getAllTxn = await sendFundsContract.getAllTxn();
                setIsTxn(true);

                let txns = [];
                getAllTxn.forEach((txn) => {
                    txns.push({
                        address: txn.reciever,
                        amount: txn.amount,
                        timestamp: new Date(txn.timestamp * 1000),
                    });
                });
                setAllTxns(txns);
            } else {
                console.log("Ethereum object does not exist!");
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(()=>{
        getAllTransactions();
    }, []);

    useEffect(()=>{
        let sendFundsContract;
        const onNewTransaction = (to, amount, timestamp) => {
            console.log("New Transaction", to, amount, timestamp);
            setAllTxns(prevState => [
                ...prevState,
                {
                    address: to,
                    amount: amount,
                    timestamp: new Date(timestamp * 1000)
                },
            ]);
        };

        if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            sendFundsContract = new ethers.Contract(contractAddress, contractABI, signer);
            sendFundsContract.on("NewTxn", onNewTransaction);
        }

        return () => {
            if (sendFundsContract) {
                sendFundsContract.off("NewTxn", onNewTransaction);
            }
        };
    }, []);

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <p>
                    <input
                        className={styles.input}
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter Wallet Address"
                        required
                        value={walletAddress}
                        onChange={(e)=> setWalletAddress(e.target.value)}
                    />
                </p>
                <p>
                    <input
                        className={styles.input}
                        type="number"
                        name=""
                        id=""
                        placeholder="Enter Amount"
                        required
                        value={amount}
                        onChange={(e)=> setAmount(e.target.value)}
                    />
                </p>
                <button type="submit" className={styles.button}>
                    Send 🚀
                </button>
            </form>
            <div>
                {isTxn === false ? (
                <div></div>
                ) : (
                <div>
                    <Transaction allTxns={allTxns}></Transaction>
                </div>
                )}
            </div>
        </div>
    )
};

export default Form;