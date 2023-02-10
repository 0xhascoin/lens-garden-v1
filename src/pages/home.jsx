import React, { useState, useEffect } from 'react'
// import '../src/App.css';
import SignInWithLens from '../components/signInWithLens';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [currentLensAccount, setCurrentLensAccount] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const navigate = useNavigate();

    // Check if the wallet is connected
    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window; // Get the ethereum object from the window

        if (!ethereum) {
            // Metamask not found in browser window. Return
            console.log("Make sure you have MetaMask!");
            return;
        } else {
            // Metamask found
            console.log("We have the etherum object: ", ethereum);
        }

        // Get the accounts in the metamask wallet
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
            // Set the first account in the wallet to the state
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

            // Request the metamask wallet to connect
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

    // Check if lens is already connected
    const checkIfLensConnected = () => {

        // Get the key from the local storage
        const key = JSON.parse(localStorage.getItem('lens.wallets'));

        // If key doesnt exist then exit
        if(key == null) return;

        // Not connected to lens
        if (key?.data.length === 0) {
            setCurrentLensAccount(""); 
            return;
        }

        // If the key contains the address
        if (key.data[0].address !== undefined) {
            const lensAddress = key.data[0].address; // Get the address
            if (lensAddress) {
                setCurrentLensAccount(lensAddress); // Set the address to the state

                // Address exists meaning the user is connected to lens
                if (lensAddress !== "") {
                    navigate("/home"); // Go to the home route
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
        <div className="App border-black">
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