import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { client, myStats } from '../api';
import '../styles/activeProfileDetails.css';

const ActiveProfileDetails = () => {
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [profileFound, setProfileFound] = useState(false);
    const { address } = useAccount();
    const startUrl = "https://lens.infura-ipfs.io/ipfs/";

    const fetchActiveProfile = async () => {
        try {
            setLoadingProfile(true);
            const { data: { profiles: { items } } } = await client.query(myStats, { "address": address }).toPromise();
            console.log("Data: ", items[0]);
            setProfile(items[0]);
            setProfileFound(true);
            setLoadingProfile(false);
        } catch (error) {
            console.log(error);
            setProfileFound(false);
            setLoadingProfile(false);
        }
    };

    useEffect(() => {
        fetchActiveProfile();

    }, []);

    console.log("ipfs://bafybeia4nrpwpsigccuyyu22wrxcpw7n7sounabtii544kblb77h7zuade".slice(7))

    if (loadingProfile) return <h4 className="no-lens-profile-found">Loading Lens profile</h4>
    if (!profileFound) return <h4 className="no-lens-profile-found">No Lens Profile Found</h4>

    return (
        <div className="active-profile-details">
            <h3 className="welcome">Welcome {profile.handle}</h3>
            <img className="profile-image" src={`${startUrl}${profile.picture.original.url.slice(7)}`} alt="lens-image" />
            <div className="profile-details">
                <div className="detail">
                    <h2>Following</h2>
                    <p style={{ fontSize: '2rem'}}>{profile.stats.totalFollowing}</p>
                </div>
                <div className="detail">
                    <h2>Followers</h2>
                    <p style={{ fontSize: '2rem'}}>{profile.stats.totalFollowers}</p>
                </div>
                <div className="detail">
                    <h2>Total Posts</h2>
                    <p style={{ fontSize: '2rem'}}>{profile.stats.totalPosts}</p>
                </div>
            </div>
            <div className="profile-details">
                <div className="detail">
                    <h2>Total Collects</h2>
                    <p style={{ fontSize: '2rem'}}>{profile.stats.totalCollects}</p>
                </div>
                <div className="detail">
                    <h2>Total Comments</h2>
                    <p style={{ fontSize: '2rem'}}>{profile.stats.totalComments}</p>
                </div>
                <div className="detail">
                    <h2>Total Mirrors</h2>
                    <p style={{ fontSize: '2rem'}}>{profile.stats.totalMirrors}</p>
                </div>
            </div>
        </div>
    )
}

export default ActiveProfileDetails