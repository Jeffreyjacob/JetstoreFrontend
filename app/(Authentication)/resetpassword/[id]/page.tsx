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
import { useResetPassword } from '@/api/AuthApi';
import { useParams, useRouter } from 'next/navigation';

const formSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword:z.string()
}).refine((data)=> data.password === data.confirmPassword,{
   message:"Password must match",
   path:["confirmPassword"]
})

const Page = () => {
     const {id} = useParams()
     const router = useRouter()
     const {resetPassword,isPending} = useResetPassword()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword:""
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try{
         await resetPassword({
           password:values.password,
           resetToken:id as string
         })
         form.reset()
          router.push("/login")
        }catch(error){
          console.log(error)
        }
    }
    return (
        <div className="w-full h-full">
            <Header title='Reset Password' />
            <div className='w-full flex flex-col gap-4 justify-center items-center py-10'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='bodyText text-neutral-600'>New password</FormLabel>
                                    <FormControl>
                                        <Input className='w-[250px]  md:w-[320px] md:h-[44px] bg-neutral-B100' type='password'
                                         placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='bodyText text-neutral-600'>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input className='w-[250px]  md:w-[320px] md:h-[44px] bg-neutral-B100' type='password'
                                         placeholder="Confirm your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='flex gap-2 bodyText w-[250px]  md:w-[320px] md:h-[44px]' disabled={isPending}>
                            {isPending ? "Loading...":" Reset password"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page