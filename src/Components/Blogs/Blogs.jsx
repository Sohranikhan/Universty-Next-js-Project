import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card"
import Link from "next/link"
import Image from "next/image"

const Blogs = () => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">

        <Card className="w-[95%] mx-auto p-1 md:w-auto max-w-[350px] shadow-xl">
      <CardHeader>
        <CardTitle><Image src="/Images/n.jpg" width={350} height={250} alt="Blog Image" className="w-full max-w-350 h-auto max-h-[217px] object-cover" /></CardTitle>
        <CardDescription className="font-bold text-xl">Faculties & Departments</CardDescription>
      </CardHeader>
      <CardContent>
       <p>Mir Chakir Khan Universtiy, D.G.Khan has several Faculties & Departments and One Research Center. The …</p>
      </CardContent>
      <CardFooter className="flex">
        <Link  href="#" className="flex w-fit bg-primary rounded h-11 px-4 items-center text-background">Read More</Link>
      </CardFooter>
    </Card>

    <Card className="w-[95%] mx-auto p-1 md:w-auto max-w-[350px] shadow-xl">
      <CardHeader>
        <CardTitle><Image src="/Images/Scholarship-2-pxhrik7cuu3f9ofpnf4hhtx3cdu657o9fn7jc5v3nk.jpeg" width={350} height={250} alt="Blog Image" className="w-full max-w-250 h-auto max-h-[217px] object-cover" /></CardTitle>
        <CardDescription className="font-bold text-xl">Scholarships</CardDescription>
      </CardHeader>
      <CardContent>
       <p>Explore the local and international scholarships on our Scholarships Portal. These include Faculty/Staff Scholarships and Student Scholarships…</p>
      </CardContent>
      <CardFooter className="flex">
        <Link  href="#" className="flex w-fit bg-primary rounded h-11 px-4 items-center text-background">Read More</Link>
      </CardFooter>
    </Card>

    <Card className="w-[95%] mx-auto p-1 md:w-auto max-w-[350px] shadow-xl">
      <CardHeader>
        <CardTitle><Image src="/Images/research.jpg" width={350} height={250} alt="Blog Image" className="w-full max-w-250 h-auto max-h-[217px] object-cover" /></CardTitle>
        <CardDescription className="font-bold text-xl">Research</CardDescription>
      </CardHeader>
      <CardContent>
       <p>Our Faculty and Staff members uploaded their research work on our Research Portal. Campus research output is also available on this portal…</p>
      </CardContent>
      <CardFooter className="flex">
        <Link  href="#" className="flex w-fit bg-primary rounded h-11 px-4 items-center text-background">Read More</Link>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Blogs