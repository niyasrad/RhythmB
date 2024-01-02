import { useEffect, useState } from "react";
import { AuthContent, AuthHeader, AuthWrapper, AuthForm, AuthSubmit, AuthSpec, ArtistFormFields, ArtistField } from "./auth.styles";

import logo_large from '../../assets/logo/rhythmb.svg';
import axios from "axios";
import { toast } from "react-toastify";

interface ArtistsProps {
    handleArtistsChange: (interests: string[]) => void,
    genres: string[],
    handleFormSubmit: () => void
}

interface ArtistType {
    id: string,
    genre: string,
    name: string
}

export default function Artists({ handleArtistsChange, genres, handleFormSubmit }: ArtistsProps) {

    const [artists, setArtists] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const [artistsDetails, setArtistsDetails] = useState<ArtistType[]>([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const requests = genres.map(async (genre) => {
                    const response = await axios.get('/api/artist/genre/' + genre);
                    return response.data.data || []
                })

                const artistsArrays = await Promise.all(requests)

                const allArtists = [...new Set(artistsArrays.flat())]

                setArtistsDetails(allArtists)
            } catch (error) {
                toast.error("Something went wrong!")
            }
        }

        fetchData();
    }, [genres]);

    const handleAuthSubmit = async () => {
        if (loading || artists.length < 2) {
            return
        }
        setLoading(true)
        await handleFormSubmit()
        setLoading(false)
    }

    useEffect(() => {
        handleArtistsChange(artists)
    }, [artists])

    return (
        <AuthWrapper>
            <AuthContent>
                <AuthHeader
                    src={logo_large}
                    alt="RhythmB"
                />
                <AuthForm>
                    <AuthSpec><span>Which Artist would you pick?</span>(Select Atleast 2)</AuthSpec>
                    <ArtistFormFields>
                    {
                        artistsDetails.map((artistDetail: ArtistType) => (
                            <ArtistField
                                key={artistDetail.id}
                                onClick={() => {
                                    if (artists.includes(artistDetail.id)) {
                                        setArtists(artists.filter((artist: string) => artist !== artistDetail.id))
                                    }
                                    else {
                                        setArtists([...artists, artistDetail.id])
                                    }
                                }}
                                $selected={artists.includes(artistDetail.id)}
                            >
                                {artistDetail.name.toUpperCase()}
                            </ArtistField>
                        ))
                    }
                    </ArtistFormFields>
                    <AuthSubmit
                        onClick={handleAuthSubmit}
                        $loading={loading || artists.length < 2}
                    >
                        <h3>Sign Up</h3>
                    </AuthSubmit>
                </AuthForm>
            </AuthContent>
        </AuthWrapper>
    )


}
