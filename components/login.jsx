import { useWalletLogin } from '@lens-protocol/react';
import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

const Login = ({ setLoadingLogin }) => {
  const { login, error, isPending } = useWalletLogin();
  const { isConnected, address } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      setLoadingLogin(true)
      const signer = await connector.getSigner();
      await login(signer);
      setLoadingLogin(false);
    }
  };

  useEffect(() => {
    console.log("isPending: ", isPending);
  }, [isPending]);
  
  useEffect(() => {
    console.log("isPending: ", isPending);
    console.log("address: ", address);
  }, [address]);
 
  return (
    <div>
      {error && <p>{error}</p>}
      <button disabled={isPending} onClick={onLoginClick}>Log in</button>
    </div>
  );
}

export default Login;