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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../Components/ui/select"
import ReactQuill from "../../../../../Components/ReactQuill/ReactQuill"
import slugify from "../../../../../utils/slugify"
import Loader from "../../../../../Components/Loader/Loader"

const formSchema = z.object({
  programname: z.string().min(5, {
    message: "Program Name must be at least 5 characters.",
  }),
  department: z.string()
})

export default function NewForm({name, department, description, id}) {
  const [newdescription, setNewdescription] = useState(description? description : '')
  const router = useRouter()
  const [error, setError] = useState('')
  const [newdepartment, setnewDepartment] = useState([])
const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
useEffect(() => {
setMounted(true)
}, [])

useEffect(()=>{
  fetch('/api/department')
 .then(response => response.json())
 .then(data => {
  if (data.success) {
    setnewDepartment(data.departments)
  }else{
    setError(data.message)
  }
 })
},[])

const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    programname: name? name : "",
    description: description? description: "",
    department: department? department : ""
  },
})


const onSubmit = async(value) =>{
  setLoading(true)
  const response =await fetch('/api/program',{
    method: 'POST',
    body: JSON.stringify({...value, slug: slugify(value.programname), newdescription})
  })
  const data = await response.json()
  setLoading(false)
    if (data.success) {
      router.push('/dashboard/programs')
      return router.refresh()
    }else{
      setError(data.message)
    }
}

const onUpdate = async(value) =>{
  setLoading(true)
  const response =await fetch('/api/program',{
    method: 'PATCH',
    body: JSON.stringify({...value, newdescription, id})
  })
  const data = await response.json()
  setLoading(false)
    if (data.success) {
      router.push('/dashboard/programs')
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
          name="programname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Name</FormLabel>
              <FormControl>
                <Input placeholder="Program of Engineering and Technology" defaultvalues={name} {...field} />
              </FormControl>
              <FormDescription>
                This is your program display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Department for this Program" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {newdepartment && newdepartment.map(dep=>(
                    <SelectItem key={`${dep._id}`} value={`${dep._id}`}>{dep.name}</SelectItem>
                  ))
                  }
                </SelectContent>
              </Select>
</FormItem> )}
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
