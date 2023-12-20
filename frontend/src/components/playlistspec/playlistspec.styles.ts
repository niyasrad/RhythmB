import styled from "styled-components"

export const PlaylistsSpec = styled.div`
    position: relative;
    width: 100%;
    max-width: 50rem;
    height: auto;
    background-color: var(--primary-background-color);

    border-radius: 1rem;

    padding:3rem;
    box-sizing: border-box;

    display: grid;
    grid-template-columns: 14rem 70%;
    align-items: center;

    text-align: center;

    @media only screen and (max-width: 990px) {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 1.5rem;
    }
`

export const PlaylistsDesc = styled.div`
    width: 10rem;
    height: auto;
    text-align: left;

    @media only screen and (max-width: 990px) {
        width: 100%;
        text-align: center;

        br {
            display: none;
        }
    }
`

export const PlaylistTitle = styled.div`
    width: 10rem;
    height: auto;
    text-align: left;

    @media only screen and (max-width: 990px) {
        width: 100%;
        text-align: center;
    }
`

export const ColorHeaderText = styled.h2<{ $color: string }>`
    user-select: none;
    color: white;
    span {
        color: ${props => props.$color};
    }
`

export const DeletePlaylist = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--secondary-background-color);

    cursor: pointer;
    transition: 0.2s all ease-in-out;

    &:hover {
        background-color: red;
    }
`
