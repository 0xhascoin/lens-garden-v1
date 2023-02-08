import React, { useEffect, useState } from 'react'
import { client, myStats } from '../api';

const Stats = ({ address }) => {
    const [noLensFound, setNoLensFound] = useState(true);
    const address1 = "0x913261b57E93F4Ca245f09006D56AA764D1a8C2D";
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchMyStats = async () => {
            try {
    
                const { data: { profiles: { items } } } = await client.query(myStats, { "address": address }).toPromise();
                console.log("Data: ", items[0].stats);
                setData(items[0].stats);
                setNoLensFound(false);
            } catch (error) {
                console.log(error);
                setNoLensFound(true);
            }
        }

        fetchMyStats()
    }, [])

    return (
        <div>
            {noLensFound ? (
                <p>No lens profile found in your wallet.</p>
            ) : (
                <>
                    {data && (
                        <>
                            <p>Total followers: {data.totalFollowers}</p>
                            <p>Total following: {data.totalFollowing}</p>
                            <p>Total mirrors: {data.totalMirrors}</p>
                            <p>Total posts: {data.totalPosts}</p>
                            <p>Total publications: {data.totalPublications}</p>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Stats