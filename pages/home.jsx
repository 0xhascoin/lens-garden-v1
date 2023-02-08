import React, { useState, useEffect } from 'react'
import '../src/App.css';
import SignInWithLens from '../components/signInWithLens';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [currentLensAccount, setCurrentLensAccount] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const navigate = useNavigate();

    // Check if the wallet is connected
    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have MetaMask!");
            return;
        } else {
            console.log("We have the etherum object: ", ethereum);
        }

        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account: ", account);
            setCurrentAccount(account);
        } else {
            console.log("No authorized account found");
        }
    };

    // Connect wallet
    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask.");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected. ", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfLensConnected();
    }, []);

    const checkIfLensConnected = () => {
        const key = JSON.parse(localStorage.getItem('lens.wallets'));

        if(key == null) return;
        // Not connected to lens
        if (key?.data.length === 0) {
            setCurrentLensAccount("");
            return;
        }

        if (key.data[0].address !== undefined) {
            const lensAddress = key.data[0].address;
            if (lensAddress) {
                setCurrentLensAccount(lensAddress);

                if (lensAddress !== "") {
                    navigate("/home");
                    console.log("ABC")
                } else {
                    console.log("Lens Account: ", currentLensAccount);
                }
            } else {
                setCurrentLensAccount("");
            }
        } else {
            setCurrentLensAccount("");
        }

    }


    return (
        <div className="App">
            {currentAccount === "" ? (
                <button onClick={connectWallet}>
                    Connect to Wallet
                </button>
            ) : (
                <>
                    {currentLensAccount === "" && (
                        <SignInWithLens setLoginLoading={setLoginLoading} checkIfLensConnected={checkIfLensConnected} />
                    )}
                </>
            )}
        </div>
    )
}

export default Home