"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../../../Components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../Components/ui/form";
import { Input } from "../../../../../Components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "../../../../../Components/Loader/Loader";
import { FaFilePdf } from "react-icons/fa";
import { CldUploadWidget } from "next-cloudinary"; // Import your upload widget component

// Define schema for downloads
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
});

export default function NewForm({ title, url, id }) {
  const [pdfUrl, setPdfUrl] = useState(url ? url : '');
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ? title : "",
    },
  });

  const onSubmit = async (value) => {
    setLoading(true);
    const response = await fetch('/api/downloads', {
      method: 'POST',
      body: JSON.stringify({ ...value, url: pdfUrl })
    });
    const data = await response.json();
    setLoading(false);
    if (data.success) {
      router.push('/dashboard/downloads');
      return router.refresh();
    } else {
      setError(data.message);
    }
  };

  const onUpdate = async (value) => {
    setLoading(true);
    const response = await fetch('/api/downloads', {
      method: 'PATCH',
      body: JSON.stringify({ ...value, id, url: pdfUrl })
    });
    const data = await response.json();
    setLoading(false);
    if (data.success) {
      router.push('/dashboard/downloads');
      return router.refresh();
    } else {
      setError(data.message);
    }
  };

  if (!mounted) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(id === 'new' ? onSubmit : onUpdate)} className="space-y-3">
        <div className="max-w-[550px]">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the title of the download" {...field} />
                </FormControl>
                <FormDescription>
                  This is the title of the download.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
 <div className="my-3 w-auto h-auto">

                <CldUploadWidget
                  uploadPreset="staff-uploads"
                  resourceType="raw" // 'raw' to handle non-media files like PDFs
                  clientAllowedFormats={['pdf']} // Allow only PDF uploads
                  maxFileSize={10000000} // Set max file size to 10MB
                  onSuccess={(result) => setPdfUrl(result?.info?.secure_url)}
                >
                  {({ open }) => (
                    <Button type="button" className="flex gap-2 items-center bg-red-700 text-background" onClick={open}>
                      <FaFilePdf /> Upload PDF
                    </Button>
                  )}
                </CldUploadWidget>

                  </div>
        <Button type="submit" loading={loading}>{loading ? 'Submitting...' : 'Submit'}</Button>
        </div>
      </form>
      <div className="error text-red-600 font-bold">
        <p>{error}</p>
      </div>
    </Form>
  );
}
