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
import ReactQuillComponent from "../../../../../Components/ReactQuill/ReactQuill"
import slugify from "../../../../../utils/slugify"
import Loader from "../../../../../Components/Loader/Loader"
// import Image_Upload from "../../../../../Components/Image_upload/Image_Upload"


const formSchema = z.object({
  title: z.string().min(5, {
    message: "Office Title must be at least 5 characters.",
  }),
})

export default function NewForm({ title, description, id }) {
  const router = useRouter()
  const [newdescription, setNewdescription] = useState(description ? description : '')
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ? title : ""
    },
  })


  const onSubmit = async (value) => {
    setLoading(true)
    const response = await fetch('/api/aboutmcut', {
      method: 'POST',
      body: JSON.stringify({ ...value, slug: slugify(value.title), newdescription })
    })
    const data = await response.json()
    if (data.success) {
      router.push('/dashboard/aboutmcut')
      setLoading(false)
      return router.refresh()
    } else {
      setError(data.message)
    }
  }

  const onUpdate = async (value) => {
    setLoading(true)
    const response = await fetch('/api/aboutmcut', {
      method: 'PATCH',
      body: JSON.stringify({ ...value, newdescription, id })
    })
    const data = await response.json()
    setLoading(false)
    if (data.success) {
      router.push('/dashboard/aboutmcut')
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
        <div className="max-w-[450px]">

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Administration Title</FormLabel>
                <FormControl>
                  <Input placeholder="Registrar Office" defaultvalues={title} {...field} />
                </FormControl>
                <FormDescription>
                  This is your Administration display title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        <ReactQuillComponent econtent={newdescription} setContent={setNewdescription} />

        <Button type="submit" loading={loading}>{loading?'Submitting..': 'Submit'}</Button>
      </form>
      <div className="error text-red-600 font-bold">
        <p>{error}</p>
      </div>
    </Form>
  )
}
