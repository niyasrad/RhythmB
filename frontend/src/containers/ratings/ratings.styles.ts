import styled from "styled-components";

export const RatingsWrapper = styled.div`
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

export const RatingNoSpec = styled.div`
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

export const RatingNoText = styled.div`
    max-width: 15rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
`


export const RatingsSpec = styled.div`
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

export const RatingsDesc = styled.div`
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

export const ColorHeaderText = styled.h2<{ $color: string }>`
    user-select: none;
    color: white;
    span {
        color: ${props => props.$color};
    }
`