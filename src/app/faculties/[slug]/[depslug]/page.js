import connect from "../../../../utils/connect"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../../Components/ui/table"
import Link from "next/link"
import UniAds from "../../../../Components/UniAds/UniAds"
import BtnLink from "../../../../Components/BtnLink/BtnLink"
import { UserCircle2Icon } from "lucide-react"
import FacltyHero from "../../../../Components/FacltyHero/FacltyHero"
import Marq from "../../../../Components/Marque/Marque"

const getDepartmentById = async(depslug)=>{
    await connect()
      const res = await fetch(`http://localhost:3000/api/department/${depslug}`,{
        next:{
            revalidate: 60
        }
      })
      const data = await res.json()
      return data
    }
const page = async(searchParams) => {
const {params} = searchParams
const {depslug} = params

const data = await getDepartmentById(depslug)
if (data.success) {
  return(
    <div className="text-foreground flex flex-col gap-x-6 my-5 px-2 md:px-0">
          <FacltyHero />
          <Marq />
    <div className="flex md:flex-row flex-col mt-6">
    <div className="flex-[4] md:px-4">

     <h1 className="mb-3 text-accent">{data?.sepDepartment?.name}</h1>
       <Link href={`/staff/${data?.sepDepartment?.hod?.slug}`} className="my-2"><p><b>HOD:</b> {data?.sepDepartment?.hod?.name}</p></Link>
       <div className="w-full mt-3 ">
       <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            <UserCircle2Icon size={18} />
                        </TableHead>
                        <TableHead>Faculty Name</TableHead>
                        <TableHead>Position</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data?.sepDepartment?.staff?.map((stf, index) => (
                        <TableRow key={`${stf._id}`}>
                            <TableCell className="font-medium"><UserCircle2Icon size={18} /></TableCell>
                            <TableCell><Link href={`/staff/${stf?.slug}`}>{stf?.name}</Link></TableCell>
                            <TableCell><Link href={`/staff/${stf?.slug}`}>{stf?.position}</Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Totall Faculties</TableCell>
                        <TableCell className="text-center">{data && data?.sepDepartment?.staff?.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

       </div>
       <div className="my-4 ">
        <h2 className="my-3">Introduction</h2>
        <div className="htmldiv" dangerouslySetInnerHTML={{ __html: data?.sepDepartment?.description }} />
       </div>
       <div className=" mt-6 w-full items-start">
         <h2>Programs Offered</h2>
         <p>The following programs being offerd</p>
         <div className="w-full">
{data?.sepDepartment?.programs?.map(pro=>(
    <div key={`${pro._id}`} className="w-full h-auto my-3">
    <h3 className="bg-secondary/25 p-3 font-bold my-3 mt-4" id={pro.slug}>{pro.name}</h3>
<div className="w-full text-wrap htmldiv" dangerouslySetInnerHTML={{ __html: pro?.description }} />
    </div>
))}
</div>
</div>
</div> 
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

export default page