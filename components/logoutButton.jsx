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
            location.reload()

        }
    };

    return (
        <div className="connected-button">
            <button className="logout-button" onClick={logoutHandler}>Logout</button>
        </div>
    );
}

export default LogoutButton;