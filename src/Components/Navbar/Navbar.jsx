import Image from "next/image"
import Link from "next/link"
import SideMenu from "../SideMenu/SideMenu"
import { Button } from "../ui/button"
import NavLinks from "../NavLinks/NavLinks"

const Navbar = () => {
  return (
    <div className="w-full flex flex-col fixed top-0 left-0 z-50">

        <div className="upperNav bg-background h-12 flex items-center justify-between">
<div className="logo">
  <Link href="/">
    <Image src="/logo/MCUT_LogoF.webp" priority width={200} height={56} className="w-auto max-w-fit h-12" alt="MCUT Logo" />
  </Link>
</div>

<div className="links hidden sm:flex h-full items-center justify-center gap-2 mx-2">
   <Link href='/applyonline'>
    <Button>Apply For Admission</Button>
   </Link>

<div className="hidden h-full innerLinks lg:flex items-center gap-2">
<Link href="/news" className="text-sm border-l-2 border-l-foreground h-fit min-h-8 hover:text-accent px-2 flex items-center">News</Link>
<Link href="/jobs" className="text-sm border-l-2 border-l-foreground h-fit min-h-8 hover:text-accent px-2 flex items-center">Career / Jobs</Link>
<Link href="/downloads" className="text-sm border-l-2 border-l-foreground h-fit min-h-8 hover:text-accent px-2 flex items-center">Download</Link>
<Link href="/#" className="text-sm border-l-2 border-l-foreground h-fit min-h-8 hover:text-accent px-2 flex items-center">Credentials Validations</Link>
</div>

<Link href='/studentportal'>
<Button>Student Portal</Button>
</Link>

<Link href='/facultyportal'>
<Button className="bg-foreground hover:bg-foreground/80">Faculty Portal</Button>
</Link>

</div>
{/* Side Menu */}
<div className="flex items-center sm:hidden">
<SideMenu />
</div>
        </div>
        
        <div className="lowerNav w-full h-12 hidden md:flex gap-2 bg-accent text-background">
<NavLinks />
        </div>
    </div>
  )
}

export default Navbar