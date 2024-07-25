import Image from "next/image"


const FacltyHero = ({title, image}) => {
  return (
    <div className="w-full h-auto max-h-[500px] bg-gradient-to-tr from-primary/20 to-secondary/20 relative">
        <Image src={image? image : '/Images/faculty_Hero.webp'} alt="faculty_Hero.webp" width={1200} height={300} className="w-auto h-auto min-w-full max-h-[300px] object-center" />
        <div className="absolute bottom-0 left-0 flex items-center justify-center w-full h-14 ">
        <h1 className="text-background text-2xl sm:text-3xl md:text-4xl z-10 font-bold -tracking-tighter">{title || ''}</h1>
        <div className="blurDiv"></div>
        </div>
    </div>
  )
}

export default FacltyHero