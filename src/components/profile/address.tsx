"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Updated schema without userId
const FormSchema = z.object({
  addrNo: z.string().min(1, { message: "Address Number is required." }),
  addrStreet: z.string().min(1, { message: "Street is required." }),
  addrLine1: z.string().min(1, { message: "Address Line 1 is required." }),
  addrLine2: z.string().min(1, { message: "Address Line 2 is required." }),
  addrTown: z.string().min(1, { message: "Town is required." }),
  addrDistrict: z.string().min(1, { message: "District is required." }),
  addrProvince: z.string().min(1, { message: "Province is required." }),
  postalCode: z.string().min(1, { message: "Postal Code is required." }),
  contactNo: z
    .string()
    .regex(/^\d{10}$/, { message: "Please enter a valid 10-digit contact number." }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export function UserDetails() {
  const router = useRouter();
  const session=useSession();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
  
      addrNo: "",
      addrStreet: "",
      addrLine1: "",
      addrLine2: "",
      addrTown: "",
      addrDistrict: "",
      addrProvince: "",
      postalCode: "",
      contactNo: "",
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
   
    try {
      
      const userId = session.data?.user?.id;
      const userdata={...data,userId};
      console.log("kkkkkkkkkkkdsvsasaaaaaaaaaaaaaaaaaaaaaa",userdata)
      
      const response = await fetch('/api/profile/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        
        body: JSON.stringify(userdata),
      });
  
      if (response.ok) {
        toast({ title: "Form submitted successfully!" });
        form.reset();
      } else {
        const errorData = await response.json();
        toast({ title: `Error: ${errorData.error}`});
      }
    } catch (error) {
      toast({ title: "Failed to submit the form" });
      console.error('Error submitting form:', error);
    }
  };

  return (
    <main className="flex items-center justify-center h-full bg-primary">
      <div className="flex flex-col py-20 mt-10 container w-[100%] lg:w-[50%]">
        <h1 className="py-0 mb-4 text-3xl font-bold sm:text-4xl md:text-7xl text-secondary">
          User Address Details
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            {/* Address Number Field */}
            <FormField
              control={form.control}
              name="addrNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">AdressNo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="AdressNo"
                      className="text-white bg-black border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Street Field */}
            <FormField
              control={form.control}
              name="addrStreet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Street</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Main Street"
                      className="text-white bg-black border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Line 1 Field */}
            <FormField
              control={form.control}
              name="addrLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Address Line 1</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Apartment, suite, etc."
                      className="text-white bg-black border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Line 2 Field */}
            <FormField
              control={form.control}
              name="addrLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Address Line 2</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Building, floor, etc."
                      className="text-white bg-black border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Province Selector */}
            <FormField
              control={form.control}
              name="addrProvince"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Province</FormLabel>
                  <FormControl>
                    <select className="text-white bg-black border" {...field}>
                      <option value="">Select Province</option>
                      <option value="Western">Western</option>
                      <option value="Central">Central</option>
                      <option value="Southern">Southern</option>
                      <option value="Northern">Northern</option>
                      <option value="Eastern">Eastern</option>
                      <option value="North Western">North Western</option>
                      <option value="North Central">North Central</option>
                      <option value="Uva">Uva</option>
                      <option value="Sabaragamuwa">Sabaragamuwa</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Town Selector */}
            <FormField
              control={form.control}
              name="addrTown"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Town</FormLabel>
                  <FormControl>
                    <select className="text-white bg-black border" {...field}>
                      <option value="">Select Town</option>
                      <option value="Colombo">Colombo</option>
                      <option value="Galle">Galle</option>
                      <option value="Kandy">Kandy</option>
                      <option value="Jaffna">Jaffna</option>
                      <option value="Trincomalee">Trincomalee</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* District Field */}
            <FormField
              control={form.control}
              name="addrDistrict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">District</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="District"
                      className="text-white bg-black border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Postal Code Field */}
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Postal Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="12345"
                      className="text-white bg-black border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Number Field */}
            <FormField
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0761234567"
                      className="text-white bg-black border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-end justify-end">
              <Button type="submit" className="px-8 py-1 text-white rounded-full bg-secondary">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default UserDetails;
