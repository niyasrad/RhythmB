import { SubTextHigh } from "../index.styles";
import { AlbumWrapImage, AlbumWrapWrapper } from "./albumwrap.styles";

export default function AlbumWrap({ album_id }: { album_id: string}) {
    return (
        <AlbumWrapWrapper>
            <AlbumWrapImage 
                src={import.meta.env.VITE_BASE_API + "/cdn_asset/albums/" + album_id + '.jpg'}
                alt="Album Image"
            />
            <SubTextHigh><span>HARD</span></SubTextHigh>
            <SubTextHigh>SHINee</SubTextHigh>
        </AlbumWrapWrapper>
    )
}