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
import ReactQuill from "../../../../../Components/ReactQuill/ReactQuill";
import Loader from "../../../../../Components/Loader/Loader";
import slugify from "../../../../../utils/slugify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../Components/ui/select"

// Define the schema for the form validation
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
});

export default function NewsForm({ title, category, description, id }) {
  const [newDescription, setNewDescription] = useState(description || '');
  const router = useRouter();
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch categories when component mounts
  useEffect(() => {
    fetch('/api/news/category')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setCategories(data.data);
        } else {
          setError(data.message);
        }
      });
  }, []);

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title || "",
      category: category || "",
    },
  });

  // Handle form submission
  const onSubmit = async (value) => {
    setLoading(true);
    const response = await fetch('/api/news', {
      method: 'POST',
      body: JSON.stringify({ ...value, slug: slugify(value.title), description: newDescription }),
    });
    const data = await response.json();
    setLoading(false);
    if (data.success) {
      router.push('/dashboard/news');
      router.refresh();
    } else {
      setError(data.message);
    }
  };

  const onUpdate = async(value) =>{
    setLoading(true)
    const response =await fetch('/api/news',{
      method: 'PATCH',
      body: JSON.stringify({...value, description: newDescription, id})
    })
    const data = await response.json()
    setLoading(false)
      if (data.success) {
        router.push('/dashboard/news')
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter news title" {...field} />
                </FormControl>
                <FormDescription>
                  The title of the news article.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Category for this News" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {categories && categories.map(cat => (
                    <SelectItem key={`${cat._id}`} value={`${cat._id}`}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
                <ReactQuill econtent={newDescription} setContent={setNewDescription} />

        <Button type="submit" loading={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
      <div className="error text-red-600 font-bold">
        <p>{error}</p>
      </div>
    </Form>
  );
}
