"use client"
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

class Memorandum extends Component {
  render() {
    return (
      <div className="w-full h-auto my-7">
        <Carousel autoPlay={true} swipeable={true} centerMode={true} centerSlidePercentage={30} showStatus={false} showThumbs={false} infiniteLoop={true}>
          <div className="w-20 h-20 overflow-hidden">
            <Image src="/logo/kohsar-uni-logo.png" width={80} height={80} alt='carousel hid' className='w-auto h-auto object-contain' />
          </div>
          <div className="w-20 h-20 overflow-hidden">
            <Image src="/logo/GU.jfif" width={80} height={80} alt='carousel' className='w-auto h-auto object-contain' />
          </div>
          <div className="w-20 h-20 overflow-hidden">
            <Image src="/logo/MNSUET.jfif" width={80} height={80} alt='carousel' className='w-auto h-auto object-contain' />
          </div>
          <div className="w-20 h-20 overflow-hidden">
            <Image src="/logo/NSUI.jfif" width={80} height={80} alt='carousel' className='w-auto h-auto object-contain' />
          </div>
          <div className="w-20 h-20 overflow-hidden">
            <Image src="/logo/PAF.jfif" width={80} height={80} alt='carousel' className='w-auto h-auto object-contain' />
          </div>

          <div className="w-20 h-20 overflow-hidden">
            <Image src="/logo/PTUT.jfif" width={80} height={80} alt='carousel' className='w-auto h-auto object-contain' />
          </div>
          <div className="w-20 h-20 overflow-hidden">
            <Image src="/logo/PU.png" width={80} height={80} alt='carousel' className='w-auto h-auto object-contain' />
          </div>
          <div className="w-20 h-20 overflow-hidden">
            <Image src="/logo/OIP.jfif.jpg" width={80} height={80} alt='carousel' className='w-auto h-auto object-contain' />
          </div>

          <div className="w-20 h-20 overflow-hidden">
            <Image src="/logo/UEIT.png" width={80} height={80} alt='carousel' className='w-auto h-auto object-contain' />
          </div>
          <div className="w-20 h-20 overflow-hidden">
            <Image src="/logo/bzu.png" width={80} height={80} alt='carousel' className='w-auto h-auto object-contain' />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Memorandum

// const Memorandum = () => {
//   return (
//     <Carousel
//       opts={{
//         align: "start",
//       }}
//       className="w-[65%] mx-auto"
//     >
//       <CarouselContent>

//         <CarouselItem className="md:basis-1/4 lg:basis-1/6">
//           <div className="p-1">
//             <Card>
//               <CardContent className="flex aspect-square items-center justify-center p-2">
//               </CardContent>
//             </Card>
//           </div>
//         </CarouselItem>

//         <CarouselItem className="md:basis-1/4 lg:basis-1/6">
//           <div className="p-1">
//             <Card>
//               <CardContent className="flex aspect-square items-center justify-center p-2">
//               </CardContent>
//             </Card>
//           </div>
//         </CarouselItem>
//         <CarouselItem className="md:basis-1/4 lg:basis-1/6">
//           <div className="p-1">
//             <Card>
//               <CardContent className="flex aspect-square items-center justify-center p-2">
//               </CardContent>
//             </Card>
//           </div>
//         </CarouselItem>

//         <CarouselItem className="md:basis-1/4 lg:basis-1/6">
//           <div className="p-1">
//             <Card>
//               <CardContent className="flex aspect-square items-center justify-center p-2">
//               </CardContent>
//             </Card>
//           </div>
//         </CarouselItem>

//         <CarouselItem className="md:basis-1/4 lg:basis-1/6">
//           <div className="p-1">
//             <Card>
//               <CardContent className="flex aspect-square items-center justify-center p-2">
//                 <Image src="/logo/banner-6.png" width={80} height={80} alt='carousel' className='w-auto h-auto object-contain' />
//               </CardContent>
//             </Card>
//           </div>
//         </CarouselItem>

//         <CarouselItem className="md:basis-1/4 lg:basis-1/6">
//           <div className="p-1">
//             <Card>
//               <CardContent className="flex aspect-square items-center justify-center p-2">
//                 <Image src="/logo/BARI-logo.png" width={50} height={50} alt='carousel' className='w-auto h-auto max-h-14 object-contain' />
//               </CardContent>
//             </Card>
//           </div>
//         </CarouselItem>

//         <CarouselItem className="md:basis-1/4 lg:basis-1/6">
//           <div className="p-1">
//             <Card>
//               <CardContent className="flex aspect-square items-center justify-center p-2">
//                 <Image src="/logo/form-dynamics-pakistan-logo.png" width={50} height={50} alt='carousel' className='w-auto h-auto max-h-14 object-cover' />
//               </CardContent>
//             </Card>
//           </div>
//         </CarouselItem>

//         <CarouselItem className="md:basis-1/4 lg:basis-1/6">
//           <div className="p-1">
//             <Card>
//               <CardContent className="flex aspect-square items-center justify-center p-2">
//                 <Image src="/logo/Government_College_University,Logo.png" width={50} height={50} alt='carousel' className='w-auto h-auto max-h-14 object-cover' />
//               </CardContent>
//             </Card>
//           </div>
//         </CarouselItem>

//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   )
// }

// export default Memorandum
