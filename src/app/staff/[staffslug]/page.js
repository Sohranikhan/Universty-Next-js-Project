import connect from "../../../utils/connect"
import Link from "next/link"
import UniAds from "../../../Components/UniAds/UniAds"
import BtnLink from "../../../Components/BtnLink/BtnLink"
import IconMaper from "../../../Components/IconMaper/IconMaper"
import { Calendar, Lightbulb, User } from "lucide-react"
import Image from "next/image"


const getStaff = async(staffslug)=>{
    await connect()
      const res = await fetch(`http://localhost:3000/api/staff/${staffslug}`,{
        next:{
            revalidate: 60
        }
      })
      const data = await res.json()
      return data
    }
const staffPage = async(searchParams) => {
const {params} = searchParams
const { staffslug} = params

const data = await getStaff(staffslug)
if (data.success) {
  return(
    <div className="flex md:flex-row flex-col w-full mt-3">
    <div className="w-full flex-[4] flex-col items-center justify-center px-4">
        <div className="flex flex-col md:flex-row items-center gap-3 mb-4">

       <div className="image w-[150px] h-[150px] overflow-hidden rounded-full bg-secondary flex items-center justify-center pb-3">
        {data?.sepStaff?.image ?
       <Image src={data?.sepStaff?.image} alt="Image" width={200} height={230} className="object-cover self-center" />
       : <User size={140} color="white" />
        }
       </div>
       <div className="info flex flex-col md:justify-start md:items-start  items-center justify-center">
        <h2 className="text-primary">{data?.sepStaff?.name}</h2>
        <h4 className="max-w-96 md:text-start text-center text-gray-900">{data?.sepStaff?.position} 
          <br /> {data?.sepStaff?.department?.name}</h4>
       </div>
       
        </div>
        <h4>Social Media Accounts</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-3 mb-5">
                        {data?.sepStaff?.socialMedia?.map(med=>(
                <Link href={med?.url} key={`${med._id}`} className="socialAccount w-auto rounded-lg py-3 px-3 bg-primary/20 text-primary">
                <IconMaper account={med.provider} />
                </Link>
            ))}
        </div>

        <h4>Research Papers</h4>
        <div className="w-full p-2 grid grid-cols-1 lg:grid-cols-2">
        {data?.sepStaff?.researchPapers && data?.sepStaff?.researchPapers?.map(paper=>(
            <Link href={paper.url} key={paper.title} className="p-3 shadow-sm shadow-card-foreground transition-transform mx-auto bg-background/90 flex flex-col hover:bg-green-200 gap-2 items-start justify-start w-full h-auto min-h-28 rounded border-2 border-foreground/10">
            <h3 className="text-lg">{paper.title}</h3>
            <p className="flex gap-2 items-center font-bold bg-green-200 rounded-lg px-1 py2"><Lightbulb color='green' />{paper.publication}</p>
            <p className="flex gap-2 font-bold"><Calendar color='green' />{paper.year}</p>
            </Link>
        ))}
      </div>
</div> 
 <UniAds />
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

export default staffPage