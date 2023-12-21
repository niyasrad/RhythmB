import { useEffect, useRef, useState } from "react";
import { SearchBar, SearchInput, SearchResultContainer, SearchResultWrapper, SearchWrapper } from "./search.styles";
import { MagnifyingGlass } from "@styled-icons/heroicons-solid";
import axios from "axios";
import { AlbumType, ArtistType, SearchResults, SongType } from "./search.data";
import { HeaderTextHigh } from "../../components/index.styles";
import AlbumWrap from "../../components/albumwrap/albumwrap";
import SongCarousel from "../../components/songcarousel/songcarousel";
import { useGlobalContext } from "../../contexts/global.context";
import { useNavigate } from "react-router";

export default function Search() {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [searchResult, setSearchResult] = useState<SearchResults | null>(null)

    const [songResults, setSongResults] = useState<Array<SongType>>([])
    const [artistResults, setArtistResults] = useState<Array<ArtistType>>([])
    const [albumResults, setAlbumResults] = useState<Array<AlbumType>>([])

    const { isLoggedIn, isLoading, handleSignOut } = useGlobalContext()
    const navigate = useNavigate()


    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (!isLoggedIn && !isLoading) {
            handleSignOut!()
            navigate('/sign-in')
        }
    }, [isLoading, isLoggedIn])

    useEffect(() => {

        let debounceTimeout: number | undefined

        const getSearchResults = async () => {

            axios.post(import.meta.env.VITE_BASE_API + '/search/any', {
                query: searchTerm
            })
            .then((res) => {
                setSearchResult(res.data)
            })
            .catch(() => {})

        }

        if (debounceTimeout !== undefined) {
            clearTimeout(debounceTimeout)
        }

        debounceTimeout = setTimeout(() => {
            if (searchTerm.trim() !== '') {
                getSearchResults()
            }
        }, 1000)

        return () => {
            clearTimeout(debounceTimeout)
        }

    }, [searchTerm])

    useEffect(() => {

        if (inputRef.current) {
          inputRef.current.focus()
        }

        const handleKeyDown = (event: KeyboardEvent) => {
          if (inputRef.current && /[a-zA-Z0-9]/.test(event.key)) {
            inputRef.current.focus();
          }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
          document.removeEventListener('keydown', handleKeyDown)
        }

    }, [])

    useEffect(() => {

        if (searchResult === null) {
            setSongResults([])
            setArtistResults([])
            setAlbumResults([])
            return
        }

        const songs: SongType[] = []
        const artists: ArtistType[] = []
        const albums: AlbumType[] = []

        for (const searchRes of searchResult.data) {
            if (searchRes['_index'] === 'songs') {
                songs.push(searchRes)
            } else if (searchRes['_index'] === 'artists') {
                artists.push(searchRes)
            } else if (searchRes['_index'] === 'albums') {
                albums.push(searchRes)
            }
        }

        setSongResults(songs.splice(0, 4))
        setArtistResults(artists.splice(0, 3))
        setAlbumResults(albums.splice(0, 3))

    }, [searchResult])

    return (
        <SearchWrapper>
            <SearchBar>
                <SearchInput
                    type="text"
                    placeholder="Type Something.."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    ref={inputRef}
                />
                <MagnifyingGlass
                    size="1.5rem"
                    color="#fff"
                />
            </SearchBar>
            {
                songResults.length > 0 && (
                    <SearchResultWrapper>
                        <HeaderTextHigh>Songs</HeaderTextHigh>
                        <SongCarousel
                            songIDs={songResults.map((song) => song['_id'])}
                        />
                    </SearchResultWrapper>
                )
            }
            {
                albumResults.length > 0 && (
                    <SearchResultWrapper>
                        <HeaderTextHigh>Albums</HeaderTextHigh>
                        <SearchResultContainer
                            $huge
                        >
                            {
                                albumResults.map((album) => {
                                    return (
                                        <AlbumWrap
                                            key={album['_id']}
                                            album_id={album['_id']}
                                            home={false}
                                        />
                                    )
                                })
                            }
                        </SearchResultContainer>
                    </SearchResultWrapper>
                )
            }
            {
                artistResults.length > 0 && (
                    <></>
                )
            }
        </SearchWrapper>
    )
}
