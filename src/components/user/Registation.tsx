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
import { error } from "console"
import { ToastAction } from "@radix-ui/react-toast"
import { useRouter } from "next/navigation"

const FormSchema = z.object(
  {
    
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  },


),
password:z.string().min(4, {
    message: "Password must be at least 4 characters.",
  },


),
firstName: z.string().min(2, {
  message: "Username must be at least 2 characters.",
},
),
lastName: z.string().min(2, {
  message: "Username must be at least 2 characters.",
},
)
})

export function Registation() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      
    },
  })
const router =useRouter();
 async function  onSubmit(data: z.infer<typeof FormSchema>) {


    try{
        const response =await fetch('/api/user/add',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)        }
    )
    const data1 = await response.json();
    console.log('Success:', data);

   
    if(!response.ok){
        throw new Error("Something went wrong")

    }
    else{

      router.refresh();
      router.push("/api/auth/signin");
        toast({
            title: "User registration successfull",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-white">
               <p> User Added</p>
              </pre>
            ),
          })

    }

    }
    
    catch(error){
        console.log(error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })

       
    }
    finally{
         data:""
    }
    
  
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen align-middle ">

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center p-10 space-y-6 bg-gray-100 max-w-72">
      <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Password</FormLabel>
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
     
        <Button type="submit">Register</Button>
      </form>
    </Form>
    </div>
  )
}
