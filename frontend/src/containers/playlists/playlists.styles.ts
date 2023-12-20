import { PlusCircle } from "@styled-icons/heroicons-solid";
import styled from "styled-components";

export const PlaylistsWrapper = styled.div`
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

export const PlaylistBar = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;

`

export const PlaylistAdd = styled(PlusCircle)`
    color: white;
    cursor: pointer;
    transition: 0.2s all ease-in-out;

    &:hover {
        color: var(--primary-color)
    }
`

export const PlaylistNoSpec = styled.div`
    width: 100%;
    max-width: 50rem;

    height: 100%;
    background-color: var(--primary-background-color);

    padding: 3rem;
    box-sizing: border-box;

    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    text-align: center;

    @media only screen and (max-width: 990px) {
        height: 100%;
        padding: 1.5rem;
    }
`

export const PlaylistNoText = styled.div`
    max-width: 15rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
`
