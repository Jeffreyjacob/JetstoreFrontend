"use client"
import { useAddaddress } from '@/api/UserApi'
import { useAppDispatch } from '@/app/redux'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AddNewAddress } from '@/state/userSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    lineOne: z.string().min(1, "Please enter street "),
    lineTwo: z.string().optional(),
    city: z.string().min(1, "please enter your city"),
    country: z.string().min(1, "please enter your country")
})

export type AddressInputType = z.infer<typeof formSchema>

const AddressForm = () => {
    const [open, setOpen] = useState(false)
    const {addAddress,isPending} = useAddaddress()
    const dispatch = useAppDispatch()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lineOne: "",
            lineTwo: "",
            city: "",
            country: ""
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        try{
         const response = await addAddress({
            lineOne:values.lineOne,
            lineTwo:values.lineTwo,
            city:values.city,
            country:values.country
         })
         setOpen(false)
         form.reset()
         dispatch(AddNewAddress(response.address))
        }catch(error){
            console.log(error)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='w-fit'>
                    <Plus className='w-4 h-4 text-white' />
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Address
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="lineOne"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Line One</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter street address one" value={field.value}
                                            onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lineTwo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Line Two</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter street address Two" value={field.value}
                                            onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex gap-3 w-full'>
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter City" value={field.value}
                                                onChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Country" value={field.value}
                                                onChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" disabled={isPending}>
                          {isPending ? "Adding...":"Add address"}
                        </Button>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddressForm