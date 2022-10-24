import React from "react";
import styles from '../styles/Transaction.module.css';
import moment from 'moment';
import { ethers } from "ethers";

const Transaction = ({allTxns}) => {
    console.log(allTxns);
    return (
        <div className={styles.transactionContainer}>
            <h2>All Transactions:</h2>
            {allTxns.length === 0 ? <div>
            </div> : <div className={styles.gridContainer}>
                {allTxns.map((txn, index) => {
                    return (
                        <div key={index} className={styles.transactions}>
                            <p>Reciever: {txn.address}</p>
                            <p>Amount: {ethers.utils.formatUnits(txn.amount.toString(), 'ether')} eth</p>
                            <p>Date: {moment(txn.timestamp.toString()).format('MM/DD/YYYY')}</p>
                        </div>
                    )
                })}
            </div>
            }
        </div>
    );
};

export default Transaction;