import React from 'react'
import { useEffect, useState } from 'react';
import { abi } from '../../constants';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0x4575b131bEfda75Ea9843358c700E0B0BeF2fE2a";

const Mint = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [mining, setMining] = useState(false);
    const [finished, setFinished] = useState(null);
    const [alreadyMinted, setAlreadyMinted] = useState(false);

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

            // Setup listener! This is for the case where a user comes to our site
            // and connected their wallet for the first time.
            setupEventListener()
        } else {
            console.log("No authorized account found");
        }
    };

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

            // Setup listener! This is for the case where a user comes to our site
            // and connected their wallet for the first time.
            setupEventListener()
        } catch (error) {
            console.log(error);
        }
    }

    // Minting function
    const askContractToMintNft = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                // Get the provider, signer and the contract
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

                // Mint the nft, set the mining state to true
                let txn = await connectedContract.makeAnNft();
                setMining(true);
                console.log("Mining...please wait.")
                await txn.wait();

                // After finished minting, print it out and set mining state to false
                console.log(txn);
                console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`);
                setMining(false);

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
            setAlreadyMinted(true);
        }
    }

    const renderNotConnectedContainer = () => {
        return (
            <button onClick={connectWallet}>
                Connect to Wallet
            </button>
        )
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    // Setup our listener.
    const setupEventListener = async () => {
        // Most of this looks the same as our function askContractToMintNft
        try {
            const { ethereum } = window;

            if (ethereum) {
                // Same stuff again
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

                // THIS IS THE MAGIC SAUCE.
                // This will essentially "capture" our event when our contract throws it.
                // If you're familiar with webhooks, it's very similar to that!
                connectedContract.on("NewNFTMinted", (from, tokenId) => {
                    console.log(from, tokenId.toNumber())
                    setFinished(`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`);
                    // alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
                });

                // Listen for the already minted event on the contract, 
                connectedContract.on("AlreadyMinted", (from, val) => {
                    setAlreadyMinted(val);
                    console.log(`Address: ${from}\nHas already minted an NFT: ${val}`)
                });

                console.log("Setup event listeners!")

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <h3>Mint your Lens Garden NFT</h3>
            <div>
                {finished !== null && <p>{finished}</p>}
                {/* Add your render method here */}
                {currentAccount === "" ? (
                    renderNotConnectedContainer()
                ) : (
                    <>
                        {mining ? (
                            <button disabled>Mining the NFT please wait</button>
                        ) : (
                            <>
                                {alreadyMinted ? (
                                    <h2>Already minted a NFT</h2>
                                ) : (
                                    <button onClick={askContractToMintNft}>
                                        Mint NFT
                                    </button>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Mint
