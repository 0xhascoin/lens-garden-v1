import React from 'react'
import { useWalletLogin } from '@lens-protocol/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';


const SignInWithLens = ({ setLoginLoading, checkIfLensConnected }) => {
    const { login, isPending, error } = useWalletLogin();
    const { isConnected } = useAccount();
    const { disconnectAsync } = useDisconnect();

    const { connectAsync } = useConnect({
        connector: new InjectedConnector(),
    });

    const loginHandler = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { connector } = await connectAsync();

        if (connector instanceof InjectedConnector) {
            setLoginLoading(true)
            const signer = await connector.getSigner();
            await login(signer);
            setLoginLoading(false);
            checkIfLensConnected();
        }
    };

    return (
        <div>
            {isPending ? (
                <p>Loading....</p>
            ) : (
                <>
                {error && <p>An error occured.</p>}                
                <button className="connect-wallet-button" onClick={loginHandler}>
                    Sign in With Lens
                </button>
                </>
            )}
        </div>
    )
}

export default SignInWithLens;