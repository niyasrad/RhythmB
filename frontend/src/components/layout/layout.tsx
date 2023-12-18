import { useLocation } from "react-router";
import NavBar from "../bars/navbar";
import PlayBar from "../bars/playbar";
import { LayoutWrapper, RhythmbAudio } from "./layout.styles";
import { PlayerContext } from "../../contexts/player.context";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }){

    const { pathname } = useLocation()

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [loop, setLoop] = useState<boolean>(false)
    const [muted, setMuted] = useState<boolean>(false)
    const [songID, setSongID] = useState<string>('')
    const [rating, setRating] = useState<number>(0)
    const [albumID, setAlbumID] = useState<string>('')


    if (pathname === "/sign-in" || pathname === "/sign-up") {
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <PlayerContext.Provider
            value={{
                isPlaying,
                setIsPlaying,
                loop,
                setLoop,
                rating,
                muted,
                albumID,
                setMuted,
                songID,
                setSongID,
                setRating,
                setAlbumID
            }}
        >
            <LayoutWrapper>
                <NavBar />
                {children}
                <PlayBar />
                <PlayBar mobileMode />
                <RhythmbAudio
                    id="rhythmb-audio"
                    src={songID ? import.meta.env.VITE_BASE_API + `/cdn_asset/songs/${songID}.mp3` : ""}
                    loop={loop}
                    muted={muted}
                />
                <NavBar mobileMode />
            </LayoutWrapper>
        </PlayerContext.Provider>
    )

}
