import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

import { BarWrapper, BarIcon, BarImage, RatingHeart } from "./bar.styles";
import { MusicalNote, SpeakerWave,SpeakerXMark, Play, Pause, ArrowPathRoundedSquare } from "@styled-icons/heroicons-solid";

import { usePlayerContext } from "../../contexts/player.context";
import { useGlobalContext } from "../../contexts/global.context";

export default function PlayBar({ mobileMode }: { mobileMode?: boolean }) {

    const [color, setColor] = useState<string>("grey")
    const [loading, setLoading] = useState<boolean>(false)

    const { pathname } = useLocation()
    const { userID } = useGlobalContext()
    const { setIsPlaying, isPlaying, loop, setLoop, setMuted, muted, songID, albumID, rating, setRating } = usePlayerContext()

    const player = document.getElementById("rhythmb-audio") as HTMLAudioElement

    if (pathname === "/sign-in" || pathname === "/sign-up") {
        return null
    }

    useEffect(() => {
        if (!songID) return
        axios.get('/api/song/' + songID)
        .then(res => {
            setRating!(res.data.data.user_rating)
        })
        .catch(() => {
            toast.error("Failed to get song details")
        })
    }, [songID])

    useEffect(() => {
        if (!songID || rating === 0) {
            setColor("grey")
            return
        }
        if (rating === 1) {
            setColor("aqua")
        } else if (rating === 5) {
            setColor("purple")
        } else if (rating === 10) {
            setColor("red")
        }

    },[songID, rating])

    const giveRating = async () => {
        if (!songID) return
        await axios.post('/api/rating/create', {
            rating: 1,
            song_id: songID,
            user_id: userID
        })
        .then(() => {
            setRating!(1)
        })
        .catch(() => {
            toast.error('Couldn\'t rate song!')
        })
    }

    const updateRating = async (ratingNumber: number) => {
        if (!songID) return
        await axios.put('/api/rating/update', {
            rating: ratingNumber,
            song_id: songID,
            user_id: userID
        })
        .then(() => {
            setRating!(ratingNumber)
        })
        .catch(() => {
            toast.error('Couldn\'t update rating!')
        })
    }

    const removeRating = async () => {
        if (!songID) return
        await axios.delete('/api/rating/delete/' + songID)
        .then(() => {
            setRating!(0)
        })
        .catch(() => {
            toast.error('Couldn\'t remove rating!')
        })
    }


    const handleRating = async () => {
        if (!songID || loading) return
        setLoading(true)
        if (rating === 0) {
            await giveRating()
        } else if (rating === 1) {
            await updateRating(5)
        } else if (rating === 5) {
            await updateRating(10)
        } else if (rating === 10) {
            await removeRating()
        }
        setLoading(false)
    }

    useEffect(() => {
        if (songID && player) {
            player.load()
            player.play()
            setIsPlaying!(true)
        }
    }, [songID])


    useEffect(() => {
        if (!player) return
        if (isPlaying) {
            player.play()
        } else {
            player.pause()
        }
    }, [isPlaying, player])


    return(
        <BarWrapper
            $mobileMode={mobileMode ? true: false}
        >
            <BarIcon>
                {
                    albumID ?
                    <BarImage
                        src={"/cdn_asset/albums/" + albumID + '.jpg'}
                        $rotate={isPlaying}
                        alt="Song Image"
                    />
                    :
                    <MusicalNote
                        size={"2rem"}
                    />
                }
            </BarIcon>
            <BarIcon
                onClick={
                    () => {
                        setMuted!(!muted)
                    }
                }
            >
                {
                    muted ?
                    <SpeakerXMark
                        size={"2rem"}
                    />
                    :
                    <SpeakerWave
                        size={"2rem"}
                    />
                }
            </BarIcon>
            <BarIcon
                $white
                $color="black"
                onClick={
                    () => {
                        if (isPlaying) {
                            setIsPlaying!(false)
                        } else {
                            if (!songID) return
                            setIsPlaying!(true)
                        }
                    }
                }
            >
            {
                isPlaying ?
                <Pause
                    size={"2rem"}
                />
                :
                <Play
                    size={"2rem"}
                />
            }
            </BarIcon>
            <BarIcon
                onClick={
                    () => {
                        setLoop!(!loop)
                    }
                }
                $selected={loop}
            >
                <ArrowPathRoundedSquare
                    size={"2rem"}
                />
            </BarIcon>
            <BarIcon
                $color={color}
                onClick={handleRating}
            >
                <RatingHeart
                    $rating={rating}
                    size={"2rem"}
                />
            </BarIcon>
        </BarWrapper>
    )
}
