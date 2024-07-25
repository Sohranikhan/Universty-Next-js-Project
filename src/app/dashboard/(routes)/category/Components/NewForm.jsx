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
import slugify from "../../../../../utils/slugify";

// Define the schema for the form validation
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
});

// Main component for the category form
export default function CategoryForm({ name, id }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Ensure the component is mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
    },
  });

  // Handle form submission
  const onSubmit = async (value) => {
    setLoading(true);
    const response = await fetch('/api/news/category', {
      method: 'POST',
      body: JSON.stringify({ ...value, slug: slugify(value.name) }),
    });
    const data = await response.json();
    setLoading(false);
    if (data.success) {
      router.push('/dashboard/category');
      router.refresh();
    } else {
      setError(data.message);
    }
  };
  const onUpdate = async(value) =>{
    setLoading(true)
    const response =await fetch('/api/news/category',{
      method: 'PATCH',
      body: JSON.stringify({...value, id})
    })
    const data = await response.json()
    setLoading(false)
      if (data.success) {
        router.push('/dashboard/category')
        return router.refresh()
      }else{
        setError(data.message)
      }
  }
  // Render a loading state if component is not mounted
  if (!mounted) {
    return <Loader />;
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
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormDescription>
                  The Name of the category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

        <Button type="submit" loading={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
        </div>
      </form>
      <div className="error text-red-600 font-bold">
        <p>{error}</p>
      </div>
    </Form>
  );
}
