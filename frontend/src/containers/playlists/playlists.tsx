import { useEffect, useState } from "react";
import { PlaylistAdd, PlaylistBar, PlaylistNoSpec, PlaylistNoText, PlaylistsWrapper } from "./playlists.styles";
import { useGlobalContext } from "../../contexts/global.context";
import { useNavigate } from "react-router";
import { HeaderTextLow, SubTextLow } from "../../components/index.styles";
import axios from "axios";
import { toast } from "react-toastify";
import PlaylistSpec from "../../components/playlistspec/playlistspec";
import { ColorHeaderText } from "../ratings/ratings.styles";

interface PlaylistType {
    user_id: string,
    id: string,
    title: string
}

export default function Playlists() {

    const { isLoggedIn, isLoading, handleSignOut } = useGlobalContext()
    const navigate = useNavigate()

    const [userPlaylists, setUserPlaylists] = useState<Array<PlaylistType>>([])

    useEffect(() => {
        if (!isLoggedIn && !isLoading) {
            handleSignOut!()
            navigate('/sign-in')
        }
    }, [isLoading, isLoggedIn])


    useEffect(() => {

        axios.get(import.meta.env.VITE_BASE_API + '/user/profile')
        .then((res) => {
            const response = res.data
            setUserPlaylists(response.data.playlists)
        })
        .catch(() => {
            toast.error("Error fetching playlists")
        })

    }, [])


    return (
        <PlaylistsWrapper>
            <PlaylistBar>
                <HeaderTextLow>Your <span>Playlists</span></HeaderTextLow>
                <PlaylistAdd
                    size="4rem"
                    onClick={() => navigate('/playlists/create')}
                />
            </PlaylistBar>
            {
                userPlaylists.length === 0 &&
                <PlaylistNoSpec>
                    <PlaylistNoText>
                        <ColorHeaderText $color="aqua">You haven't <span>had</span> any playlists yet!</ColorHeaderText>
                        <SubTextLow>To get started - On the top of any view, <span>click</span> on the + icon.</SubTextLow>
                    </PlaylistNoText>
                </PlaylistNoSpec>
            }
            {
                userPlaylists.map((playlist: PlaylistType) => (
                    <PlaylistSpec
                        key={playlist.id}
                        playlist_id={playlist.id}
                    />
                ))
            }
        </PlaylistsWrapper>
    )
}
