import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { client, myStats } from '../api';
import LogoutButton from '../components/logoutButton';
import Mint from '../components/mint';


const GetLensStats = () => {
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [profileFound, setProfileFound] = useState(false);
    const { address } = useAccount();
    const startUrl = "https://lens.infura-ipfs.io/ipfs/";
    const navigate = useNavigate();

    // Get the profile that is connected to the current wallet address
    const fetchActiveProfile = async () => {
        try {
            setLoadingProfile(true);
            const { data: { profiles: { items } } } = await client.query(myStats, { "address": address }).toPromise();
            console.log("Data: ", items[0]);
            if (items[0] == undefined) {
                setProfileFound(false);
            } else {
                setProfile(items[0]);
                setProfileFound(true);
            }
            setLoadingProfile(false);

        } catch (error) {
            console.log(error);
            setProfileFound(false);
            setLoadingProfile(false);
        }
    };

    useEffect(() => {
        checkIfLensConnected();
        fetchActiveProfile();
    }, []);

    // Check if the user is connected to lens
    const checkIfLensConnected = () => {
        const key = JSON.parse(localStorage.getItem('lens.wallets'));
        if (key.data.length === 0) {
            navigate("/")
            return;
        }
    }


    if (loadingProfile) return <h4>Loading Lens profile</h4>
    if (!profileFound) return <h4>No Lens Profile Found</h4>

    return (
        <div>
            <div>
                <p>Fully signed in {address}</p>
                <LogoutButton />
            </div>

            <div>
                <h4>Welcome, {profile.handle}</h4>
                <img src={`${startUrl}${profile.picture.original.url.slice(7)}`} alt="lens-image" style={{ maxHeight: "150px" }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <p style={{ marginRight: "5px"}}>Following: {profile.stats.totalFollowing}</p>
                <p style={{ marginRight: "5px"}}>Followers: {profile.stats.totalFollowers}</p>
                <p style={{ marginRight: "5px"}}>Total Posts: {profile.stats.totalPosts}</p>
                <p style={{ marginRight: "5px"}}>Total Collects: {profile.stats.totalCollects}</p>
                <p style={{ marginRight: "5px"}}>Total Comments: {profile.stats.totalComments}</p>
                <p>Total Mirrors: {profile.stats.totalMirrors}</p>
            </div>

            <Mint />

        </div>
    )
}

export default GetLensStats