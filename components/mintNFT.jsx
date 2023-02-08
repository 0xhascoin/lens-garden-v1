import React from 'react'
import '../styles/mint.css';

const MintNFT = () => {
  return (
    <div className='mint-container'>
      <img src="https://cdn.midjourney.com/e609018f-5ddd-4e04-bdb5-2414710fb0ad/grid_0.png" alt="mint-image" className="mint-img" />
      <h2 className="mint-title">Mint your Lens Garden NFT</h2>
      <button className="mint-button">Mint</button>
    </div>
  )
}

export default MintNFT