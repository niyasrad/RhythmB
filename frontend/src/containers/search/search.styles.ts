import styled from "styled-components";

export const SearchWrapper = styled.div`
    width: 100%;
    height: 90%;
    background-color: var(--secondary-background-color);

    padding: 2.5rem;
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

export const SearchBar = styled.div`
    width: 100%;
    max-width: 35rem;
    height: auto;

    border-radius: 1rem;
    padding: 1rem;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    background-color: var(--primary-background-color);
`

export const SearchInput = styled.input`
    height: 100%;

    background-color: transparent;
    color: var(--primary-text-color);

    font-size: 1.2em;

    outline: none;
    border: none;
`



export const SearchResultWrapper = styled.div`
    text-align: center;
    width: 100%;
    max-width: 40rem;
    height: auto;

    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const SearchResultContainer = styled.div<{ $huge ?: boolean }>`
    height: auto;

    padding: 3rem;
    box-sizing: border-box;

    border-radius: 1rem;

    display: grid;
    grid-template-columns: ${props => props.$huge ? "repeat(auto-fill, minmax(12rem,1fr))" : "repeat(auto-fill, minmax(9rem,1fr))"};
    background-color: var(--primary-background-color);
    gap: 3rem;
`
