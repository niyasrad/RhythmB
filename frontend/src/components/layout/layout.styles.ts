import styled from "styled-components";

export const LayoutWrapper = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-columns: 10rem 1fr 10rem;

    justify-content: center;
    align-items: center;


    @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 6.5rem 6.5rem;
    }
`