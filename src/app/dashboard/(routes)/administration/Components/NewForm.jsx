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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../Components/ui/select"

const objectIdSchema =z.string().transform((value)=> (value === ''? undefined : value))
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Office Title must be at least 5 characters.",
  }),
  head: objectIdSchema.optional()
  })

export default function NewForm({ title, head, description, id }) {
  const [newdescription, setNewdescription] = useState(description ? description : '')
  const router = useRouter()
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [staff, setStaff] = useState([])
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    fetch('/api/administration/staff')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setStaff(data.data)
        } else {
          setError(data.message)
        }
      })
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ? title : "",
      head: head ? head : "",
    },
  })

  const onSubmit = async (value) => {
    setLoading(true)
    const response = await fetch('/api/administration', {
      method: 'POST',
      body: JSON.stringify({ ...value, slug: slugify(value.title), description:newdescription })
    })
    const data = await response.json()
    setLoading(false)
    if (data.success) {
      router.push('/dashboard/administration')
      return router.refresh()
    } else {
      setError(data.message)
    }
  }

  const onUpdate = async (value) => {
    setLoading(true)
    const response = await fetch('/api/administration', {
      method: 'PATCH',
      body: JSON.stringify({ ...value, description:newdescription, id })
    })
    const data = await response.json()
    setLoading(false)
    if (data.success) {
      router.push('/dashboard/administration')
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
          <FormField
            control={form.control}
            name="head"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Office/Directory Head</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Office/Directory Head" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {staff && staff.map(stf => (
                      <SelectItem key={`${stf._id}`} value={`${stf._id}`}>{stf.name}</SelectItem>
                    ))
                    }
                  </SelectContent>
                </Select>
              </FormItem>)}
          />

        </div>

        <ReactQuill econtent={newdescription} setContent={setNewdescription} />

        <Button type="submit" loading={loading}>{loading?'Submitting..': 'Submit'}</Button>
      </form>
      <div className="error text-red-600 font-bold">
        <p>{error}</p>
      </div>
    </Form>
  )
}
