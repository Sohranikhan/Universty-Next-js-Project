import BtnLink from "../../../Components/BtnLink/BtnLink"
import FacltyHero from "../../../Components/FacltyHero/FacltyHero"
import Marq from "../../../Components/Marque/Marque"
import UniAds from "../../../Components/UniAds/UniAds"
import { Facebook, Link2, Mail, Phone, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const getAboutCache = async(slug)=>{
    const res = await fetch(`http://localhost:3000/api/aboutmcut/${slug}`,{
      next:{
        revalidate: 1
      }
    })
    const data = await res.json()
    return data
  }
const aboutMcutPage = async({params}) => {
  const slug = params.slug
  const data = await getAboutCache(slug)
  if (data.success && data.sepAbout !== null) {
  return (
    <div className="w-full flex flex-col mt-5 px-2">
      <FacltyHero title={ data?.sepAbout?.title} />
      <Marq />
      <div className="flex flex-col sm:flex-row w-full mt-4">
      <div className="dangreroushtml flex-[4] flex-col w-full mt-4" dangerouslySetInnerHTML={{__html:data?.sepAbout?.description}}/>
 <UniAds />
      </div>
 </div>
  )
}else{
  return(
    <div className=" w-full h-screen flex flex-col items-center justify-center text-foreground">
<h2>Sorry! We are trying to fix this error</h2>
<p className="text-red-600">{data.message}</p>
<h3>Back To Home</h3>
<BtnLink href='/' text="Home" />
    </div>
)
}
}

export default aboutMcutPage