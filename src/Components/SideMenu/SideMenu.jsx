import { Building, Crown, DoorOpen, Home, LogIn, Menu, UserCircle, GraduationCap } from "lucide-react"
import Image from "next/image"
// import { useMediaQuery } from "../../hooks/use-media-query"
import Link from "next/link"
import { aboutMcut, administration, admissionF, campusLifeF, faculties } from "../../utils/navSlugs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../../Components/ui/sheet"
  import { ScrollArea } from "../../Components/ui/scroll-area"
import SigninSignoutBtn from "Components/SigninSignoutBtn/SignInSignOutBtn"

const SideMenu = async() => {
    const newaboutMcut = await aboutMcut();
    const newadministration = await administration();
    const admission = await admissionF();
    const campusLife = await campusLifeF();
    const newfaculties = await faculties();
    // const isDesktop = useMediaQuery("(min-width: 640px)")
    // return  isDesktop? null :
    return(
        <Sheet>
    <SheetTrigger className="w-fit h-fit sm:hidden">    
        <div className="mx-2 px-3 py-2 bg-accent rounded ">
    <Menu size={18}  color="white"/>
    </div>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2"><Image src="/logo/Logo.webp" width={56} height={56} alt="MCUT Logo" className="w-14 h-14" />
        MCUT
        </SheetTitle>
        <SheetDescription></SheetDescription>
        <ScrollArea className="h-screen w-full p-2 flex flex-col gap-y-1">
<div className="h-auto overflow-y-scroll w-auto p-2 flex flex-col items-center justify-start gap-y-1">
                
<Link href='/' className="w-full h-10 flex gap-1 items-center hover:bg-accent hover:text-background px-2 justify-start"><Home  size={18} /> Home</Link>

<Accordion type="single" collapsible className=" w-full my-1">
        <AccordionItem value="item-1">
<AccordionTrigger className="bg-transparent hover:bg-accent hover:text-background flex items-center gap-1 w-full">
    <div className="flex gap-1 text-sm px-2">
<UserCircle size={18} />
About MCUT
    </div>
</AccordionTrigger>
<AccordionContent>
{newaboutMcut?.success && newaboutMcut?.data?.map((item) => (
    <Link key={`${item._id}`} href={item?.slug}className="w-full h-full flex gap-1 hover:bg-accent hover:text-background text-start min-h-10 items-center pr-2 pl-3 my-2 justify-start">{item.title}</Link>
))}
</AccordionContent>
    </AccordionItem>
    </Accordion>


    <Accordion type="single" collapsible className=" w-full my-1">
        <AccordionItem value="item-2">
<AccordionTrigger className="bg-transparent hover:bg-accent hover:text-background flex items-center gap-1 w-full">
    <div className="flex gap-1 text-sm px-2">
<Crown size={18}/>
Administration
    </div>
</AccordionTrigger>
<AccordionContent>
{newadministration?.success && newadministration?.data?.map((item) => (
        <Link key={`${item._id}`} href={item?.slug}className="w-full h-full flex gap-1 hover:bg-accent hover:text-background text-start min-h-10 items-center pr-2 pl-3 my-2 justify-start">{item.title}</Link>
    ))}
</AccordionContent>
    </AccordionItem>
    </Accordion>

    <Accordion type="single" collapsible className=" w-full my-1">
        <AccordionItem value="item-3">
<AccordionTrigger className="bg-transparent hover:bg-accent hover:text-background flex items-center gap-1 w-full">
    <div className="flex gap-1 text-sm px-2">
<DoorOpen size={18}/>
Admission
    </div>
</AccordionTrigger>
<AccordionContent>
{admission?.success && admission?.data?.map((item) => (
    <Link key={`${item._id}`} href={item?.slug}className="w-full h-full flex gap-1 hover:bg-accent hover:text-background text-start min-h-10 items-center pr-2 pl-3 my-2 justify-start">{item.title}</Link>
))}
</AccordionContent>
    </AccordionItem>
    </Accordion>

    <Accordion type="single" collapsible className=" w-full my-1">
        <AccordionItem value="item-4">
<AccordionTrigger className="bg-transparent hover:bg-accent hover:text-background flex items-center gap-1 w-full">
    <div className="flex gap-1 text-sm px-2">
<GraduationCap size={18}/>
Faculties
    </div>
</AccordionTrigger>
<AccordionContent>
{newfaculties?.success && newfaculties?.data?.map((item) => (
        <Link key={`${item._id}`} href={item?.slug}className="w-full h-full flex gap-1 hover:bg-accent hover:text-background text-start min-h-10 items-center pr-2 pl-3 my-2 justify-start">{item.title}</Link>
    ))}
</AccordionContent>
    </AccordionItem>
    </Accordion>

    <Accordion type="single" collapsible className=" w-full my-1">
        <AccordionItem value="item-5">
<AccordionTrigger className="bg-transparent hover:bg-accent hover:text-background flex items-center gap-1 w-full">
    <div className="flex gap-1 text-sm px-2">
<Building size={18}/>
Campus Life
    </div>
</AccordionTrigger>
<AccordionContent>
{campusLife?.success && campusLife?.data?.map((item) => (
        <Link key={`${item._id}`} href={item?.slug}className="w-full h-full flex gap-1 hover:bg-accent hover:text-background text-start min-h-10 items-center pr-2 pl-3 my-2 justify-start">{item.title}</Link>
    ))}
</AccordionContent>
    </AccordionItem>
    </Accordion>

<SigninSignoutBtn className={'flex w-full gap-1 items-center my-1 bg-primary'} />

    <Link href='/#' className="h-auto min-h-8 flex w-full gap-1 items-center my-0 justify-center bg-accent hover:bg-accent/80 px-3">
Student Portal
</Link>

<Link href='/#' className="h-auto min-h-8 flex w-full gap-1 items-center my-1 justify-center bg-primary hover:bg-primary/80 px-3">
Faculty Portal
</Link>

<Link href="/news" className="text-sm w-full h-full min-h-9 hover:text-background hover:bg-accent px-2 flex items-center">News</Link>
<Link href="/jobs" className="text-sm w-full h-full min-h-9 hover:text-background hover:bg-accent px-2 flex items-center">Career / Jobs</Link>
<Link href="/download" className="text-sm w-full h-full min-h-9 hover:text-background hover:bg-accent px-2 flex items-center">Download</Link>
<Link href="/#" className="text-sm w-full h-full min-h-9 hover:text-background hover:bg-accent px-2 flex items-center">Credentials Validations</Link>


</div>
</ScrollArea>
    </SheetHeader>
  </SheetContent>
</Sheet>
)
}

export default SideMenu