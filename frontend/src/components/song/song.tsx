import { SubTextHigh } from "../index.styles";
import { SongWrapper, SongImage, SongPlay } from "./song.styles";

export default function Song({ song_id }: { song_id: string }) {
    return (
        <SongWrapper>
            <SongImage 
                src={import.meta.env.VITE_BASE_API + "/cdn_asset/albums/" + song_id + '.jpg'}
                alt="Song Image"
            />
            <SubTextHigh><span>10X</span></SubTextHigh>
            <SubTextHigh>SHINee</SubTextHigh>
            <SongPlay 
                size="4rem"
            />
        </SongWrapper>
    )
}