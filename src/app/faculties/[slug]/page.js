import connect from "../../../utils/connect"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../Components/ui/table"
import Link from "next/link"
import UniAds from "../../../Components/UniAds/UniAds"
import BtnLink from "../../../Components/BtnLink/BtnLink"
import Marq from "../../../Components/Marque/Marque"
import FacltyHero from "../../../Components/FacltyHero/FacltyHero"

const getFacultyById = async(slug)=>{
    await connect()
      const res = await fetch(`https://mcut.vercel.app/api/faculty/${slug}`,{
        cache: 'no-cache'
      })
      const data = await res.json()
      return data
    }
const page = async(searchParams) => {
const {params} = searchParams
const {slug} = params
const data = await getFacultyById(slug)

if (data.success) {
  return(
    <div className="text-foreground flex flex-col mt-5 px-2">
      <FacltyHero title={"Departments"} image={'/Images/MCUT--.webp'}/>
      <Marq />
      <div className="flex flex-col sm:flex-row w-full mt-4">
       <div className="flex-[4]">
       <h1 className="mb-3 text-accent">{data?.sepfaculty?.name}</h1>
       <Link href={`/staff/${data?.sepfaculty?.dean?.slug}`}><p><b>Dean:</b> {data?.sepfaculty?.dean?.name}</p></Link>
       <div className="my-4">
        <h2 className="text-2xl">Dean Message</h2>
        <div className="h-auto htmldiv" dangerouslySetInnerHTML={{ __html: data?.sepfaculty?.description }} />
       </div>
       <div className="flex gap-4 mt-6 w-full h-auto items-start">
    <Table>
                <TableCaption>
                    {data?.sepfaculty?.name}
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            #
                        </TableHead>
                        <TableHead>Department Name</TableHead>
                        <TableHead>Department HOD Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data?.sepfaculty?.departments?.map((dep, index) => (
                        <TableRow key={dep._id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell><Link href={`/faculties/${slug}/${dep.slug}`}>{dep?.name}</Link></TableCell>
                            <TableCell><Link href={`/staff/${dep?.hod?.slug}`}>{dep?.hod?.name}</Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Totall Faculties</TableCell>
                        <TableCell className="text-center">{data && data?.sepfaculty?.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

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