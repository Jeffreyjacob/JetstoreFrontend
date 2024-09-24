"use client"
import Header from '@/components/shared/Header/Header'
import { Button } from '@/components/ui/button'
import React from 'react'
import GoogleIcon from "@/public/Google.png";
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import SelectField from '@/components/shared/SelectButton/SelectField';
import { useSignUp } from '@/api/AuthApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/app/redux';
import { AddUser } from '@/state/userSlice';
import { useCookies } from 'react-cookie';

const formSchema = z.object({
    fullname: z.string().min(1, "name is required"),
    email: z.string().email("email is invalid").min(1, "email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["SELLER", "BUYER"])
})

const Page = () => {
    const {signup,isPending} = useSignUp()
    const searchParams = useSearchParams()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [cookie,setCookie] = useCookies()
    const redirect = (searchParams.get("redirect") === "/signup"  && "/" ) ||
    (searchParams.get("redirect") === "/login"  && "/" ) ||
     searchParams.get("redirect") || "/" as string
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            role: "BUYER"
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try{
          const response = await signup({
            email:values.email,
            fullName:values.fullname,
            password:values.password,
            role:values.role
          })
          setCookie("token",{token:response.token})
          form.reset()
          dispatch(AddUser(response))
          router.push(redirect)
        }catch(error){
            console.log(error)
        }
    }

    const RoleData = [
        {name:"Buyer",value:"BUYER"},
        {name:"Seller",value:"SELLER"}
    ]
    return (
        <div className="w-full h-full">
            <Header title='Signup' />
            <div className='w-full flex flex-col gap-4 justify-center items-center py-10'>
                <Button variant="outline" className='flex gap-2 bodyText w-[250px]  md:w-[320px] md:h-[44px]'>
                    <Image src={GoogleIcon} alt='google-icon' className='w-4 h-4 object-contain' />
                    Continue with Google
                </Button>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='bodyText text-neutral-600'>Name</FormLabel>
                                    <FormControl>
                                        <Input className='w-[250px]  md:w-[320px] md:h-[44px] bg-neutral-B100'
                                            placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='bodyText text-neutral-600'>Email</FormLabel>
                                    <FormControl>
                                        <Input className='w-[250px]  md:w-[320px] md:h-[44px] bg-neutral-B100'
                                            placeholder="Enter your email" {...field} />
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
                                    <FormLabel className='bodyText text-neutral-600'>Password</FormLabel>
                                    <FormControl>
                                        <Input className='w-[250px]  md:w-[320px] md:h-[44px] bg-neutral-B100'
                                            placeholder="Enter your Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='bodyText text-neutral-600'>Role</FormLabel>
                                    <FormControl>
                                        <SelectField className='w-[250px]  md:w-[320px] md:h-[44px] bg-neutral-B100'
                                        value={field.value} onChange={field.onChange} 
                                         data={RoleData} placeHolder='Select Role'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='bodyText w-[250px]  md:w-[320px] md:h-[44px] mt-7'>
                            <p className='text-neutral-B500'>By creating an account you agree with our Terms of Service, Privacy Policy.</p>
                        </div>
                        <Button type="submit" className='flex gap-2 bodyText w-[250px]  md:w-[320px] md:h-[44px]' disabled={isPending}>
                            {
                              isPending ? "Loading...":"Sign up"
                            }
                        </Button>
                    </form>
                </Form>

                <div className='flex gap-2 text-[14px] font-normal'>
                    <p className=' text-neutral-B500'>Don't have an account?</p>
                    <Link href="/login" className=' text-neutral-B600'>
                        Login
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Page