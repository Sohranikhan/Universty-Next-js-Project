"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../../../../../Components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../../Components/ui/form"
import { Input } from "../../../../../../Components/ui/input"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../Components/ui/select"
import { useRouter } from "next/navigation"
import Loader from "../../../../../../Components/Loader/Loader"
import SocialTags from "./SocialTags"
import { ImagePlus, X } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"

const objectIdSchema =z.string().transform((value)=> (value === ''? undefined : value))
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().min(5, {
    message: "Please enter valid Email address",
  }),
  phone: z.string().min(10, {
    message: "Phone Number must be at least 10 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  office: objectIdSchema.optional(),
  image: objectIdSchema.optional()
})

export default function NewForm({ name, email, image, phone, office, socialMedia, position, id }) {

  const router = useRouter()
  const [error, setError] = useState('')
  const [tags, setTags] = useState(socialMedia ? JSON.parse(socialMedia) : [])
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [offices, setOffices] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    fetch('/api/administration')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setOffices(data.data)
        } else {
          setError(data.message)
        }
      })
      return ()=> null
  }, [])

  const handleRemoveTag = (i) => {
    setTags(tags.filter((tag, index) => index !== i))
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: image ? image : "",
      name: name ? name : "",
      email: email ? email : "",
      phone: phone ? phone : "",
      position: position ? position : "",
      office: office ? office : "",
    },
  })
  const onSubmit = async (value) => {

    setLoading(true)
    const response = await fetch('/api/administration/staff', {
      method: 'POST',
      body: JSON.stringify({ ...value, socialMedia:tags })
    })
    const data = await response.json()
    setLoading(false)
    if (data.success) {
      router.push('/dashboard/administration/adminstaff')
      return router.refresh()
    } else {
      setError(data.message)
    }
  }

  const onUpdate = async (value) => {
    setLoading(true)
    const response = await fetch('/api/administration/staff', {
      method: 'PATCH',
      body: JSON.stringify({ ...value, socialMedia:tags, id })
    })
    const data = await response.json()
    setLoading(false)
    if (data.success) {
      router.push('/dashboard/administration/adminstaff')
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
        {/* {console.log(field.value, image)} */}

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
                  This is display name.
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
                  <Input placeholder="Head" defaultvalues={email} {...field} />
                </FormControl>
                <FormDescription>
                  This is your Administration display phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Administration Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" type="phone" defaultvalues={phone} {...field} />
                </FormControl>
                <FormDescription>
                  This is your Administration display phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="office"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Office/Directory</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Office/Directory for this Staff member" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {offices && offices.map(off => (
                      <SelectItem key={`${off._id}`} value={`${off._id}`}>{off.title}</SelectItem>
                    ))
                    }
                  </SelectContent>
                </Select>
              </FormItem>)}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="position" defaultvalues={position} {...field} />
                </FormControl>
                <FormDescription>
                  This is your Administration display Email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <SocialTags tags={tags} setTags={setTags} />

          <ul className="flex items-center flex-wrap my-2">
            {tags.map((tag, i) => (
              <li key={i} className="relative py-2 px-3 w-fit rounded-full bg-primary/40 m-1 max-w-[250px] overflow-hidden">
                {tag.url}
                <Button type="button" className="absolute top-2 right-2 h-6 rounded-full px-1" onClick={() => handleRemoveTag(i)}><X size={14} /></Button>
              </li>
            ))}
          </ul>

        <Button type="submit" loading={loading}>{loading ? 'Submitting..' : 'Submit'}</Button>
      </form>
      <div className="error text-red-600 font-bold">
        <p>{error}</p>
      </div>
    </Form>
  )
}
