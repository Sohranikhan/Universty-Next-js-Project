
import Marq from '../../Components/Marque/Marque'
import FacltyHero from '../../Components/FacltyHero/FacltyHero'
import FacultiesTable from "../../Components/FacultyData/FacultiesTable"
import connect from "../../utils/connect"
import BtnLink from "../../Components/BtnLink/BtnLink"
import Loader from "../../Components/Loader/Loader"
import UniAds from "../../Components/UniAds/UniAds"
import { Button } from "../../Components/ui/button"
import { Suspense } from 'react'

const getFacultyCache = async()=>{
  await connect()
  try {
    const res = await fetch('https://mcut.vercel.app/api/faculty',{
      next:{
        revalidate: 1
      }
    })
    const data = await res.json()
    return {
      success: true,
      faculties: data
    }
    
  } catch (error) {
    return{
      success: false,
      message: "Error fetching faculties"
    }
  }
  }

const facultyPage = async() => {
  const data = await getFacultyCache()

  return (
    <div className="w-full h-auto">
      <FacltyHero title="Faculties" />
      <Marq />
      {data?.success ?
      <div className="text-foreground mt-5 px-2">
         <h1 className="mb-3 text-accent">Faculties in Mir Chakar Khan Rind Universty of Technology</h1>
         <div className="flex flex-col sm:flex-row gap-4 w-full h-full items-start">
          <div className="flex-[4] px-2">
            <Suspense fallback={<Loader />}>
         <FacultiesTable data={data?.faculties?.faculties} />
            </Suspense>
          </div>
   <UniAds />
         </div>
      </div>
:
      <div className=" w-full h-screen flex flex-col items-center justify-center text-foreground">
<h2>Sorry! We are trying to fix this error</h2>
<p className="text-red-600">{data.message}</p>
<h3>Back To Home</h3>
<BtnLink href='/' text="Home" />
      </div>
}
</div>
  )
}

export default facultyPage