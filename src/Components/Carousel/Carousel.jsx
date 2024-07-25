"use client"
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

class CarouselComp extends Component {
    render() {
        return (
            <div className="w-auto h-auto">
            <Carousel autoPlay={true} swipeable={true} showStatus={false} showThumbs={false} infiniteLoop={true}>
                <div className=''>
                    <Image src="/carousel/Image1.jpg" width={1000} height={640} alt='carousel' className='w-auto h-auto max-h-[34rem] object-cover' />
                </div>
                <div className=''>
                    <Image src="/carousel/Image2.jpg" width={1000} height={640} alt='carousel' className='w-auto h-auto max-h-[34rem] object-cover' />
                </div>
                <div className=''>
                    <Image src="/carousel/Image3.jpg" width={1000} height={640} alt='carousel' className='w-auto h-auto max-h-[34rem] object-cover' />
                </div>
            </Carousel>
            </div>
        );
    }
}

export default CarouselComp