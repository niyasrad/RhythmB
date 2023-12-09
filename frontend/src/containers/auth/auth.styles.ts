import styled from "styled-components";

export const AuthWrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--primary-background-color);
`

export const AuthContent = styled.div`
    width: 40rem;
    max-width: 75%;

    padding: 1rem;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media only screen and (max-width: 990px) {
        max-width: 100%;
    }
`

export const AuthHeader = styled.img`
    width: 10rem;
    
    object-fit: contain;
    overflow: hidden;
`

export const AuthMain = styled.div`
    width: 100%;

    padding: 2rem;
    box-sizing: border-box;
    border-radius: var(--border-radius-large);

    display: grid;
    grid-template-columns: 2fr 1fr;

    background-color: var(--secondary-background-color);

    @media only screen and (max-width: 990px) {
        padding: 1rem;
        grid-template-columns: 1fr;
        gap: 3rem;
    }
`

export const AuthForm = styled.div`
    width: 90%;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media only screen and (max-width: 990px) {
        width: 100%;
    }
`

export const AuthTrademark = styled.div`
    width: 100%;
    
    border-left: 0.01rem solid var(--tertiary-background-color);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    @media only screen and (max-width: 990px) {
        border-left: none;
    }
`

export const AuthSwitch = styled.h3`
    max-width: 80%;
    
    font-weight: 300;
    text-align: center;

    color: var(--primary-color);

    span {
        color: var(--secondary-color);
        text-decoration: underline;
        cursor: pointer;
    }
`


export const AuthLogo = styled.img`
    height: 5rem;
    width: 5rem;
    object-fit: contain;
`

export const AuthVersion = styled.h3`
    font-weight: 500;
    color: var(--secondary-color);
`

export const AuthSpec = styled.h2`
    font-weight: 600;
    color: var(--primary-color);

    span {
        color: var(--secondary-color);
    }
`

export const AuthFormFields = styled.div`
    width: 100%;
    
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export const AuthFormField = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export const AuthFormLabel = styled.h3`
    font-weight: 300;
    color: var(--secondary-color);
`

export const AuthFormInput = styled.input`
    width: 100%;
    height: 2.5rem;

    font-size: 1.1em;
    font-weight: 600;

    border-radius: var(--border-radius-large);
    border: none;

    padding: 0.5rem;
    box-sizing: border-box;
    
    background-color: var(--tertiary-background-color);
`

export const AuthSubmit = styled.button`
    width: 10rem;

    align-self: flex-end;
    justify-self: end;

    padding: 0.2rem;
    box-sizing: border-box;
    
    border: 0.2rem solid var(--primary-color);
    border-radius: var(--border-radius-large);
    background-color: var(--primary-background-color);

    cursor: pointer;

    h2 {
        font-weight: 600;
        color: var(--primary-color);
    }
`