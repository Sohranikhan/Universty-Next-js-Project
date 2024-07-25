"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loader from "../Loader/Loader";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(5, {
    message: "Please enter a valid Email address.",
  }).email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginComponent = () => {
// const query = window.location.search
// const searchQuery =query.split('?callbackUrl=')[1]
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (value) => {
    setLoading(true);
    setError('');
    const result = await signIn('credentials', {
        email: value.email,
        password: value.password,
        redirect: false
    });
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/');
    }
  };

  if (!mounted) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-[500px] h-auto px-3 py-4 rounded-lg shadow-2xl">
      <h1 className='text-foreground/90 text-2xl sm:text-3xl text-center my-4 font-semibold'>Login</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" loading={loading} className="w-full my-2">
            {loading ? 'Logging in..' : 'Login'}
          </Button>
          <p>Don&apos;t have an account? <Link href={'/sign-in'} className="text-primary font-bold text-base">Sign Up</Link></p>
        </form>
        {error && <div className="error text-red-600 font-bold"><p>{error}</p></div>}
      </Form>
    </div>
  );
};

export default LoginComponent;
