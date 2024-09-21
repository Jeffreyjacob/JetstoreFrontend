"use client"
import Header from '@/components/shared/Header/Header'
import { Button } from '@/components/ui/button'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useForgetPassword } from '@/api/AuthApi'

const formSchema = z.object({
    email: z.string().email("email is invalid").min(1, "email is required"),
})

const Page = () => {
    const {forgetPassword,isPending} = useForgetPassword()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try{
         await forgetPassword(values.email)
         form.reset()
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="w-full h-full">
            <Header title='Forget Password' />
            <div className='w-full flex flex-col gap-4 justify-center items-center py-10'>
               <div className='text-[14px] font-normal text-neutral-B600 w-[250px]  md:w-[320px] md:h-[44px] mb-6'>
                 <p>
                 Please enter the email address associated with your account. We'll promptly send you a link to reset your password.
                 </p>
               </div>

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
                        <Button type="submit" className='flex gap-2 bodyText w-[250px]  md:w-[320px] md:h-[44px]' disabled={isPending}>
                           {
                            isPending ? "Loading...":" Send reset link"
                           }
                        </Button>
                    </form>
                </Form>

                <div className='flex gap-2 text-[14px] font-normal'>
                    <p className=' text-neutral-B500'>Go back to</p> 
                    <Link href="/login" className=' text-neutral-B600'>
                       Login Page
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Page