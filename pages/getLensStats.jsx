import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { client, myStats } from '../api';
import LogoutButton from '../components/logoutButton';


const GetLensStats = () => {
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [profileFound, setProfileFound] = useState(false);
    const { address } = useAccount();
    const startUrl = "https://lens.infura-ipfs.io/ipfs/";
    const navigate = useNavigate();

    const fetchActiveProfile = async () => {
        try {
            setLoadingProfile(true);
            const { data: { profiles: { items } } } = await client.query(myStats, { "address": address }).toPromise();
            console.log("Data: ", items[0]);
            if(items[0] == undefined) {
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

    const checkIfLensConnected = () => {
        const key = JSON.parse(localStorage.getItem('lens.wallets'));
        if(key.data.length === 0){
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
                <h1>Welcome, {profile.handle}</h1>
                <img src={`${startUrl}${profile.picture.original.url.slice(7)}`} alt="lens-image" style={{ maxHeight: "150px" }} />
            </div>

            <div>
                <div>
                    <h2>Following</h2>
                    <p style={{ fontSize: '2rem' }}>{profile.stats.totalFollowing}</p>
                </div>
                <div>
                    <h2>Followers</h2>
                    <p style={{ fontSize: '2rem' }}>{profile.stats.totalFollowers}</p>
                </div>
                <div>
                    <h2>Total Posts</h2>
                    <p style={{ fontSize: '2rem' }}>{profile.stats.totalPosts}</p>
                </div>
            </div>
            <div>
                <div>
                    <h2>Total Collects</h2>
                    <p style={{ fontSize: '2rem' }}>{profile.stats.totalCollects}</p>
                </div>
                <div>
                    <h2>Total Comments</h2>
                    <p style={{ fontSize: '2rem' }}>{profile.stats.totalComments}</p>
                </div>
                <div>
                    <h2>Total Mirrors</h2>
                    <p style={{ fontSize: '2rem' }}>{profile.stats.totalMirrors}</p>
                </div>
            </div>

        </div>
    )
}

export default GetLensStats