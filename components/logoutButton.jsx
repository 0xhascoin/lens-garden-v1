import { useWalletLogout } from "@lens-protocol/react";
import { useAccount, useDisconnect } from "wagmi";

const LogoutButton = () => {
    const { logout } = useWalletLogout();

    const { isConnected, address } = useAccount();
    const { disconnectAsync } = useDisconnect();

    const logoutHandler = async () => {
        if (isConnected) {
            await logout();
            await disconnectAsync();
        }
    };

    return (
        <div className="connected-button">
            <span className='address'>{address.slice(0, 6)}...{address.slice(-4)}</span>
            <button className="logout-button" onClick={logoutHandler}>Logout</button>
        </div>
    );
}

export default LogoutButton;