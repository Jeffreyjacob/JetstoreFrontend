import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SelectField from '../SelectButton/SelectField';
import SizeField from '../SizeField';
import ColorField from '../ColorField';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useCreateProduct } from '@/api/ProductApi';
import { useGetStore } from '@/api/StoreApi';
import { useAppSelector } from '@/app/redux';

export type ProductInput = {
    name: string,
    description: string,
    price: string,
    quantityAvaliable: string,
    color: string[],
    category: string,
    images: File | undefined,
    size: string[]
}

type Props = {
    formType: "create" | "edit",
    formInput: ProductInput
    id?: string
}

const formSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Product description is required"),
    price: z.string().min(1, "Product price is required"),
    quantityAvailable:z.string().min(1, "Please specific a quantity"),
    color: z.array(z.string().min(1, "please select a color")),
    category: z.string().min(1, "select a category"),
    images: z.instanceof(File).optional(),
    size: z.array(z.string()).min(1, "Please upload at least one image"),
})


const ProductForm = ({ formInput, formType, id = "" }: Props) => {
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formInput,
    })
    const [ImagesFiles, setImagesFile] = useState<File[]>([])
    const {createProduct,isPending:creatingProduct} = useCreateProduct()
    const userInfo = useAppSelector((state)=>state.user.user)

    const watchCategory = form.watch('category');

    const getSizeOptions = (category: string) => {
        switch (category) {
            case 'CLOTHES':
                return ['S', 'M', 'L', 'XL', 'XXL'];
            case 'SHOES':
                return ['38-40', '40-43', '43-45', '45-47', '47-50'];
            case 'ACCESSORIES':
                return ['Small', 'Medium', 'Large'];
            case "BAGS":
                return ['Small', 'Medium', 'Large'];
            default:
                return ['S', 'M', 'L', 'XL', 'XXL'];
        }
    };

    const sizeOptions = getSizeOptions(watchCategory);

    const categoryData = [
        { name: "Clothes", value: "CLOTHIES" },
        { name: "Accessories", value: "ACCESSERIES" },
        { name: "Shoes", value: "SHOES" },
        { name: "Bags", value: "BAGS" },
    ]

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? Array.from(e.target.files) : []
        selectedFile.forEach((file) => {
            const fileType = file.type
            const validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/jpg"];
            if (validImageTypes.includes(fileType)) {
                setImagesFile((prevState) => [...prevState, file])
            } else {
                toast.error("Only images are accepted")
            }
        })
    }

    const removeImage = (name:any)=>{
      setImagesFile(ImagesFiles.filter((file:any)=> file.name !== name))
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        if(formType === "create"){
            try{
                const formData = new FormData()
                ImagesFiles.forEach((file)=> formData.append("images",file))
                formData.append("name",values.name)
                formData.append("price",values.price)
                formData.append("description",values.description)
                formData.append("category",values.category)
                formData.append("quantityAvaliable",values.quantityAvailable)
                values.size.map((size)=>{
                    formData.append("size",size)
                })
                values.color.map((color)=>{
                    formData.append("color",color)
                })
                userInfo?.store.map((store)=>{
                    formData.append("storeId",store.id.toString())
                })
              await createProduct(formData)
              form.reset()
              setImagesFile([])
            }catch(error){
                console.log(error)
            }
        }
    }
    return (
        <div className='mt-5 w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className='grid md:grid-cols-2 gap-5'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='bodyText'>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter name" {...field}
                                            className='max-w-md h-[45px] ' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quantityAvailable"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='bodyText'>Available Quantity</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter available quantity" {...field}
                                            className='max-w-md h-[45px]' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='grid md:grid-cols-2 gap-5'>
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='bodyText'>Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter price" {...field}
                                            className='max-w-md h-[45px]' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='bodyText'>Category</FormLabel>
                                    <FormControl>
                                        <SelectField placeHolder='Select Category'
                                            className='max-w-md h-[45px]' onChange={field.onChange} value={field.value}
                                            data={categoryData} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='grid md:grid-cols-2 gap-5'>
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='bodyText'>Color</FormLabel>
                                    <FormControl>
                                        <ColorField value={field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='w-full flex flex-col gap-3'>
                            <FormField
                                control={form.control}
                                name="images"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='bodyText'>Product Images</FormLabel>
                                        <FormControl>
                                            <Input type='file' onChange={handleImageChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex gap-2 flex-wrap'>
                            {
                                ImagesFiles.map((file, index) => (
                                    <div key={index} className='w-fit h-full p-3 shadow-md rounded-lg bg-neutral-W100 relative'>
                                        <div className=' absolute -top-2 -right-2 p-2 bg-neutral-W900 rounded-full cursor-pointer'
                                         onClick={()=>removeImage(file.name)}>
                                        <X className='w-4 h-4'/>
                                        </div>
                                        <Image src={URL.createObjectURL(file)} alt='product-image'
                                            width={56} height={56} className=' object-contain'/>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2 gap-5'>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='bodyText'>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter description" {...field}
                                            className='max-w-md h-[65px]' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='bodyText'>Size</FormLabel>
                                    <FormControl>
                                        <SizeField value={field.value} onChange={field.onChange}
                                            sizeOption={sizeOptions} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={creatingProduct}>
                        {creatingProduct ? "Loading...":"Save Product"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ProductForm