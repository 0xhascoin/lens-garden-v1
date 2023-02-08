import React from 'react'
import ActiveProfileDetails from '../components/activeProfileDetails'
import Header from '../components/header'
import MintNFT from '../components/mintNFT';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home">
        <Header />
        <div className="content">
          <ActiveProfileDetails />
          <MintNFT />
        </div>
        
    </div>
  )
}

export default Home