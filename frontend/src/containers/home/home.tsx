import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import { useGlobalContext } from "../../contexts/global.context";

import { DescText, HeaderTextHigh, HeaderTextLow } from "../../components/index.styles";
import { HomeAlbumsList, HomeArtist, HomeArtistIntro, HomeSongs, HomeWrapper } from "./home.styles";

import AlbumWrap from "../../components/albumwrap/albumwrap";
import { ArtistAlbumSearchResult, SongSearchResult } from "../../utils/responses.util";
import SongCarousel from "../../components/songcarousel/songcarousel";

export default function Home() {

    const { username, isLoading, isLoggedIn, handleSignOut } = useGlobalContext()

    const [loading, setLoading] = useState<boolean>(true)

    const [artistID, setArtistID] = useState<string | null>(null)
    const [artistName, setArtistName] = useState<string | null>(null)

    const [albumIDs, setAlbumIDs] = useState<string[]>([])
    const [songIDs, setSongIDs] = useState<string[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            handleSignOut!()
            navigate('/sign-in')
            return
        }

        axios.get(import.meta.env.VITE_BASE_API + '/search/recommendation')
        .then(res => {
            const { artists, songs } = res.data.data
            const pickArtist = artists[Math.floor(Math.random() * artists.length)];
            setArtistID(pickArtist._id)

            const pickSongs = songs.sort(() => 0.5 - Math.random()).slice(0, 12);
            const songIDs = pickSongs.map((song: SongSearchResult) => song._id);
            setSongIDs(songIDs)
        })
        .catch(() => {
            handleSignOut!()
            navigate('/sign-in')
        })
    }, [isLoggedIn, isLoading])



    useEffect(() => {
        if (artistID) {
            axios.get(import.meta.env.VITE_BASE_API + `/artist/${artistID}`)
            .then(res => {
                const albums = res.data.data.albums
                setArtistName(res.data.data.name)
                const firstTwoAlbums = albums.slice(0, 2).map((album: ArtistAlbumSearchResult) => album.id);
                setAlbumIDs(firstTwoAlbums)
            })
            .catch(() => {
                handleSignOut!()
                navigate('/sign-in')
            })
            .finally(() => {
                setLoading(false)
            })
        }
    }, [artistID])


    const timeOfDay = () => {

        const time = new Date().getHours()

        if (time >= 5 && time < 12) {
            return "morning"
        } else if (time >= 12 && time < 16) {
            return "afternoon"
        } else if (time >= 16 && time < 19) {
            return "evening"
        } else {
            return "night"
        }

    }

    if (loading) return null


    return (
        <HomeWrapper>
            <HeaderTextLow>Welcome, <span>{username}</span></HeaderTextLow>
            <HomeSongs>
                <DescText>Spice up your {timeOfDay()} with these tracks!</DescText>
                <SongCarousel 
                    songIDs={songIDs} 
                />     
            </HomeSongs>
            <HomeArtist>
                <HomeArtistIntro>
                    <DescText>Check out this artist,</DescText>
                    <HeaderTextHigh>{artistName}</HeaderTextHigh>
                </HomeArtistIntro>
                <HomeAlbumsList>
                {
                    albumIDs.map((albumID, index) => (
                        <AlbumWrap
                            key={index}
                            album_id={albumID}
                            home={true}
                        />
                    ))
                }
                </HomeAlbumsList>
            </HomeArtist>
        </HomeWrapper>
    )
}
