import styled from "styled-components";
import { PlayCircle, PauseCircle } from "@styled-icons/heroicons-solid";

export const SongWrapper = styled.div`
    position: relative;
    padding: 1.5rem;

    width: 100%;

    box-sizing: border-box;

    background-color: var(--secondary-background-color);

    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 0.5rem;
    border-radius: 1rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.1s ease-in-out;

    &:hover {
        background-color: var(--tertiary-color);
    }
`

export const SongImage = styled.img`
    object-fit: cover;
    border-radius: 1rem;
`

export const SongPlay = styled(PlayCircle)`
    position: absolute;
    top: 105%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        width: 5rem;
        height: 5rem;
    }
`

export const SongPause = styled(PauseCircle)`
    position: absolute;
    top: 105%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--secondary-color);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        width: 5rem;
        height: 5rem;
    }
`
