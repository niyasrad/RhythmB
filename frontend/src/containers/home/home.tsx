import { DescText, HeaderTextHigh, HeaderTextLow, SubTextLow } from "../../components/index.styles";
import { useGlobalContext } from "../../contexts/global.context";
import { HomeAlbumsList, HomeArtist, HomeArtistDiscography, HomeArtistIntro, HomeSongs, HomeSongsList, HomeWrapper } from "./home.styles";

export default function Home() {

    const { username } = useGlobalContext()
    
    const timeOfDay = () => {

        const time = new Date().getHours()
        
        if (time >= 5 && time < 12) {
            return "morning"
        } else if (time >= 12 && time < 16) {
            return "afternoon"
        } else if (time >= 16 && time < 19) {
            return "evening"
        } else {
            return "night"
        }

    }   


    return (
        <HomeWrapper>
            <HeaderTextLow>Welcome, <span>{username}</span></HeaderTextLow>
            <HomeSongs>
                <DescText>Spice up your {timeOfDay()} with these tracks!</DescText>
                <HomeSongsList>
                </HomeSongsList>
            </HomeSongs>
            <HomeArtist>
                <HomeArtistIntro>
                    <DescText>Check out this artist,</DescText>
                    <HeaderTextHigh>SHINee</HeaderTextHigh>
                    <SubTextLow>We think you'd <span>love</span> their albums!</SubTextLow>
                </HomeArtistIntro>
                <HomeAlbumsList>
                </HomeAlbumsList>
                <HomeArtistIntro>
                    <SubTextLow>Visit SHINee’s <span>Discography</span></SubTextLow>
                    <HomeArtistDiscography 
                        size="6rem"
                    />
                </HomeArtistIntro>
            </HomeArtist>
        </HomeWrapper>
    )
}