import styled from "styled-components";

export const AlbumWrapWrapper = styled.div`
    padding: 1.5rem;
    box-sizing: border-box;

    width: 15rem;

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

    @media only screen and (max-width: 500px) {
        width: 100%;
    }
`

export const AlbumWrapImage = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
`
