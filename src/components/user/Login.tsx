"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { CredentialsSignin } from "next-auth"

const FormSchema = z.object({
  Email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  },


),
password:z.string().min(4, {
    message: "Password must be at least 4 characters.",
  },


),

})

export default function Login() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Email: "",
      
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
  
    signIn('credentials',{email:data.Email,
        password:data.password,
     redirect: true, 
        callbackUrl: "/" 
      },
    )
    
    
  }

  return (
<div className="flex flex-col items-center justify-center min-h-screen align-middle">
<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center p-10 space-y-6 bg-gray-100">
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
               
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PassWord</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Log In</Button>
      </form>
    </Form>
</div>
  
  )
}
