"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Loader from '../Loader/Loader';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  email: z.string().min(5, { message: 'Please enter a valid Email address.' }).email({ message: 'Invalid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  role: z.enum(['teacher', 'student', 'employee']),
});

const SignIn = () => {
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
      name: '',
      email: '',
      password: '',
      role: 'student',
    },
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success) {
        router.push('/login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setLoading(false);
      setError('An unexpected error occurred');
    }
  };

  if (!mounted) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-[500px] h-auto px-3 py-4 rounded-lg shadow-2xl">
      <h1 className="text-foreground/90 text-2xl sm:text-3xl text-center my-4 font-semibold">Create Your Account</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormItem>
            <FormLabel>Enter Your Name</FormLabel>
            <FormControl>
              <Input placeholder="Name" {...form.register('name')} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Enter Your Email</FormLabel>
            <FormControl>
              <Input placeholder="Email" type="email" {...form.register('email')} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Enter Your Password</FormLabel>
            <FormControl>
              <Input placeholder="Password" type="password" {...form.register('password')} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Select Your Role</FormLabel>
            <FormControl>
              <Select {...form.register('role')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>

          <Button type="submit" loading={loading} className="w-full my-2">
            {loading ? 'Signing In..' : 'Sign In'}
          </Button>
          <p>Already have an account? <Link href="/login" className="text-primary font-bold text-base">Login</Link></p>
        </form>
        {error && <div className="error text-red-600 font-bold"><p>{error}</p></div>}
      </Form>
    </div>
  );
};

export default SignIn;
