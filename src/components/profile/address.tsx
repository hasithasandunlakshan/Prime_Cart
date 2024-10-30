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
import { CartContext } from "@/hooks/useCart";
import { useContext, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface City {
  cityId: number;
  cityName: string;
}

interface District {
  districtId: number;
  districtName: string;
  cities: City[];
}

interface Province {
  provinceId: number;
  provinceName: string;
  districts: District[];
}

// Schema without userId
const FormSchema = z.object({
  name: z.string().min(1, { message: "Name Required" }),
  addrNo: z.string().min(1, { message: "Address Number is required." }),
  addrStreet: z.string().min(1, { message: "Street is required." }),
  addrLine1: z.string().min(1, { message: "Address Line 1 is required." }),
  addrLine2: z.string().min(1, { message: "Address Line 2 is required." }),
  addrTown: z.string().min(1, { message: "Town is required." }),
  districtId: z.string().min(1, { message: "District is required." }),
  addrProvince: z.string().min(1, { message: "Province is required." }),
  postalCode: z.string().min(1, { message: "Postal Code is required." }),
  contactNo: z
    .string()
    .regex(/^\d{10}$/, { message: "Please enter a valid 10-digit contact number." }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export function UserDetails() {
  const router = useRouter();
  const { data: session } = useSession();
  const cartContext = useContext(CartContext);
  const [data, setData] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [isOtherTown, setIsOtherTown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMainCity,setIsMainCity]=useState(1);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/maincities');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: Province[] = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      addrNo: "",
      addrStreet: "",
      addrLine1: "",
      addrLine2: "",
      addrTown: "",
      districtId: "",
      addrProvince: "",
      postalCode: "",
      contactNo: "",
    },
  });

  const onSubmitUnregisteredUser = (data: FormSchemaType) => {
    const extendedData={...data,isMainCity};
    cartContext?.addAddress(extendedData);
    toast({ title: "Address saved successfully!" });
    form.reset();
  };

  const onSubmit = async (data: FormSchemaType) => {
    if (!session) {
      onSubmitUnregisteredUser(data);
      return;
    }

    try {
      const userId = session.user?.id;
      const userdata = { ...data, userId,isMainCity };
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
        toast({ title: `Error: ${errorData.error}` });
      }
    } catch (error) {
      toast({ title: "Failed to submit the form" });
      console.error('Error submitting form:', error);
    }
  };

  return (
    <main className="flex items-center justify-center w-full h-full bg-white max-w-screen">
      <div className="container flex items-center justify-center align-middle  rounded-lg w-[80%]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[100%] space-y-6">
            {/* Name Field */}

            <div className="flex gap-5">
              
            <FormField 
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className=" w-[50%]">
                  <FormLabel className="text-black">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" className="text-black bg-white border" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="addrNo"
              render={({ field }) => (
                <FormItem className=" w-[50%]">
                  <FormLabel className="text-black">Address No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Address No"
                      className="text-black bg-white border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

<div className="flex gap-5">
  
            <FormField
              control={form.control}
              name="addrStreet"
              render={({ field }) => (
                <FormItem className=" w-[50%]">
                  <FormLabel className="text-black">Street</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Main Street"
                      className="text-black bg-white border"
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
                <FormItem className=" w-[50%]">
                  <FormLabel className="text-black">Address Line 1</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Apartment, suite, etc."
                      className="text-black bg-white border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
</div>
            {/* Street Field */}

            {/* Address Line 2 Field */}


            <div className="flex gap-5">
            <FormField
              control={form.control}
              name="addrLine2"
              render={({ field }) => (
                <FormItem className=" w-[50%]">
                  <FormLabel className="text-black">Address Line 2</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Building, floor, etc."
                      className="text-black bg-white border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className=" w-[50%]">
                  <FormLabel className="text-black">Postal Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="12345"
                      className="text-black bg-white border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
              
            </div>
<div className="flex gap-5">
  
            <FormField
              control={form.control}
              name="addrProvince"
              render={({ field }) => (
                <FormItem className="w-[33%]">
                  <FormLabel className="text-black">Province</FormLabel>
                  <FormControl>
                  <Select
      {...field}
      onValueChange={(value) => {
        field.onChange(value); // Handles form field update
        setSelectedProvince(value); // Sets the selected province
        setSelectedDistrict(""); // Clears district selection
      }}
    >
      <SelectTrigger className="w-full text-black bg-white border">
        <SelectValue placeholder="Select Province" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Province</SelectLabel>
          {data.map((province) => (
            <SelectItem key={province.provinceId} value={province.provinceId.toString()}>
              {province.provinceName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* District Selector */}
            <FormField
      control={form.control}
      name="districtId"
      render={({ field }) => (
        <FormItem className="w-[33%]">
          <FormLabel className="text-black">District</FormLabel>
          <FormControl>
            <Select
              {...field}
              onValueChange={(value) => {
                field.onChange(value); // Update form value
                setSelectedDistrict(value); // Set the selected district
              }}
            >
              <SelectTrigger className="w-full text-black bg-white border">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select District</SelectLabel>
                  {data
                    .find((province) => province.provinceId.toString() === selectedProvince)
                    ?.districts.map((district) => (
                      <SelectItem key={district.districtId} value={district.districtId.toString()}>
                        {district.districtName}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

            {/* City Selector or Other Input */}
            <FormField
      control={form.control}
      name="addrTown"
      render={({ field }) => (
        <FormItem className="w-[33%]">
          <FormLabel className="text-black">Town</FormLabel>
          <FormControl>
            <Select
              {...field}
              onValueChange={(value) => {
                field.onChange(value === "Other" ? "" : value);
                setIsOtherTown(value === "Other");
                setIsMainCity(value === "Other" ? 0 : 1);
              }}
            >
              <SelectTrigger className="w-full text-black bg-white border">
                <SelectValue placeholder="Select Town" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Town</SelectLabel>
                  {data
                    .find((province) => province.provinceId.toString() === selectedProvince)
                    ?.districts.find((district) => district.districtId.toString() === selectedDistrict)
                    ?.cities.map((city) => (
                      <SelectItem key={city.cityId} value={city.cityName}>
                        {city.cityName}
                      </SelectItem>
                    ))}
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
</div>

            {/* Display text input if "Other" is selected */}
            <div className="flex gap-5">
              
            {isOtherTown && (
              <FormField
                control={form.control}
                name="addrTown"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel className="text-black">Mention Your Nearest Town</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter town name" className="text-black bg-white border" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}



            {/* Contact Number Field */}
            <FormField
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem  className="w-[50%]">
                  <FormLabel className="text-black">Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0761234567"
                      className="text-black bg-white border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            </div>

            {/* Other form fields... */}
            <div className="flex items-end justify-end">
            <button type="submit"
					className="px-4 py-2 m-2 text-white transition duration-500 bg-gray-700 border border-gray-700 rounded-md select-none ease hover:bg-gray-800 focus:outline-none focus:shadow-outline">
					Submit
				</button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default UserDetails;
