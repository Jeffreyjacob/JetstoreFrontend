import { useCreateStore, useEditStore } from '@/api/StoreApi';
import CreateProductTab from '@/app/(authUser)/sellerdashboard/(tabs)/CreateProductTab';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type StoreInput = {
    storeName: string,
    storeDescription: string,
    image?: File
}

type Props = {
    formType: "edit" | "create",
    formInput: StoreInput,
    id?:string
}

const formSchema = z.object({
    storeName: z.string().min(1, "storename is required"),
    storeDescription: z.string().min(1, "storeDescription is required"),
    image: z.any()
        .refine((file) => file instanceof File, { message: "Image is required" })
        .refine((file) => file?.size <= 5000000, { message: "Image size should not exceed 5MB" })
        .optional()
})

const StoreForm = ({ formInput, formType,id=""}: Props) => {
    const [open, setOpen] = useState(false)
    const { createStore, isPending: CreatingStore } = useCreateStore()
    const {editSore,isPending:UpdatingStore} = useEditStore(id)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formInput,
    })
    console.log(formInput)
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        if (formType === "create") {
            const formdata = new FormData()
            formdata.append("storeName", values.storeName)
            formdata.append("storeDescription", values.storeDescription)
            if(values.image){
            formdata.append("image", values.image)
            }

            try {
                await createStore(formdata)
                setOpen(false)
            } catch (error) {
                console.log(error)
            }
        }

        if(formType === "edit"){
            const formdata = new FormData()
            formdata.append("storeName", values.storeName)
            formdata.append("storeDescription", values.storeDescription)
           if(formInput.image){
            formdata.append("image",formInput.image)
           } 

            try {
                await editSore(formdata)
                setOpen(false)
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='w-fit'>
                    {
                        formType === "edit" && "Edit Store"
                    }
                    {
                        formType === "create" && "Create Store"
                    }
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {
                            formType === "edit" && "Edit Store"
                        }
                        {
                            formType === "create" && "Create Store"
                        }
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="storeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Store name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter store name" value={field.value}
                                        onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="storeDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Store Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter store description"
                                        value={field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Store Logo/Image</FormLabel>
                                    <FormControl>
                                        <Input type='file'
                                          
                                            onChange={(e) => field.onChange(e.target.files?.[0])} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            formType === "create" && 
                            <Button type="submit" disabled={CreatingStore}>
                               {CreatingStore ? "Creating":"Create"}
                            </Button>
                        }

                        {
                            formType === "edit" && 
                            <Button type="submit" disabled={UpdatingStore}>
                               {UpdatingStore ? "Updating":"Edit"}
                            </Button>
                        }
                        
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default StoreForm