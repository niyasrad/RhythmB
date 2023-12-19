import styled from "styled-components";
import { ArrowRightCircle } from "@styled-icons/heroicons-solid";

export const HomeWrapper = styled.div`
    width: 100%;
    height: 90%;
    background-color: var(--secondary-background-color);

    padding: 1.5rem;
    box-sizing: border-box;

    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    overflow-y: auto;


    @media only screen and (max-width: 990px) {
        height: 100%;
        padding: 1.5rem;
    }
`

export const HomeSongs = styled.div`
    width: 100%;
    max-width: 50rem;
    height: auto;
    background-color: var(--primary-background-color);

    border-radius: 1rem;

    padding: 1.5rem;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    text-align: center;
`


export const HomeArtist = styled.div`
    width: 100%;
    max-width: 50rem;
    height: auto;
    background-color: var(--primary-background-color);

    border-radius: 1rem;

    padding: 1.5rem;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;

    @media only screen and (max-width: 990px) {
        padding: 1.5rem;
    }
`

export const HomeArtistIntro = styled.div`
    max-width: 20rem;
    height: auto;
    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

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
