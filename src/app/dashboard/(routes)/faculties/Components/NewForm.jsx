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
import { useState, useEffect} from "react"
import { useRouter } from "next/navigation"
import ReactQuill from "../../../../../Components/ReactQuill/ReactQuill"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../Components/ui/select"
import slugify from "../../../../../utils/slugify"
import Loader from "../../../../../Components/Loader/Loader"

const objectIdSchema =z.string().transform((value)=> (value === ''? undefined : value))
const formSchema = z.object({
  facultyname: z.string().min(5, {
    message: "Faculty Name must be at least 5 characters.",
  }),
  dean: objectIdSchema.optional(),
})

export default function NewForm({name, description, dean, id}) {
const [newdescription, setNewdescription] = useState(description? description : '')
const [loading, setLoading] = useState(false)
const router = useRouter()
const [error, setError] = useState('')
const [staff, setStaff] = useState([])

const [mounted, setMounted] = useState(false)
useEffect(() => {
setMounted(true)
}, [])

const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    facultyname: name? name : "",
    dean: dean? dean : ""
  },
})

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


const onSubmit = async(value) =>{
  setLoading(true)
  const response =await fetch('/api/faculty',{
    method: 'POST',
    body: JSON.stringify({...value, slug: slugify(value.facultyname),newdescription})
  })
  const data = await response.json()
  setLoading(false)
    if (data.success) {
      router.push('/dashboard/faculties')
      return router.refresh()
    }else{
      setError(data.message)
    }
}

const onUpdate = async(value) =>{
  setLoading(true)
  const response =await fetch('/api/faculty',{
    method: 'PATCH',
    body: JSON.stringify({...value, newdescription, id})
  })
  const data = await response.json()
  setLoading(false)
    if (data.success) {
      router.push('/dashboard/faculties')
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
          name="facultyname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faculty Name</FormLabel>
              <FormControl>
                <Input placeholder="Faculty of Engineering and Technology" defaultvalues={name} {...field} />
              </FormControl>
              <FormDescription>
                This is your faculty display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dean"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dean Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Dean for this Department" />
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
