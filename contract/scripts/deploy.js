const hre = require("hardhat");

async function main() {
  const nftContractFactory = await hre.ethers.getContractFactory('LensGardenNFT');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // nftContract.on("NewNFTMinted", (sender, tokenId) => {
  //   console.log("Minted NFT");
  // });

  // nftContract.on("AlreadyMinted", (sender, val) => {
  //   console.log("Already minted: ", val);
  // });

  // let checkIfMinted = await nftContract.checkIfAlreadyMinted();
  // await checkIfMinted.wait();

  // let txn = await nftContract.makeAnNft();
  // await txn.wait();

  // checkIfMinted = await nftContract.checkIfAlreadyMinted();
  // await checkIfMinted.wait();

  // txn = await nftContract.makeAnNft();
  // await txn.wait();

  
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();