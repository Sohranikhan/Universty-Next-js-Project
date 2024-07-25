"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ImagePlus, X } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "../../../../../Components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../Components/ui/form"
import { Input } from "../../../../../Components/ui/input"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../Components/ui/select"
import Loader from "../../../../../Components/Loader/Loader"
import slugify from "../../../../../utils/slugify"
import PaperComponent from "./PaperComponent"
import SocialTags from "./SocialTags"
import Image_Upload from "../../../../../Components/Image_upload/Image_Upload"
import { CldUploadWidget } from "next-cloudinary"


const objectIdSchema =z.string().transform((value)=> (value === ''? undefined : value))
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().min(5, {
    message: "Enter valid emil",
  }),
  position: z.string().min(3, {
    message: "Position must be at least 3 characters.",
  }),
  image: objectIdSchema.optional(),
  department: objectIdSchema.optional()
})

export default function NewForm({ name, email, department, researchPapers, socialMedia, position, image, id }) {

  const router = useRouter()
  const [error, setError] = useState('')
  const [newdepartment, setnewDepartment] = useState(department?department:[])
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState(socialMedia ? JSON.parse(socialMedia) : [])
  const [paperArr, setPaperArr] = useState(researchPapers ? JSON.parse(researchPapers) : [])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRemovePaper = (i) => {
    setPaperArr(paperArr.filter((paper, index) => index !== i))
  }

  const handleRemoveTag = (i) => {
    setTags(tags.filter((tag, index) => index !== i))
  }


  useEffect(() => {
    fetch('http://localhost:3000/api/department',{
      cache: 'no-store'
    })
      .then(response => response.json())
      .then(data => {
        if (data?.success) {
          setnewDepartment(data?.departments)
        } else {
          setError(data.message)
        }
      })
  }, [])

  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name ? name : "",
      email: email ? email : "",
      position: position ? position : "",
      department: department ? department : "",
      image: image? image : ""
    },
  })


  const onSubmit = async (value) => {
setLoading(true)
    const response = await fetch('http://localhost:3000/api/staff', {
      method: 'POST',
      body: JSON.stringify({ ...value, socialMedia: tags, slug: slugify(value.name), researchPapers: paperArr })
    })
    const data = await response.json()
    setLoading(false)
    if (data.success) {
      router.push('/dashboard/staff')
      return router.refresh()
    } else {
      setError(data.message)
    }
  }

  const onUpdate = async (value) => {
    setLoading(true)
    const response = await fetch('/api/staff', {
      method: 'PATCH',
      body: JSON.stringify({ ...value, socialMedia: tags, researchPapers: paperArr, id })
    })
    const data = await response.json()
    setLoading(false)
    if (data.success) {
      router.push('/dashboard/staff')
      return router.refresh()
    } else {
      setError(data.message)
    }
  }

  if (!mounted) {
    return <Loader />
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(id === 'new' ? onSubmit : onUpdate)} className="space-y-3">

      <FormField
        name="image"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
            <CldUploadWidget
          onSuccess={(result) => field.onChange(result?.info?.secure_url)}
          uploadPreset='staff-uploads'
          width="500" // Transform the image: auto-crop to square aspect_ratio
          height="500"
          crop={{
            type: 'auto',
            source: true
          }}
          {...field}
        >
          {({ open }) => (
            <Button type="button" className="flex gap-2 items-center bg-accent" onClick={open}>
              <ImagePlus /> Upload Image
            </Button>
          )}
        </CldUploadWidget>
            </FormControl>
            <FormDescription>
              This is your Image.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="M.Ali" defaultvalues={name} {...field} />
              </FormControl>
              <FormDescription>
                This is your display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m.ali@gmail.com" type='email' defaultvalues={email} {...field} />
              </FormControl>
              <FormDescription>
                This is your email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Teaching" defaultvalues={position} {...field} />
              </FormControl>
              <FormDescription>
                This is your position in department.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <PaperComponent paperArr={paperArr} setPaperArr={setPaperArr} />
        <ul className="flex items-center flex-wrap my-2">
          {paperArr.map((paper, i) => (
            <li key={i} className="flex items-center justify-between gap-2 py-2 px-3 w-fit rounded-full bg-primary/40 m-1">
              {paper.title}
              <Button type="button" className="h-6 rounded-full px-1" onClick={() => handleRemovePaper(i)}><X size={14} /></Button>
            </li>
          ))}
        </ul>
        <SocialTags tags={tags} setTags={setTags} />
        <ul className="flex items-center flex-wrap my-2">
          {tags.map((tag, i) => (
            <li key={i} className="flex items-center justify-between gap-2 py-2 px-3 w-fit rounded-full bg-primary/40 m-1">
              {tag.url}
              <Button type="button" className="h-6 rounded-full px-1" onClick={() => handleRemoveTag(i)}><X size={14} /></Button>
            </li>
          ))}
        </ul>
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Department for this Staff member" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {newdepartment && newdepartment.map(dep => (
                    <SelectItem key={`${dep._id}`} value={`${dep._id}`}>{dep.name}</SelectItem>
                  ))
                  }
                </SelectContent>
              </Select>
            </FormItem>)}
        />
        <Button type="submit" loading={loading}>{loading?'Submitting..': 'Submit'}</Button>
        </form>
      <div className="error text-red-600 font-bold">
        <p>{error}</p>
      </div>
    </Form>
  )
}
