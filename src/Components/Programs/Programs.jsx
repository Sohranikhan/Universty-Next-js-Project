
import { GraduationCap } from 'lucide-react'
import Link from 'next/link'
import connect from '../../utils/connect'
const getPrograms = async()=>{
  try {
    await connect()
    const res = await fetch('https://mcut.vercel.app/api/program',{
      cache:'force-cache'
    })
    const data = await res.json()
    return {
      success: true,
      data
    }
  } catch (error) {
    return{
      success: false,
      error: error.message
    }
  }
  
}

const Faculties = async() => {
  const data = await getPrograms()
  return (
    <div className="flex flex-col py-3 rounded md:flex-row items-start bg-green-100 justify-between w-full h-auto min-h-[30rem] mt-1"> 
      <div className="w-full p-4">
      <h2 className="text-accent ml-2 text-xl sm:text-2xl">Programs</h2>
      <br />
      <div className="w-full p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {data.success && data?.data?.programs?.map(program =>(
            <Link key={program?._id} href={`/faculties/${program?.department?.faculty?.slug}/${program?.department?.slug}/#${program?.slug}`} className="shadow-2xl shadow-card-foreground transition-transform mx-auto bg-background/90 flex flex-col hover:bg-green-300 gap-2 items-center justify-center w-full h-auto min-h-44 rounded">
            <GraduationCap size={30} color='hsl(25 100% 45%)' />
            <h4 className="p-2 text-center text-sm lg:text-lg">{program.name}</h4>
            </Link>
        ))}
        {!data.success && <p>{data.message}</p>}
      </div>
      </div>
    </div>
  )
}

export default Faculties