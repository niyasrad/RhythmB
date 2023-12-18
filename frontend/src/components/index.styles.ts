import styled from "styled-components";

export const HeaderTextHigh = styled.p`
    font-size: 1.6em;
    font-weight: 700;
    margin: 0;
    color: var(--primary-color);
    letter-spacing: -0.08rem;
    user-select: none;

    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

export const HeaderTextLow = styled.p`
    font-size: 1.6em;
    font-weight: 500;
    margin: 0;
    color: var(--primary-color);
    letter-spacing: -0.08rem;
    user-select: none;

    span {
        color: var(--secondary-color);
    }
`

export const DescText = styled.p`
    font-size: 1.25em;
    font-weight: 500;
    margin: 0;
    color: white !important;
    letter-spacing: -0.05rem;
    user-select: none;
`

export const SubTextHigh = styled.p`
    font-size: 1.1em;
    font-weight: 800;
    margin: 0;
    color: white;
    letter-spacing: 0.02rem;
    user-select: none;

    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    span {
        color: var(--primary-color);
    }
`

export const SubTextLow = styled.p`
    font-size: 1em;
    font-weight: 400;
    margin: 0;
    color: white;
    letter-spacing: 0.03rem;
    user-select: none;

    span {
        color: var(--primary-color);
    }
`
