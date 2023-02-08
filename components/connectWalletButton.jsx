import React from 'react'
import { useWalletLogin } from '@lens-protocol/react';
import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

const ConnectWalletButton = ({ setLoginLoading }) => {
    const { login, error, isPending } = useWalletLogin();
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
        }
    };

    return (
        <button className="connect-wallet-button" onClick={loginHandler}>
            Connect Wallet
        </button>
    )
}

export default ConnectWalletButton