import { Dispatch, SetStateAction, createContext, useContext } from "react";


export interface PlayerContextType {
    isPlaying: boolean,
    songID: string,
    loop: boolean,
    rating: number,
    muted: boolean,
    albumID?: string,
    setIsPlaying?: Dispatch<SetStateAction<boolean>>,
    setSongID?: Dispatch<SetStateAction<string>>,
    setLoop?: Dispatch<SetStateAction<boolean>>
    setRating?: Dispatch<SetStateAction<number>>,
    setMuted?: Dispatch<SetStateAction<boolean>>,
    setAlbumID?: Dispatch<SetStateAction<string>>
}

export const defaultPlayerContextValue: PlayerContextType = {
    isPlaying: false,
    songID: "",
    loop: false,
    rating: 0,
    muted: false
}

export const PlayerContext = createContext<PlayerContextType>(defaultPlayerContextValue)

export const usePlayerContext = () => useContext(PlayerContext)
