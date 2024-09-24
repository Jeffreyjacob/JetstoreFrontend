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
import { useLogin } from '@/api/AuthApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/app/redux';
import { AddUser} from '@/state/userSlice';
import {useCookies} from "react-cookie"

const formSchema = z.object({
    email: z.string().email("email is invalid").min(1, "email is required"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

const Page = () => {
    const router = useRouter()
    const {login,isPending} = useLogin();
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const [cookie,setCookie] = useCookies()
    const redirect = (searchParams.get("redirect") === "/login" && "/" ) ||
    (searchParams.get("redirect") === "/signup"  && "/" )
     || searchParams.get("redirect") || "/"  as string
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
       try{
         const response = await login({
            email:values.email,
            password:values.password
         })
         setCookie("token",{token:response.token})
         form.reset()

         dispatch(AddUser(response))
         router.push(redirect)
       }catch(error){
        console.log(error)
       }
    }
    return (
        <div className="w-full h-full">
            <Header title='Login' />
            <div className='w-full flex flex-col gap-4 justify-center items-center py-10'>
                <Button variant="outline" className='flex gap-2 bodyText w-[250px]  md:w-[320px] md:h-[44px]'>
                    <Image src={GoogleIcon} alt='google-icon' className='w-4 h-4 object-contain' />
                    Continue with Google
                </Button>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                        <div className='bodyText w-[250px]  md:w-[320px] md:h-[44px]'>
                           <Link href="/forgetpassword" className='flex justify-end'>
                             <p className='text-neutral-B600'>Forget Password?</p>
                           </Link>
                        </div>
                        <Button type="submit" className='flex gap-2 bodyText w-[250px]  md:w-[320px] md:h-[44px]' disabled={isPending}>
                            {
                                isPending ? "Loading...":"Login"
                            }
                        </Button>
                    </form>
                </Form>

                <div className='flex gap-2 text-[14px] font-normal'>
                    <p className=' text-neutral-B500'>Don't have an account?</p> 
                    <Link href="/signup" className=' text-neutral-B600'>
                       Sign up
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Page