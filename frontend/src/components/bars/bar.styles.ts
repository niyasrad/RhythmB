import styled, { keyframes } from "styled-components";

export const BarWrapper = styled.div<{ $mobileMode: boolean }>`
    width: 4.5rem;
    height: auto;

    padding: 1rem 0.5rem;
    box-sizing: border-box;
    border-radius: var(--border-radius-large);

    justify-self: center;

    display: ${props => props.$mobileMode ? "none" : "flex"};
    flex-direction: column;
    gap: 1rem;

    background-color: var(--secondary-background-color);

    @media only screen and (max-width: 768px) {
        width: 100%;
        height: 5rem;

        padding: 0.5rem 1rem;

        justify-self: auto;

        display: ${props => props.$mobileMode ? "flex" : "none"};
        flex-direction: row;
        justify-content: space-between;
    }
`

export const BarIcon = styled.div<{ $white ?: boolean, $color ?: string, $selected ?: boolean }>`
    width: 3.5rem;
    height: 3.5rem;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    cursor: pointer;

    background-color: ${props => props.$white || props.$selected ? "white" : "var(--primary-background-color)"};
    color: ${props => props.$selected ? "var(--primary-background-color)" : props.$color || "white"};

    transition: all 0.1s ease-in-out;

    &:hover {
        background-color: ${props => props.$white ? "var(--primary-background-color)": "white"};
        color: ${props => props.$selected && props.$white ? "var(--primary-background-color)" : props.$white ? "white" : props.$color || "var(--primary-background-color)"};
    }

    svg {
        width: 1.5rem;
        height: 1.5rem;
    }
`

export const BarImage = styled.img<{ $rotate ?: boolean }>`
    width: 100%;
    height: 100%;
    object-fit: cover;

    animation: ${props => props.$rotate ? ImageRotation : "none"} 3s linear infinite;
    transition: all 3s ease-in-out;
`

export const ImageRotation = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`
