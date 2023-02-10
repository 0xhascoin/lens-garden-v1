import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

// Wagmi imports
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public'
const { provider, webSocketProvider } = configureChains([polygon, mainnet], [publicProvider()]);

// Lens imports
import { staging } from '@lens-protocol/react';
import { localStorage } from '@lens-protocol/react/web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import { LensProvider } from '@lens-protocol/react';

// Pages
import Home from './pages/home';
import GetLensStats from './pages/getLensStats';


const lensConfig = {
  bindings: wagmiBindings(),
  environment: staging,
  storage: localStorage(),
};

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig client={client}>
    <LensProvider config={lensConfig}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<GetLensStats />} />
        </Routes>
      </Router>
    </LensProvider>
  </WagmiConfig>,
)
