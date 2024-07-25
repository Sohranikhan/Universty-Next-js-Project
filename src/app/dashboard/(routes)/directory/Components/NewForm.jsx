"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ReactQuill from "../../../../../Components/ReactQuill/ReactQuill"
import slugify from "../../../../../utils/slugify"
import Loader from "../../../../../Components/Loader/Loader"
import SocialTags from "./SocialTags"
import { X } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Office Title must be at least 5 characters.",
  }),
  head: z.string().min(3, {
    message: "Office Head Name must be at least 10 characters.",
  }),
  phone: z.string().min(10, {
    message: "Office Phone must be at least 10 characters.",
  }),
  email: z.string().min(8, {
    message: "Office Email must be at least 10 characters.",
  }),
})

export default function NewForm({title, head, email, socialMedia, phone, description, id}) {
  const [newdescription, setNewdescription] = useState(description? description : '')
  const router = useRouter()
  const [error, setError] = useState('')
  const [tags, setTags] = useState(socialMedia? JSON.parse(socialMedia):[])
  const [mounted, setMounted] = useState(false)
useEffect(() => {
setMounted(true)
}, [])

const handleRemoveTag = (i) => {
  setTags(tags.filter((tag, index) => index !== i))
}
const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    title: title? title : "",
    head: head? head : "",
    email: email? email : "",
    phone: phone? phone : "",
  },
})


const onSubmit = async(value) =>{
  const response =await fetch('/api/office',{
    method: 'POST',
    body: JSON.stringify({...value, slug: slugify(value.title), tags, newdescription})
  })
  const data = await response.json()
    if (data.success) {
      router.push('/dashboard/office')
      return router.refresh()
    }else{
      setError(data.message)
    }
}

const onUpdate = async(value) =>{
  const response =await fetch('/api/office',{
    method: 'PATCH',
    body: JSON.stringify({...value, tags, newdescription, id})
  })
  const data = await response.json()
    if (data.success) {
      router.push('/dashboard/office')
      return router.refresh()
    }else{
      setError(data.message)
    }
}

if (!mounted) {
  return <Loader />
}
return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(id === 'new'? onSubmit : onUpdate)} className="space-y-3">
      <div className="max-w-[450px]">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office Title</FormLabel>
              <FormControl>
                <Input placeholder="Registrar Office" defaultvalues={title} {...field} />
              </FormControl>
              <FormDescription>
                This is your Office display title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="head"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office Head</FormLabel>
              <FormControl>
                <Input placeholder="Head" defaultvalues={head} {...field} />
              </FormControl>
              <FormDescription>
                This is your Office display phone.
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
              <FormLabel>Office Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" defaultvalues={email} {...field} />
              </FormControl>
              <FormDescription>
                This is your Office display Email.
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
              <FormLabel>Office Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" type="phone" defaultvalues={phone} {...field} />
              </FormControl>
              <FormDescription>
                This is your Office display phone.
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

</div>

<ReactQuill econtent={newdescription} setContent={setNewdescription} />

<Button type="submit">Submit</Button>
      </form>
      <div className="error text-red-600 font-bold">
        <p>{error}</p>
      </div>
    </Form>
  )
}
