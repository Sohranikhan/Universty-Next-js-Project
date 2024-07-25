import BtnLink from "../../../Components/BtnLink/BtnLink"
import FacltyHero from "../../../Components/FacltyHero/FacltyHero"
import IconMaper from "../../../Components/IconMaper/IconMaper"
import { Facebook, Link2, Mail, Phone, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const getOfficeCache = async(slug)=>{
    const res = await fetch(`http://localhost:3000/api/administration/${slug}`,{
      next:{
        revalidate: 1
      }
    })
    const data = await res.json()
    return data
  }
const officePage = async({params}) => {
  const slug = params.slug
  const data = await getOfficeCache(slug)
  if (data.success && data.sepOffice !== null) {
  return (
    <div className="w-full h-auto p-2">
      <FacltyHero title={data?.sepOffice?.title} />
      <div className=" w-full flex md:flex-row flex-col gap-3 mt-6 p-2 my-6">
        <div className="w-full flex flex-col-reverse md:flex-row text-justify justify-between">
        <div className="flex-[3]">
        <div className="htmldiv text-justify" dangerouslySetInnerHTML={{__html: data.sepOffice.description}} />
<h3 className="text-accent my-6">Staff</h3>
        <div className="w-full h-auto staff grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
{data?.sepOffice?.staff && data?.sepOffice?.staff.map((stf)=>(
  <div key={`${stf._id}`} className="flex flex-col w-full mx-2 h-auto gap-y-2 shadow-2xl rounded p-2">
  <Image src={stf?.image} width={300} height={300} alt={stf?.name || 'staff memver Image'} className="w-full max-h-auto max-w-72 h-52 object-cover" />
              <h5>{stf?.position}</h5>
              <hr className="border-accent" />
              <h4>{stf?.name}</h4>
  
              <p className="flex items-center mt-2 text-sm gap-3 font-bold"><Mail className="text-primary" /> {stf?.email}</p>
              <p className="flex items-center mt-2 text-sm gap-3 font-bold"><Phone className="text-primary" /> {stf?.phone}</p>
  
              <div className="flex flex-wrap gap-2 mt-3 mb-5">
              {stf?.socialMedia?.map(med=>(
                  <Link href={med.url} key={`${med._id}`} className="socialAccount w-auto rounded-lg py-3 px-3 bg-primary/20 text-primary">
                  <IconMaper account={med.provider} />
                  </Link>
              ))}
          </div>
  </div>
))}
       </div>
        </div>
        <div className="sm:ml-14 md:sticky top-16 md:top-28 right-0 flex-1 w-full h-full min-h-96 p-3">
          <Image src={data?.sepOffice?.head?.image} width={320} height={350} alt={data?.sepOffice?.head?.name || 'Head Image'} className="w-full h-auto max-w-72 max-h-72 object-cover" />
          <div className="flex flex-col gap-y-1 mt-2">
            <h5>{data?.sepOffice?.head?.position}</h5>
            <hr className="border-accent" />
            <h4>{data?.sepOffice?.head?.name}</h4>

            <p className="flex items-center mt-2 text-sm gap-3 font-bold"><Mail className="text-primary" /> {data?.sepOffice?.head?.email}</p>
            <p className="flex items-center mt-2 text-sm gap-3 font-bold"><Phone className="text-primary" /> {data?.sepOffice?.head?.phone}</p>

            <div className="flex flex-wrap gap-2 mt-3 mb-5">
            {data?.sepOffice?.head?.socialMedia?.map(med=>(
                <Link href={med.url} key={`${med._id}`} className="socialAccount w-auto rounded-lg py-3 px-3 bg-primary/20 text-primary">
                <IconMaper account={med.provider} />
                </Link>
            ))}
        </div>
          </div>



        </div>
         
        </div>
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