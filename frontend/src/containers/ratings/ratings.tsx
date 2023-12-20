import { useEffect, useState } from "react";
import { HeaderTextLow, SubTextLow } from "../../components/index.styles";
import { ColorHeaderText, RatingNoSpec, RatingNoText, RatingsDesc, RatingsSpec, RatingsWrapper } from "./ratings.styles";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/loader/loader";
import SongCarousel from "../../components/songcarousel/songcarousel";
import { useGlobalContext } from "../../contexts/global.context";
import { useNavigate } from "react-router";

interface RatingType {
    id: string,
    rating: number,
    song: RatedSongType
}

interface RatedSongType {
    id: string,
    album_id: string,
    artist_id: string,
    title: string,
    genre: string,
    length: number
}

export default function Ratings() {

    const [blueSongs, setBlueSongs] = useState<Array<RatedSongType>>([])
    const [purpleSongs, setPurpleSongs] = useState<Array<RatedSongType>>([])
    const [redSongs, setRedSongs] = useState<Array<RatedSongType>>([])

    const { isLoggedIn, isLoading, handleSignOut } = useGlobalContext()
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {

        if (!isLoggedIn && !isLoading) {
            handleSignOut!()
            navigate('/sign-in')
        }

        if (isLoading) return

        setLoading(true)

        axios.get(import.meta.env.VITE_BASE_API + "/user/get-ratings")
        .then(res => {
            let response = res.data.data.ratings

            const blueSongList: Array<RatingType> = response.filter((rating: RatingType) => rating.rating === 1)
            const purpleSongList: Array<RatingType> = response.filter((rating: RatingType) => rating.rating === 5)
            const redSongList: Array<RatingType> = response.filter((rating: RatingType) => rating.rating === 10)

            setBlueSongs(blueSongList.map((rating: RatingType) => rating.song))
            setPurpleSongs(purpleSongList.map((rating: RatingType) => rating.song))
            setRedSongs(redSongList.map((rating: RatingType) => rating.song))

            setLoading(false)
        })
        .catch(() => {
            toast.error("Could Not Load Ratings! Please Reload the Page.")
        })

    }, [isLoading, isLoggedIn])

    if (loading) return <Loader home/>

    return (
        <RatingsWrapper>
            <HeaderTextLow>Your <span>Activity</span></HeaderTextLow>
            {
                redSongs.length === 0 && blueSongs.length === 0 && purpleSongs.length === 0 &&
                <RatingNoSpec>
                    <RatingNoText>
                        <ColorHeaderText $color="aqua">You haven't <span>rated</span> any songs yet!</ColorHeaderText>
                        <SubTextLow>To get started - On playback of any song, <span>click</span> on the ♥️ icon.</SubTextLow>
                    </RatingNoText>
                </RatingNoSpec>
            }
            {
                redSongs.length > 0 &&
                <RatingsSpec>
                    <RatingsDesc>
                        <ColorHeaderText $color="red">Songs <br></br><span>that reached your heart!</span></ColorHeaderText>
                    </RatingsDesc>
                    <SongCarousel
                        songIDs={redSongs.map((song: RatedSongType) => song.id)}
                    />
                </RatingsSpec>
            }
            {
                purpleSongs.length > 0 &&
                <RatingsSpec>
                    <RatingsDesc>
                        <ColorHeaderText $color="purple">Songs <br></br><span>you cherish and enjoy</span></ColorHeaderText>
                    </RatingsDesc>
                    <SongCarousel
                        songIDs={purpleSongs.map((song: RatedSongType) => song.id)}
                    />
                </RatingsSpec>
            }
            {
                blueSongs.length > 0 &&
                <RatingsSpec>
                    <RatingsDesc>
                        <ColorHeaderText $color="aqua">Songs <br></br><span>you liked and listened!</span></ColorHeaderText>
                    </RatingsDesc>
                    <SongCarousel
                        songIDs={blueSongs.map((song: RatedSongType) => song.id)}
                    />
                </RatingsSpec>
            }
        </RatingsWrapper>
    )
}
