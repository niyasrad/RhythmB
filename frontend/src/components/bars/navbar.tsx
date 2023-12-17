import { BarIcon, BarImage, BarWrapper } from "./bar.styles";

import light_logo from '../../assets/logo/rb_light.svg';
import { MagnifyingGlass, Bars3BottomLeft, Heart, ArrowLeftOnRectangle } from "@styled-icons/heroicons-solid";
import { useLocation, useNavigate } from "react-router";
import { useGlobalContext } from "../../contexts/global.context";

export default function NavBar({ mobileMode }: { mobileMode?: boolean }) {

    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { handleSignOut } = useGlobalContext()
    
    if (pathname === "/sign-in" || pathname === "/sign-up") {
        return null
    }

    return(
        <BarWrapper
            $mobileMode={mobileMode ? true : false}
        >
            <BarIcon
                onClick={() => navigate("/")}
            >
                <BarImage 
                    src={light_logo}
                    alt="RhythmB Logo"
                />
            </BarIcon>
            <BarIcon
                onClick={() => navigate("/search")}
                $selected={pathname === '/search'}
            >
                <MagnifyingGlass 
                    size={"2rem"}
                />
            </BarIcon>
            <BarIcon
                onClick={() => navigate("/playlists")}
                $selected={pathname === '/playlists'}
            >
                <Bars3BottomLeft 
                    size={"2rem"}
                />
            </BarIcon>
            <BarIcon
                onClick={() => navigate("/ratings")}
                $selected={pathname === '/ratings'}
            >
                <Heart 
                    size={"2rem"}
                />
            </BarIcon>
            <BarIcon
                onClick={() => {
                    handleSignOut!()
                    navigate('/sign-in')
                }}
            >
                <ArrowLeftOnRectangle 
                    size={"2rem"}
                />
            </BarIcon>
        </BarWrapper>
    )
}