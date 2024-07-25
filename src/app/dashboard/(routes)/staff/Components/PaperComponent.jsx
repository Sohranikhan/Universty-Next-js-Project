import React from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../../../Components/ui/dialog"
import { Label } from "../../../../../Components/ui/label"
import { Input } from '../../../../../Components/ui/input'
import { useState } from 'react'
import { Button } from '../../../../../Components/ui/button'
const PaperComponent = ({ paperArr, setPaperArr }) => {
    const [title, setTitle] = useState('')
    const [publication, setPublication] = useState('')
    const [year, setYear] = useState(20)
    const [url, setUrl] = useState('')

    const handleAddPaper = () => {
        if (title.length > 5, publication.length > 3, url.length > 5) {
            setPaperArr([...paperArr, { title, publication, year, url }])
            setTitle('')
            setPublication('')
            setYear(20)
            setUrl('')
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="bg-primary text-background my-3 px-2 py-2 rounded">
                Add Reseach Papers
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Reseach Paper</DialogTitle>
                    <DialogDescription>Fill up information about your paper</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-start justify-start">

                    <Label htmlFor="name" className="py-2 px-2">Title</Label>
                    <Input id="name" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />

                    <Label htmlFor="publication" className="py-2 px-2">Publication</Label>
                    <Input id="publication" value={publication} onChange={(e) => setPublication(e.target.value)} className="col-span-3" />

                    <Label htmlFor="" year className="py-2 px-2">Year</Label>
                    <Input id="year" value={year} onChange={(e) =>
                        setYear(e.target.value)} className="col-span-3" />

                    <Label htmlFor="url" className="py-2 px-2">URL</Label>
                    <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} className="col-span-3" />

                    <Button type="button" className="mt-3" onClick={handleAddPaper}>Add</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PaperComponent