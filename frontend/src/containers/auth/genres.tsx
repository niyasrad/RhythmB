import { useEffect, useState } from "react";
import { AuthContent, AuthHeader, AuthWrapper, AuthForm, AuthSubmit, AuthFormFields, AuthSpec, GenreField } from "./auth.styles";

import logo_large from '../../assets/logo/rhythmb.svg';

interface GenresProps {
    handleGenresChange: (genres: string[]) => void,
    handleFormSubmit: () => void
}

interface GenreType {
    name: string,
    description: string
}

const genresDetails: GenreType[] = [
    {
        name: 'Pop',
        description: 'Like a bag of popcorn, our Pop genre is light, catchy, and leaves you wanting more.'
    },
    {
        name: 'EDM',
        description: 'Strap on your glow sticks! It is the heartbeat of the digital dance floor.'
    },
    {
        name: 'Rock',
        description: 'Guitars, and lyrics that speak to the soul. Warning, may cause spontaneous air guitar sessions.'
    },
    {
        name: 'R&B',
        description: 'Smooth like butter, R&B (Rhythm and Blues) is the soulful storyteller of our lineup.'
    }
]

export default function Genres({ handleGenresChange, handleFormSubmit }: GenresProps) {

    const [genres, setGenres] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const handleAuthSubmit = async () => {
        if (loading || genres.length !== 2) {
            return
        }
        setLoading(true)
        await handleFormSubmit()
        setLoading(false)
    }

    useEffect(() => {
        handleGenresChange(genres)
    }, [genres])

    return (
        <AuthWrapper>
            <AuthContent>
                <AuthHeader 
                    src={logo_large}
                    alt="RhythmB"
                />
                <AuthForm>
                    <AuthSpec><span>What’s More Of Your Taste?</span>(Select Two)</AuthSpec>
                    <AuthFormFields>
                    {
                        genresDetails.map((genreDetail: GenreType) => (
                            <GenreField
                                key={genreDetail.name}
                                onClick={() => {
                                    if (genres.includes(genreDetail.name)) {
                                        setGenres(genres.filter((genre: string) => genre !== genreDetail.name))
                                    }
                                    else {
                                        if (genres.length === 2) {
                                            return
                                        }
                                        setGenres([...genres, genreDetail.name])
                                    }
                                }}
                                $selected={genres.includes(genreDetail.name)}
                            >
                                {genreDetail.name.toUpperCase()}:  <span>{genreDetail.description}</span>
                            </GenreField>
                        ))
                    }
                    </AuthFormFields>
                    <AuthSubmit
                        onClick={handleAuthSubmit}
                        $loading={loading || genres.length !== 2}
                    >
                        <h3>Sign Up</h3>
                    </AuthSubmit>
                </AuthForm>
            </AuthContent>
        </AuthWrapper>
    )

    
}