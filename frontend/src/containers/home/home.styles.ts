import styled from "styled-components";
import { ArrowRightCircle } from "@styled-icons/heroicons-solid";

export const HomeWrapper = styled.div`
    width: 100%;
    height: 90%;
    background-color: var(--secondary-background-color);

    padding: 2.5rem;
    box-sizing: border-box;

    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    overflow-y: auto;


    @media only screen and (max-width: 990px) {
        height: 100%;
        padding: 1.5rem;
    }
`

export const HomeSongs = styled.div`
    width: 100%;
    height: auto;
    background-color: var(--primary-background-color);

    border-radius: 1rem;

    padding: 2.5rem;
    padding-bottom: 5rem;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media only screen and (max-width: 990px) {
        padding: 1.5rem;
    }
`

export const HomeSongsList = styled.div`
    width: 100%;
    height: auto;

    display: grid;
    gap: 3rem;
    grid-template-columns: repeat(auto-fill, minmax(10rem,1fr));
`


export const HomeArtist = styled.div`
    width: 100%;
    height: auto;
    background-color: var(--primary-background-color);

    border-radius: 1rem;

    padding: 2.5rem;
    padding-bottom: 5rem;
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;

    @media only screen and (max-width: 990px) {
        padding: 1.5rem;
    }
`

export const HomeArtistIntro = styled.div`
    max-width: 13rem;
    height: auto;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media only screen and (max-width: 768px) {
        width: 100%;
        max-width: 100%;
    }
`

export const HomeArtistDiscography = styled(ArrowRightCircle)`
    color: white;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: var(--primary-color);
        transform: scale(1.1);
    }
`

export const HomeAlbumsList = styled.div`
    height: auto;

    display: flex;

    gap: 2rem;
    flex-wrap: wrap;

`
