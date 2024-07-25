import Image from "next/image"
import Link from "next/link"
import BtnLink from "../BtnLink/BtnLink"

const ViceChanclor = () => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-8 w-full h-auto min-h-[30rem] mt-1">
      <div className="md:flex-[1] w-full items-center justify-center relative">
        <Image src="/Images/Vice-ChacelorImage1.webp" width={400} height={500} className="w-full h-auto mx-auto object-cover max-w-[400px] flex self-end" alt="Vice Chancellor Prof.Dr.Muhammad Saleem" />
        <div className="blurDiv absolute z-0 bottom-1 right-[50%] -translate-x-[-50%] w-max h-auto p-3 rounded">
        <span className="font-bold relative  z-10 text-background">Vice Chancellor <br /> Prof.Dr.Muhammad Saleem</span>
        </div>
      </div>
      <div className="md:flex-[1.5] w-full p-2">
<h2 className="md:text-3xl text-2xl my-2 mb-4 font-extrabold text-accent">Vice Chancellor Message</h2>
<p className="text-base font-semibold text-justify">I extend my heartiest welcome to all the students who, after an intense competition, have become the part of this prestigious institution.
     I hope that Mir Chaker Khan Rind University of Technology, being the only institute of technological education in this region, will prove a great blessing for people of Dera Ghazi Khan and the adjacent areas. </p>
     <br />
     <p className="text-base font-semibold text-justify">
       The very existence of this institution has provided the students of this educationally scant area the opportunity to have an access to modern scientific knowledge which will enable them to cope with the challenges posed by the modern world.</p>
       <br />
       <p className="text-base font-semibold text-justify mb-4">
        Mir Chaker Khan Rind University of Technology is in its infancy and its administration and faculty is striving hard to take it to the zenith of glory and excellence…</p>
<BtnLink text={'Read More'} href={'#'} />
      </div>
    </div>
  )
}

export default ViceChanclor