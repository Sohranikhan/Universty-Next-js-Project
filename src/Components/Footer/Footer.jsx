import { Building, Crown, DoorOpen, Facebook, GraduationCap, Link2, MapPin, Phone, UserCircle, Wrench } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FaFacebookSquare, FaInstagramSquare, FaWhatsappSquare, FaYoutubeSquare } from "react-icons/fa"
import { administration, admissionF, campusLifeF, faculties } from "../../utils/navSlugs";

const Footer = async() => {
  const newadministration = await administration();
  const admission = await admissionF();
  const campusLife = await campusLifeF();
  const newfaculties = await faculties();

  return (
    <div className="bg-foreground/90 text-background/60 w-full h-auto min-h-96">
      <div className="resFooter w-full flex flex-col max-w-6xl mx-auto p-2">
        <div className="flex items-start gap-2 flex-col md:flex-row">
          <div className="w-full flex-[3]">

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-5 md:grid-cols-2 lg:grid-cols-3 my-4">
             
            <div className="item flex flex-col w-full">
                <div className="flex items-center gap-1 mt-3 text-background/85  text-base font-bold px-2">
                  <Link2 size={18} />
                  <p>Important Links</p>
                </div>

                <Link href="/news" className="w-full h-fit flex gap-1 items-center pr-2 pl-3 my-1 justify-start">News</Link>
                <Link href="/jobs" className="w-full h-fit flex gap-1 items-center pr-2 pl-3 my-1 justify-start">Career / Jobs</Link>
                <Link href="/download" className="w-full h-fit flex gap-1 items-center pr-2 pl-3 my-1 justify-start">Download</Link>
                <Link href="/#" className="w-full h-fit flex gap-1 items-center pr-2 pl-3 my-1 justify-start">Credentials Validations</Link>

                <div className="item flex flex-col w-full">
                  <div className="flex items-center gap-1 mt-3 text-background/85  text-base font-bold px-2">
                    <DoorOpen size={18} />
                    <p>Admission</p>
                  </div>
                  {admission?.success && admission?.data?.map((item) => (
                    <Link key={`${item._id}`} href={item.slug} className="w-full h-fit flex gap-1 items-center pr-2 pl-3 my-1 justify-start">{item.title}</Link>
                  ))}
                </div>
              </div>

              <div className="item flex flex-col w-full">
                <div className="flex items-center gap-1 mt-3 text-background/85  text-base font-bold px-2">
                  <Crown size={18} />
                  <p>Administration</p>
                </div>
                {newadministration?.success && newadministration?.data?.map((item) => (
                  <Link key={`${item._id}`} href={item.slug} className="w-full h-fit flex gap-1 items-center pr-2 pl-3 my-1 justify-start">{item.title}</Link>
                ))}
              </div>

              <div className="item flex flex-col w-full">
                <div className="flex items-center gap-1 mt-3 text-background/85  text-base font-bold px-2">
                  <GraduationCap size={18} />
                  <p>Faculties</p>
                </div>
                {newfaculties?.success && newfaculties?.data?.map((item) => (
                  <Link key={`${item._id}`} href={item.slug} className="w-full h-fit flex gap-1 items-center pr-2 pl-3 my-1 justify-start">{item.name}</Link>
                ))}


<div className="item flex flex-col w-full">
                  <div className="flex items-center gap-1 mt-3 text-background/85  text-base font-bold px-2">
                    <Building size={18} />
                    <p>Campus Life</p>
                  </div>
                  {campusLife?.success && campusLife?.data?.map((item) => (
                    <Link key={`${item._id}`} href={item.slug} className="w-full h-fit flex gap-1 items-center pr-2 pl-3 my-1 justify-start">{item.title}</Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="flex-1 logo w-full flex flex-col gap-3 my-5">
            <Image src="/logo/Logo.webp" width={40} height={40} alt="MCUT Logo" className="w-10 h-10" />
            <div className="flex flex-col gap-2 text-sm">
              <h3 className="text-lg text-start text-background/80">Contact Us</h3>
            </div>
            <div className="flex">
              <div className="w-5 h-5 mr-2">

                <MapPin size={20} />
              </div>
              <p className="text-sm">
                12 KM, Sakhi Sarwar Road, D.G.Khan, Punjab Pakistan</p>
            </div>

            <div className="flex text-sm">
              <div className="w-5 h-5 mr-2">

                <Phone size={18} />
              </div>
              <p>
                0333-4785419</p>
            </div>
            <div className="flex items-center justify-between">
              <Link href="/#">
              <FaFacebookSquare size={30} />
              </Link>
              <Link href="/#">
              <FaWhatsappSquare size={30} />
              </Link>
              <Link href="/#">
              <FaInstagramSquare size={30} />
              </Link>
              <Link href="/#">
              <FaYoutubeSquare size={30} />
              </Link>
            </div>
          </div>

        </div>
        <hr className="border-gray-400" />
        <p className="my-2 text-center text-sm">@ MCUT 2024 | All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer