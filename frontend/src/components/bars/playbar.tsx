import { useLocation } from "react-router";
import { BarWrapper, BarIcon, BarImage } from "./bar.styles";
import { MusicalNote, SpeakerWave,SpeakerXMark, Play, Pause, ArrowPathRoundedSquare, Heart } from "@styled-icons/heroicons-solid";
import { usePlayerContext } from "../../contexts/player.context";
import { useEffect } from "react";

export default function PlayBar({ mobileMode }: { mobileMode?: boolean }) {

    const { pathname } = useLocation()
    const { setIsPlaying, isPlaying, loop, setLoop, setMuted, muted, songID, albumID } = usePlayerContext()

    const player = document.getElementById("rhythmb-audio") as HTMLAudioElement

    if (pathname === "/sign-in" || pathname === "/sign-up") {
        return null
    }

    useEffect(() => {
        if (songID) {
            player.load()
            player.play()
            setIsPlaying!(true)
        }
    }, [songID])

    return(
        <BarWrapper
            $mobileMode={mobileMode ? true: false}
        >
            <BarIcon>
                {
                    albumID ?
                    <BarImage
                        src={import.meta.env.VITE_BASE_API + "/cdn_asset/albums/" + albumID + '.jpg'}
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
                            player.pause()
                            setIsPlaying!(false)
                        } else {
                            if (!songID) return
                            player.play()
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
                $color="purple"
            >
                <Heart
                    size={"2rem"}
                />
            </BarIcon>
        </BarWrapper>
    )
}
