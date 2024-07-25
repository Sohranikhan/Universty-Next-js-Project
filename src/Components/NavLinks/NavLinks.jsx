
import Link from "next/link";
import { Building, Crown, DoorOpen, GraduationCap, Home, LogIn, UserCircle } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import SigninSignoutBtn from "../SigninSignoutBtn/SignInSignOutBtn";
import { aboutMcut, administration, admissionF, campusLifeF, faculties } from "../../utils/navSlugs";
const NavLinks = async() => {
  const newaboutMcut = await aboutMcut();
  const newadministration = await administration();
  const admission = await admissionF();
  const campusLife = await campusLifeF();
  const newfaculties = await faculties();

  return (
    <div className="flex items-center gap-x-1">
      <Link href='/' className="flex gap-1 items-center mx-2 justify-center hover:bg-background hover:text-foreground h-10 px-2 rounded">
        <Home size={18} /> Home
      </Link>

      <NavigationMenu>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent flex gap-1 w-fit">
              <UserCircle />
              About Mcut
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-max min-w-[400px] md:min-w-[500px] lg:min-w-[600px] flex flex-col p-2">
              {newaboutMcut?.success && newaboutMcut?.data?.map((item) => (
                <Link key={`${item._id}`} href={`/aboutmcut/${item.slug}`} className="h-10 hover:bg-accent flex gap-1 items-center rounded p-2 hover:text-background">
                  {item.title}
                </Link>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent flex gap-1 w-fit">
              <Crown />
              Administration
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-max min-w-[400px] md:min-w-[500px] lg:min-w-[600px] flex flex-col p-2">
              {newadministration?.success && newadministration?.data?.map((item) => (
                <Link key={`${item._id}`} href={`/administration/${item.slug}`} className="h-10 hover:bg-accent flex items-center rounded p-2 hover:text-background">
                  {item.title}
                </Link>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent flex gap-1 w-fit">
              <DoorOpen />
              Admission
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-max min-w-[400px] md:min-w-[500px] lg:min-w-[600px] flex flex-col p-2">
            <Link href={`/admission/#`} className="h-10 hover:bg-accent flex items-center rounded p-2 hover:text-background">
                  Apply Online
                </Link>
                <Link href={`/admission/meritlist`} className="h-10 hover:bg-accent flex items-center rounded p-2 hover:text-background">
                  Merit Lists
                </Link>
              {admission?.success && admission?.data?.map((item) => (
                <Link key={`${item._id}`} href={`/admission/${item.slug}`} className="h-10 hover:bg-accent flex items-center rounded p-2 hover:text-background">
                  {item.title}
                </Link>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent flex gap-1 w-fit">
              <GraduationCap />
              Faculties
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-max min-w-[400px] md:min-w-[500px] lg:min-w-[600px] flex flex-col p-2">
              {newfaculties?.success && newfaculties?.data?.map((item) => (
                <Link key={`${item._id}`} href={`/faculties/${item.slug}`} className="h-10 hover:bg-accent flex items-center rounded p-2 hover:text-background">
                  {item.name}
                </Link>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent flex gap-1 w-fit">
              <Building />
              Campus Life
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-max min-w-[400px] md:min-w-[500px] lg:min-w-[600px] flex flex-col p-2">
              {campusLife?.success && campusLife?.data?.map((item) => (
                <Link key={`${item._id}`} href={`/campuslife/${item.slug}`} className="h-10 hover:bg-accent flex items-center rounded p-2 hover:text-background">
                  {item.title}
                </Link>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

<SigninSignoutBtn />

    </div>
  );
};

export default NavLinks;
