"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ToastAction } from "@radix-ui/react-toast"

// Define form validation schema
const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(4, { message: "Password must be at least 4 characters." }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
})

export function Registration() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  })
  const router = useRouter()

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // Hash the password before sending it to the server
      const hashedPassword = await bcrypt.hash(data.password, 10)

      const response = await fetch('/api/user/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          password: hashedPassword,
        }),
      })

      if (!response.ok) throw new Error("Something went wrong")

      toast({
        title: "User registration successful",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-white">
            <p>User Added</p>
          </pre>
        ),
      })
      router.push("/api/auth/signin")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "invalid ",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-44">
      <div className="flex w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg">
        
        {/* Left Side Image */}
        <div className="hidden w-1/2 bg-cover md:flex" style={{ backgroundImage: `url('/login.jpg')` }}>
          {/* Add any overlay text or styles here if needed */}
        </div>
        
        {/* Right Side Form */}
        <div className="flex flex-col justify-center w-full p-8 space-y-6 md:w-1/2">
          <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account!</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="First Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Last Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="Password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700">
                  Register Account
                </Button>
              </div>
            </form>
          </Form>
          <hr className="w-full my-4 border-t" />
          <div className="flex flex-col items-center space-y-2">
            <a className="text-blue-500 hover:text-blue-700" href="#">
              Forgot Password?
            </a>
            <a className="text-blue-500 hover:text-blue-700" href="/api/auth/signin">
              Already have an account? Login!
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration
