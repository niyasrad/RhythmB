import { useLocation } from "react-router";
import { BarWrapper, BarIcon } from "./bar.styles";
import { MusicalNote, SpeakerWave, Play, ArrowPathRoundedSquare, Heart } from "@styled-icons/heroicons-solid";

export default function PlayBar({ mobileMode }: { mobileMode?: boolean }) {

    const { pathname } = useLocation()
    
    if (pathname === "/sign-in" || pathname === "/sign-up") {
        return null
    }

    return(
        <BarWrapper
            $mobileMode={mobileMode ? true: false}
        >
            <BarIcon>
                <MusicalNote 
                    size={"2rem"}
                />
            </BarIcon>
            <BarIcon>
                <SpeakerWave 
                    size={"2rem"}
                />
            </BarIcon>
            <BarIcon 
                $white
                $color="black"
            >
                <Play 
                    size={"2rem"}
                />
            </BarIcon>
            <BarIcon>
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