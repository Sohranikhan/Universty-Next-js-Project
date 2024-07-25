import BtnLink from "../../../Components/BtnLink/BtnLink"
import FacltyHero from "../../../Components/FacltyHero/FacltyHero"
import Marq from "../../../Components/Marque/Marque"
import UniAds from "../../../Components/UniAds/UniAds"
import { Facebook, Link2, Mail, Phone, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const getAdmissionCache = async(slug)=>{
try {
  const res = await fetch(`https://mcut.vercel.app/api/admission/${slug}`,{
    next:{
      revalidate: 1
    }
  })
  const data = await res.json()
  return {
    success: true,
    data
  }
} catch (error) {
  return {
    success: false,
    error: error.message
  }
}
  }
const officePage = async({params}) => {
  const slug = params.slug
  const data = await getAdmissionCache(slug)
  if (data.success && data?.data?.sepAdmission !== null) {
  return (
    <div className="w-full flex flex-col mt-5 px-2">
      <FacltyHero title={ data?.sepAdmission?.title} />
      <Marq />
      <div className="flex flex-col sm:flex-row w-full mt-4">
      <div className="dangreroushtml flex-[4] flex-col w-full mt-4" dangerouslySetInnerHTML={{__html:data?.sepAdmission?.description}}/>
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

export default officePage