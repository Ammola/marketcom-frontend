import React, {FC} from 'react';
import Carousel from "react-bootstrap/Carousel";
import {Link} from "react-router-dom";
import img1 from '../assets/bxco4bjsnacotaj1w9l0.png'
import img2 from '../assets/x66lj1b4y4j2vz2rn26x.png'
import img3 from '../assets/xrvbpzjfhdhro9wooimh.png'

const sliderItems = [
    {
        id: "98",
        name: "Photo 1",
        url: img1
    },
    {
        id: "59",
        name: "Photo 2",
        url: img2
    },
    {
        id: "60",
        name: "Photo 2",
        url: img3
    }
];

const CarouselImageSlider = () => {
    const settings = {
        indicators: false,
        fade: true,
        infinite: true,
        interval: 3000
    }

    return (
        <div>
            <Carousel style={{width:"100%"}}>
                {sliderItems.map((item, index) => {
                    return (
                        <Carousel.Item key={item.id}>
                           
                                <img src={item.url} alt={item.name} width="100%" height="100%"/>
                            
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    );
}

export default CarouselImageSlider;