import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { SubTextHigh } from "../index.styles";
import { AlbumWrapImage, AlbumWrapWrapper } from "./albumwrap.styles";

interface AlbumDetails {
    title: string,
    artist: string,
    album: string
}

export default function AlbumWrap({ album_id, home }: { album_id: string, home: boolean}) {

    const [albumDetails, setAlbumDetails] = useState<AlbumDetails>({
        title: '',
        artist: '',
        album: ''
    })

    useEffect(() => {
        axios.get(import.meta.env.VITE_BASE_API + `/album/${album_id}`)
        .then(res => {
            setAlbumDetails({
                title: res.data.data.title,
                artist: res.data.data.artist.name,
                album: res.data.data.title
            })
        })
        .catch(() => {
            toast.error("Failed to get album details")
        })
    }, [album_id])

    if (!album_id) return null

    return (
        <AlbumWrapWrapper $home={home}>
            <AlbumWrapImage
                src={import.meta.env.VITE_BASE_API + "/cdn_asset/albums/" + album_id + '.jpg'}
                alt="Album Image"
            />
            <SubTextHigh><span>{albumDetails.title}</span></SubTextHigh>
            <SubTextHigh>{albumDetails.artist}</SubTextHigh>
        </AlbumWrapWrapper>
    )
}
