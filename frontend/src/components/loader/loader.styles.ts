import styled from "styled-components";

export const LoaderWrapper = styled.div<{ $home: boolean }>`
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items:center;

    background-color: ${props => props.$home ? "var(--secondary-background-color)" : "transparent)"};
    border-radius: ${props => props.$home ? "1rem" : "0"};

    @media screen and (max-width: 990px) {
        height: 100%;
    }
`

export const Loading = styled.img`
    width: 6rem;
    height: 6rem;
    max-width: 100%;
    max-height: 100%;


    animation: beat 1s ease-in-out infinite;

    @keyframes beat {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.8);
        }
        100% {
            transform: scale(1);
        }
    }
`
