"use client"
import Loader from '../Loader/Loader'
import { Button } from '../ui/button'
import { ImagePlus, Trash } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const Image_Upload = ({ value, onChange, onRemove }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])
    const onSuccess = (result) =>{
        onChange(result.info.secure_url)
    }

    if (!mounted) {
        return <Loader />
    }

    return (
        <div className="mb-4 flex items-center">
{value && 
                <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                    <div className="z-10 absolute right-0 top-0">
                        <Button onClick={() => onRemove(value)}><Trash /></Button>
                    </div>
                    <Image src={value} width={200} height={200} className="object-cover" alt="image" />
                </div>
}

            {/* Image Upload Component */}
            <CldUploadWidget onSuccess={onSuccess} uploadPreset='staff-uploads'
             width="500" // Transform the image: auto-crop to square aspect_ratio
             height="500"
             crop={{
               type: 'auto',
               source: true
             }}  >
                {({ open }) => {
                    return (
                        <button type="button" onClick={() => open} className="flex items-center gap-x-2 border-2 py-2 px-2 bg-accent rounded text-background border-none">
                            <ImagePlus /> Upload Image
                        </button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default Image_Upload