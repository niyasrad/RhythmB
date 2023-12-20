import styled from "styled-components";

export const PlaylistCreateWrapper = styled.div`
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

export const PlaylistTitleField = styled.input`
    width: 100%;
    max-width: 25rem;
    height: auto;

    border-radius: 1rem;
    color: var(--primary-text-color);

    font-size: 1.2em;

    outline: none;
    border: none;
    padding: 1rem;
    box-sizing: border-box;

    background-color: var(--secondary-background-color);
`

export const PlaylistCreateField = styled.div`
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


export const SelectionFormFields = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    grid-auto-rows: max-content;

    @media only screen and (max-width: 990px) {
        grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
        gap: 0.5rem;
    }
`

export const SelectionField = styled.p<{ $selected: boolean }>`
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    user-select: none;

    border: 0.2rem solid var(--tertiary-color);
    border-radius: var(--border-radius-large);
    background-color: ${props => props.$selected ? "var(--tertiary-color)" : "transparent"};

    transition: all 0.2s ease-in-out;

    cursor: pointer;
    color: var(--secondary-color);

    span {
        color: ${props => props.$selected ? "var(--secondary-font-color)" : "var(--primary-color)"};
        font-weight: 600;
        user-select: none;
    }

    &:hover {
        border: 0.2rem solid white;
    }
`

export const PlaylistCreateSubmit = styled.button`
    width: 100%;
    max-width: 25rem;
    height: auto;

    border-radius: 1rem;
    color: var(--primary-text-color);

    font-size: 1.2em;

    outline: none;
    border: 0.2rem solid var(--tertiary-color);
    padding: 1rem;
    box-sizing: border-box;

    background-color: var(--tertiary-color);

    cursor: pointer;
    transition: 0.2s all ease-in-out;

    &:hover {
        background-color: var(--primary-background-color);
        color: var(--primary-color);
        border: 0.2rem solid white;
    }
`
