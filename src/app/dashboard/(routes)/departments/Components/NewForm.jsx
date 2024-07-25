"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import 'react-quill/dist/quill.bubble.css'
import { Input } from "../../../../../Components/ui/input"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../../../Components/ui/button"
import ReactQuill from "../../../../../Components/ReactQuill/ReactQuill"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../Components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../../Components/ui/select"
import slugify from "../../../../../utils/slugify"
import Loader from "../../../../../Components/Loader/Loader"

const objectIdSchema =z.string().transform((value)=> (value === ''? undefined : value))

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Department Name must be at least 4 characters.",
  }),
  hod: objectIdSchema.optional(),
  faculty: z.string().min(20, {
    message: "Please choose Faculty for Department.",
  })
})

export default function NewForm({name, hod, description, id, faculty}) {
const [newdescription, setNewdescription] = useState(description? description : '')
const router = useRouter()
const [error, setError] = useState('')
const [faculties, setFaculties] = useState([])
const [staff, setStaff] = useState([])
const [loading, setLoading] = useState(false)

const [mounted, setMounted] = useState(false)
useEffect(() => {
setMounted(true)
}, [])

useEffect(()=>{
  fetch('/api/faculty')
 .then(response => response.json())
 .then(data => {
  if (data.success) {
    setFaculties(data.data)
  }else{
    setError(data.message)
  }
 })
},[])

useEffect(()=>{
  fetch('/api/staff')
 .then(response => response.json())
 .then(data => {
  if (data.success) {
    setStaff(data.staff)
  }else{
    setError(data.message)
  }
 })
},[])

const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: name? name : "",
    hod: hod? hod : "",
    faculty: faculty? faculty : "",
  },
})


const onSubmit = async(value) =>{
  setLoading(true)
  const response =await fetch('/api/department',{
    method: 'POST',
    body: JSON.stringify({...value, slug: slugify(value.name), description:newdescription})
  })
  const data = await response.json()
  setLoading(false)
    if (data.success) {
      router.push('/dashboard/departments')
      return router.refresh()
    }else{
      setError(data.message)
    }
}

const onUpdate = async(value) =>{
  setLoading(true)
  const response =await fetch('/api/department',{
    method: 'PATCH',
    body: JSON.stringify({...value, description:newdescription, id})
  })
  const data = await response.json()
  setLoading(false)
    if (data.success) {
      router.push('/dashboard/departments')
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department Name</FormLabel>
              <FormControl>
                <Input placeholder="Department of Computing and IT" defaultvalues={name} {...field} />
              </FormControl>
              <FormDescription>
                This is your Department display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HOD Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select HOD for this Department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {staff && staff.map(stf=>(
                    <SelectItem key={`${stf._id}`} value={`${stf._id}`}>{stf.name}</SelectItem>
                  ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
          control={form.control}
          name="faculty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faculty</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Faculty for this Department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {faculties && faculties.map(fec=>(
                    <SelectItem key={`${fec._id}`} value={`${fec._id}`}>{fec.name}</SelectItem>
                  ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
</FormItem> )}
/>
</div>
<ReactQuill econtent={newdescription} setContent={setNewdescription} />


<Button type="submit" loading={loading}>{loading?'Submitting..': 'Submit'}</Button>

</form>
      <div className="error text-red-600 font-bold mt-2">
        <p>{error}</p>
      </div>
    </Form>
  )
}
