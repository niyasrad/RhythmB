import { useLocation } from "react-router";
import NavBar from "../bars/navbar";
import PlayBar from "../bars/playbar";
import { LayoutWrapper } from "./layout.styles";

export default function Layout({ children }: { children: React.ReactNode }){

    const { pathname } = useLocation()

    if (pathname === "/sign-in" || pathname === "/sign-up") {
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <LayoutWrapper>
            <NavBar />
            {children}
            <PlayBar />
            <PlayBar mobileMode />
            <NavBar mobileMode />
        </LayoutWrapper>
    )

}