import React, { useEffect, useState } from "react";
import Form from "../src/components/Form";
import styles from '../styles/Home.module.css';


function Home(){
    const[currentAccount, setCurrentAccount] = useState("");

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;
            if(!ethereum){
                console.log("You need to install metamask");
            } else {
                console.log("found one", ethereum);
            }
            const accounts = await ethereum.request({ method: "eth_accounts"});
            if(accounts.length !==0){
                const account = accounts[0];
                console.log("Account: ", account);
                setCurrentAccount(account);
            } else {
                console.log("Not authorized account found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () =>{
        try {
            const {ethereum} = window;
            if(!ethereum) {
                console.log("You need to install metamask");
                return 
            }
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            console.log("Connected", accounts[0]);
            location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        checkIfWalletIsConnected();
    }, []);

    function truncate(input) {
        return input.substring(0, 5) + "..." + input.substring(38);
    }


    return (
        <div className="App">
            {currentAccount.length ===0 ? (
                <div>
                    <div className={styles.nav}>
                        <h1 className={styles.h1}>SendFunds ⟠</h1>
                    </div>
                    <div className={styles.content}>
                        <div>
                            <p className={styles.description}>
                                Send ⟠<i className="fa-brands fa-ethereum"></i> to your friends and family.
                            </p>
                            <button className={styles.connectBtn} onClick={()=> connectWallet()}>
                                Connect Wallet
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className={styles.navFlex}>
                        <h1 className={styles.h1}>SendFunds ⟠</h1>
                        <p className={styles.walletAddress}>Wallet Connected: {truncate(currentAccount)}</p>
                    </div>
                    <div className={styles.connectedWallet}>
                        <p className={styles.description}>
                            Send ⟠ to your friends and family.
                        </p>
                    </div>
                </div>
            )}
            <Form />
            <footer className={styles.footer}>Made with &#10084; by Ramiro Aragon Paz</footer>
        </div>
    );
}

export default Home;