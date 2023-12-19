import { useState } from "react"
import Song from "../song/song"
import { CarouselHiddenList, CarouselItem, CarouselLeft, CarouselList, CarouselRight, GradientOverlayLeft, GradientOverlayRight } from "./songcarousel.styles"

export interface SongCarouselProps {
    songIDs: string[]
}


export default function SongCarousel({ songIDs }: SongCarouselProps) {

    const [carouselIndex, setCarouselIndex] = useState<number>(0)

    const handlePrev = () => {
        setCarouselIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : songIDs.length - 1))
    }

    const handleNext = () => {
        setCarouselIndex((prevIndex) => (prevIndex < songIDs.length - 1 ? prevIndex + 1 : 0))
    }


    return (
        <CarouselList>
            <CarouselLeft 
                size="4rem"
                color="#FFF"
                onClick={handlePrev}
            />
            <GradientOverlayLeft />
            <CarouselHiddenList>
            {
                songIDs.map((songID, index) => (
                    <CarouselItem
                        $carouselIndex={carouselIndex}
                    >
                        <Song
                            key={index}
                            song_id={songID}
                        />
                    </CarouselItem>
                ))
            }
            </CarouselHiddenList>
            <GradientOverlayRight />
            <CarouselRight 
                size="4rem"
                color="#FFF"
                onClick={handleNext}
            />
        </CarouselList>
    )

}