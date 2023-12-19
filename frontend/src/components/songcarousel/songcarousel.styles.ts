import { ArrowLeftCircle, ArrowRightCircle } from "@styled-icons/heroicons-solid";
import styled from "styled-components";

export const CarouselList = styled.div`
    position: relative;
    width: 100%;
    max-width: 40rem;

    display: flex;

`

export const CarouselLeft = styled(ArrowLeftCircle)`
    position: absolute;
    top: 25%;
    left: -12%;
    z-index: 999;

    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: purple;
    }
`

export const GradientOverlayLeft = styled.div`
  position: absolute;
  z-index: 998;
  top: 0;
  bottom: 0;
  left: -1rem;
  width: 4rem;
  background: linear-gradient(to left, rgba(255, 255, 255, 0), #000000);
  pointer-events: none;
`

export const GradientOverlayRight = styled.div`
  position: absolute;
  z-index: 998;
  top: 0;
  bottom: 0;
  height: calc(100%-3rem);
  right: -1rem;
  width: 4rem;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), #000000);
  pointer-events: none;
`


export const CarouselRight = styled(ArrowRightCircle)`
    position: absolute;
    top: 25%;
    right: -12%;
    z-index: 999;

    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: purple;
    }
`


export const CarouselHiddenList = styled.div`
    display: flex;
    overflow: hidden;

    gap: 3rem;
    width: 100%;
`


export const CarouselItem = styled.div<{ $carouselIndex : number }>`
    padding-bottom: 3rem;
    height: 100%;
    max-width: 10rem;
    flex: 0 0 auto;
    transform: translateX(-${props => props.$carouselIndex * 13}rem);
    transition: all 0.2s ease-in-out;
`
