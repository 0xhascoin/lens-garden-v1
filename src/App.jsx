import Stats from '../components/stats'
import Login from '../components/login'
import './App.css'

import { useAccount } from 'wagmi';
import LogoutButton from '../components/logoutButton';
import { useWalletLogin } from '@lens-protocol/react';
import { useEffect, useState } from 'react';

function App() {
  const [loadingLogin, setLoadingLogin] = useState(false)

  const { address, isConnected } = useAccount();
  const { isPending } = useWalletLogin();

  useEffect(() => {
    console.log("isConnected: ", isConnected);
  },[isConnected])


  return (
    <div className="App">
      {/* <Stats /> */}
      {address && !loadingLogin ? (
        <>
          <LogoutButton />
          <Stats address={address} />
        </>
      ) : (
        <Login setLoadingLogin={setLoadingLogin} />
      )}
    </div>
  )
}

export default App
