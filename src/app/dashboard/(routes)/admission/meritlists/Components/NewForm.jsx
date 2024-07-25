"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "../../../../../../Components/ui/input"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../Components/ui/select"

import Loader from "../../../../../../Components/Loader/Loader"
import { CldUploadWidget } from "next-cloudinary"
import { FaFilePdf } from "react-icons/fa"

const formSchema = z.object({
  program: z.string().min(4, {
    message: "Program Name must be at least 4 characters.",
  }),
})

export default function NewForm({program, prevPdfUrl, id}) {
const router = useRouter()
const [error, setError] = useState('')
const [pdfUrl, setPdfUrl] = useState(prevPdfUrl? prevPdfUrl: '');
const [loading, setLoading] = useState(false)
const [newProgram, setnewProgram] = useState([])
const [mounted, setMounted] = useState(false)
useEffect(() => {
setMounted(true)
}, [])

useEffect(()=>{
  fetch('/api/program')
 .then(response => response.json())
 .then(data => {
  if (data.success) {
    setnewProgram(data.programs)
  }else{
    setError(data.message)
  }
 })
},[])

const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    program: program? program : "",
  },
})


const onSubmit = async(value) =>{
  setLoading(true)
  const response =await fetch('http://localhost:3000/api/admission/meritlist',{
    method: 'POST',
    body: JSON.stringify({...value, pdfUrl})
  })
  const data = await response.json()
  setLoading(false)
    if (data.success) {
      router.push('/dashboard/admission/meritlists')
      return router.refresh()
    }else{
      setError(data.message)
    }
}

const onUpdate = async(value) =>{
  setLoading(true)
  const response =await fetch('http://localhost:3000/api/admission/meritlist',{
    method: 'PATCH',
    body: JSON.stringify({...value, pdfUrl, id})
  })
  const data = await response.json()
  setLoading(false)
    if (data.success) {
      router.push('/dashboard/admission/meritlists')
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
      <CldUploadWidget
          uploadPreset='staff-uploads'
          onSuccess={(result)=> setPdfUrl(result.info.secure_url)}
          options={{ resource_type: 'raw' }}
        >
          {({ open }) => (
            <Button type="button" className="flex gap-2 items-center bg-red-700 hover:bg-red-500" onClick={open}>
             <FaFilePdf /> Upload PDF
            </Button>
          )}
        </CldUploadWidget>

        <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Name</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Program for this Merit List" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {newProgram && newProgram.map(pro=>(
                    <SelectItem key={`${pro._id}`} value={`${pro._id}`}>{pro.name}</SelectItem>
                  ))
                  }
                </SelectContent>
              </Select>
              <FormDescription>
                This is your Program display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

<Button type="submit" loading={loading}>{loading?'Submitting..': 'Submit'}</Button>
</form>
      <div className="error text-red-600 font-bold mt-2">
        <p>{error}</p>
      </div>
    </Form>
  )
}
