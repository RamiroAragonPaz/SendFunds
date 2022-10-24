import React, { useEffect, useState } from "react";
import "./Home.css";

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
                    <div>
                        <h1>SendFunds</h1>
                    </div>
                    <div className="content">
                        <div>
                            <p className="description">
                                Send <i className="fa-brands fa-ethereum"></i> to your friends and family.
                            </p>
                            <button className="connect-btn" onClick={()=> connectWallet()}>
                                Connect Wallet
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="nav flex">
                        <h1>SendFunds</h1>
                        <p className="wallet-address">{truncate(currentAccount)}</p>
                    </div>
                    <div className="content connected-wallet">
                        <p className="description">
                            Send <i className="fa-brands fa-ethereum"></i> to your friends and family.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;