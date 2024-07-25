"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../ui/sheet"
  import { ScrollArea } from "../ui/scroll-area"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, MenuSquare } from "lucide-react"

const NavLeft = () => {
    const path = usePathname()
    const pathArray = path.split('/')
    const isActive = (pathname) => pathArray[pathArray.length - 1] === pathname

    return (
<Sheet>
  <SheetTrigger className="w-fit h-fit fixed left-3 top-12 md:top-24"><MenuSquare color="black" size={30} /></SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>MCUT</SheetTitle>
      <SheetDescription></SheetDescription>
      <ScrollArea className="h-screen w-full p-2 flex flex-col gap-y-1">
        <div className="h-auto w-auto p-2 flex flex-col items-center justify-start gap-y-1">
               <Link className={`w-full text-sm flex items-center justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('dashboard') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard`}>Dashboard</Link>
               
               <Link className={`w-full text-sm flex items-center justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('faculties') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/faculties`}>Faculties</Link>
              
               <Link className={`w-full text-sm flex items-center justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('departments') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/departments`}>Departments</Link>
              
               <Link className={`w-full text-sm flex items-center  justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('programs') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/programs`}><ArrowRight size={17} color="orangered" /> Programs</Link>
              
               <Link className={`w-full text-sm flex items-center  justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('staff') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/staff`}> <ArrowRight size={17} color="orangered" /> Staff</Link>
              
               <Link className={`w-full text-sm flex items-center justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('administration') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/administration`}>Administration</Link>
               
               <Link className={`w-full text-sm flex items-center  justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('adminstaff') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/administration/adminstaff`}><ArrowRight size={17} color="orangered" /> AdminStaff</Link>

               <Link className={`w-full text-sm flex items-center justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('aboutmcut') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/aboutmcut`}>About MCUT</Link>

               <Link className={`w-full text-sm flex items-center justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('admission') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/admission`}>Admission</Link>

               <Link className={`w-full text-sm flex items-center justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('meritlists') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/admission/meritlists`}>Merit Lists</Link>

               <Link className={`w-full text-sm flex items-center justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('campuslife') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/campuslife`}>Campus Life</Link>

               <Link className={`w-full text-sm flex items-center justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('downloads') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/downloads`}>Downloads</Link>

               <Link className={`w-full text-sm flex items-center justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('tender') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/tender`}>Tender</Link>

               <Link className={`w-full text-sm flex items-center justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('news') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/news`}>News</Link>

               <Link className={`w-full text-sm flex items-center  justify-start pr-3 py-1 hover:bg-accent rounded hover:text-background px-2 ${isActive('category') ? ' bg-accent text-background' : 'text-foreground'}`} href={`/dashboard/category`}><ArrowRight size={17} color="orangered" /> Category</Link>



        </div>
        </ScrollArea>
    </SheetHeader>
  </SheetContent>
</Sheet>
    )
}

export default NavLeft