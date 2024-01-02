import { useEffect, useState } from "react"
import { ColorHeaderText, DeletePlaylist, PlaylistTitle, PlaylistsSpec } from "./playlistspec.styles"
import SongCarousel from "../songcarousel/songcarousel"
import axios from "axios"
import { toast } from "react-toastify"
import { Trash } from "@styled-icons/heroicons-solid"

interface SongType {
    id: string,
    album_id: string,
    artist_id: string,
    title: string,
    genre: string,
    length: number
}


export default function PlaylistSpec({ playlist_id }: { playlist_id: string }) {

    const [playlistSongs, setPlaylistSongs] = useState<Array<SongType>>([])
    const [playlistTitle, setPlaylistTitle] = useState<string>('')

    const [playlistDeleted, setPlaylistDeleted] = useState<boolean>(false)

    useEffect(() => {
        axios.get('/api/playlist/' + playlist_id)
        .then((res) => {
            const response = res.data
            setPlaylistSongs(response.data.songs)
            setPlaylistTitle(response.data.title)
        })
        .catch(() => {
            toast.error("Error fetching playlist")
        })

    }, [])

    const handleDeletePlaylist = () => {
        axios.delete('/api/playlist/' + playlist_id)
        .then(() => {
            toast.success("Playlist deleted")
            setPlaylistDeleted(true)
        })
        .catch(() => {
            toast.error("Error deleting playlist")
        })
    }

    if (playlistDeleted) return null

    return (
        <PlaylistsSpec>
            <PlaylistTitle>
                <ColorHeaderText $color="red">{playlistTitle}</ColorHeaderText>
                <ColorHeaderText
                    $color={playlistSongs.length > 15 ? "red": playlistSongs.length > 5 ? "purple" : "aqua"}
                >
                    <span>{playlistSongs.length} Tracks </span>
                </ColorHeaderText>
            </PlaylistTitle>
            <SongCarousel
                songIDs={playlistSongs.map((song: SongType) => song.id)}
            />
            <DeletePlaylist>
                <Trash
                    size="1.5rem"
                    style={{cursor: "pointer"}}
                    onClick={handleDeletePlaylist}
                />
            </DeletePlaylist>

        </PlaylistsSpec>
    )
}
