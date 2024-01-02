import { useNavigate } from "react-router";
import { PlaylistCreateField, PlaylistCreateSubmit, PlaylistCreateWrapper, PlaylistTitleField, SelectionField, SelectionFormFields } from "./playlistcreate.styles";
import { useGlobalContext } from "../../contexts/global.context";
import { useEffect, useState } from "react";
import { DescText, HeaderTextLow } from "../../components/index.styles";
import axios from "axios";
import Loader from "../../components/loader/loader";
import { toast } from "react-toastify";

const genres = ["Pop", "R&B", "EDM", "Rock"]
const numberOfSongs = [5, 10, 20, 30]

interface ArtistType {
    id: string,
    genre: string,
    name: string
}

interface PlaylistProps {
    title: string,
    user_id: string,
    genres: Array<string>,
    artists: Array<string>,
    num_songs: number
}

export default function PlaylistCreate() {

    const [loading, setLoading] = useState<boolean>(true)
    const [artists, setArtists] = useState<Array<ArtistType>>([])

    const { isLoggedIn, isLoading, userID, handleSignOut } = useGlobalContext()

    const [playlistForm, setPlaylistForm] = useState<PlaylistProps>({
        title: '',
        user_id: '',
        genres: [],
        artists: [],
        num_songs: 5
    })

    const checkForm = () => {
        if (playlistForm.title.trim() === '') {
            toast.error("Please enter a title")
            return false
        }
        if (playlistForm.genres.length === 0 && playlistForm.artists.length === 0) {
            toast.error("Please select at least one genre or artist")
            return false
        }
        return true
    }

    const handleSubmit = () => {
        if (!checkForm()) return
        axios.post('/api/playlist/create/conditional', playlistForm)
        .then(() => {
            toast.success("Playlist created")
            navigate('/playlists')
        })
        .catch(() => {
            toast.error("Error creating playlist")
        })
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn && !isLoading) {
            handleSignOut!()
            navigate('/sign-in')
        }
        setPlaylistForm({
            ...playlistForm,
            user_id: userID
        })
    }, [isLoading, isLoggedIn, userID])

    useEffect(() => {
        axios.get('/api/artist/get/all')
        .then((res) => {
            const response = res.data
            setArtists(response.data)
            setLoading(false)
        })
        .catch(() => {})
    }, [])

    if (loading) return <Loader home />


    return (
        <PlaylistCreateWrapper>
            <HeaderTextLow>Create <span>Your Playlist</span></HeaderTextLow>
            <PlaylistCreateField>
                <DescText>What's The Title?</DescText>
                <PlaylistTitleField
                    placeholder="My Vibe List"
                    onChange={(e) => setPlaylistForm({
                        ...playlistForm,
                        title: e.target.value
                    })}
                />
            </PlaylistCreateField>
            <PlaylistCreateField>
                <DescText>Choose Your Genres</DescText>
                <SelectionFormFields>
                {
                    genres.map((genreTitle: string) => (
                        <SelectionField
                            $selected={playlistForm.genres.includes(genreTitle)}
                            onClick={() => {
                                if (playlistForm.genres.includes(genreTitle)) {
                                    setPlaylistForm({
                                        ...playlistForm,
                                        genres: playlistForm.genres.filter((genre: string) => genre !== genreTitle)
                                    })
                                    return
                                }
                                setPlaylistForm({
                                    ...playlistForm,
                                    genres: [...playlistForm.genres, genreTitle]
                                })
                            }}
                        >
                            {genreTitle}
                        </SelectionField>
                    ))
                }
                </SelectionFormFields>
            </PlaylistCreateField>
            <PlaylistCreateField>
                <DescText>Choose Your Artists</DescText>
                <SelectionFormFields>
                {
                    artists.map((artist: ArtistType) => (
                        <SelectionField
                            $selected={playlistForm.artists.includes(artist.id)}
                            onClick={() => {
                                if (playlistForm.artists.includes(artist.id)) {
                                    setPlaylistForm({
                                        ...playlistForm,
                                        artists: playlistForm.artists.filter((id: string) => id !== artist.id)
                                    })
                                    return
                                }
                                setPlaylistForm({
                                    ...playlistForm,
                                    artists: [...playlistForm.artists, artist.id]
                                })
                            }}
                        >
                            {artist.name}
                        </SelectionField>
                    ))
                }
                </SelectionFormFields>
            </PlaylistCreateField>
            <PlaylistCreateField>
                <DescText>How Many Songs?</DescText>
                <SelectionFormFields>
                {
                    numberOfSongs.map((num: number) => (
                        <SelectionField
                            $selected={playlistForm.num_songs === num}
                            onClick={() => {
                                setPlaylistForm({
                                    ...playlistForm,
                                    num_songs: num
                                })
                            }}
                        >
                            {num}
                        </SelectionField>
                    ))
                }
                </SelectionFormFields>
            </PlaylistCreateField>
            <PlaylistCreateField>
                <PlaylistCreateSubmit
                    onClick={handleSubmit}
                >
                    Create Playlist
                </PlaylistCreateSubmit>
            </PlaylistCreateField>
        </PlaylistCreateWrapper>
    )
}
