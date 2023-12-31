import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { SubTextHigh } from "../index.styles";
import { SongWrapper, SongImage, SongPlay, SongPause } from "./song.styles";
import { usePlayerContext } from "../../contexts/player.context";

interface SongDetails {
    title: string,
    artist: string,
    album: string,
    album_id: string,
    user_rating: number,
}

export default function Song({ song_id }: { song_id: string }) {

    const [songDetails, setSongDetails] = useState<SongDetails>({
        title: '',
        artist: '',
        album: '',
        album_id: '',
        user_rating: 0
    })

    const { songID, isPlaying, setSongID, setAlbumID, setIsPlaying } = usePlayerContext()

    useEffect(() => {
        axios.get('/api/song/' + song_id)
        .then(res => {
            setSongDetails({
                title: res.data.data.title,
                artist: res.data.data.artist.name,
                album: res.data.data.album.title,
                album_id: res.data.data.album.id,
                user_rating: res.data.data.user_rating
            })
        })
        .catch(() => {
            toast.error("Failed to get song details")
        })
    }, [song_id])

    if (!song_id) return null

    return (
        <SongWrapper>
            <SongImage
                src={"/cdn_asset/albums/" + songDetails.album_id + '.jpg'}
                alt="Song Image"
            />
            <SubTextHigh><span>{songDetails.title}</span></SubTextHigh>
            <SubTextHigh>{songDetails.artist}</SubTextHigh>
            {
                songID === song_id && isPlaying ?
                <SongPause
                    size="4rem"
                    onClick={() => {
                        setIsPlaying!(false)
                    }}
                />
                :
                <SongPlay
                    size="4rem"
                    onClick={() => {
                        setSongID!(song_id)
                        setAlbumID!(songDetails.album_id)
                        setIsPlaying!(true)
                    }}
                />
            }

        </SongWrapper>
    )
}
