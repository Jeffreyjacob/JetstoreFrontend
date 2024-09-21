import { useUpdateUserInfo } from '@/api/UserApi'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AddUser } from '@/state/userSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    fullName: z.string(),
    email: z.string().email()
})

const UserForm = () => {
    const userInfo = useAppSelector((state) => state.user.user)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [hover,setHover] = useState(false)
    const {updateUserInfo,isPending:updatingUser} = useUpdateUserInfo()
    const imageRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName:userInfo?.fullname, 
            email:userInfo?.email
        }
    })

    useEffect(() => {
      if(userInfo?.profilePicture){
        const convertImage = async () => {
            await fetch(userInfo?.profilePicture || "").then(
                async (response) => {
                    const blob = await response.blob()
                    const fileName = userInfo?.profilePicture?.split('/').pop() || 'edit-user';
                    const file = new File([blob], fileName, { type: blob.type });
                    setImageFile(file)
                }
            )
        }
        convertImage()
      }
    }, [userInfo?.profilePicture])

    const handleimageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (!files || files.length === 0) {
            toast.error("No file selected");
            return;
        }
        const file = files[0]
        const validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/jpg"];
        if (validImageTypes.includes(file.type)) {
            setImageFile(file)
        } else {
            toast.error("You can only upload an image")
        }
    }
    
    const triggerFileInput = () => {
        if (imageRef.current) {
            imageRef.current.click(); // Trigger input click
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try{
            const formData = new FormData()
            formData.append("fullName",values.fullName)
            if(imageFile){
                formData.append("image",imageFile)
            }
         const response = await updateUserInfo(formData)
          dispatch(AddUser(response))
        }catch(error){
            console.log(error)
        }
    }
    
    return (
        <div className='w-full flex  flex-col gap-3 mt-5'>
             <div className='flex flex-col cursor-pointer w-fit' onMouseEnter={()=>setHover(true)}
              onMouseLeave={()=>setHover(false)} onClick={triggerFileInput}>
                 <div className=' bg-primary-B100 h-[80px] w-[80px] flex items-center justify-center rounded-full relative'>
                {
                    imageFile ? <Image src={URL.createObjectURL(imageFile)}
                    alt='profile-image'
                    fill
                    className='rounded-full'/>:
                    <span className='text-[15px] uppercase text-primary-B900'>
                    {userInfo?.fullname.slice(0,2)}
                    </span>
                }
                <input type='file' onChange={handleimageChange} hidden ref={imageRef}/>
                  {
                    hover && <div className='absolute bg-slate-400 w-full h-full rounded-full flex items-center justify-center transition-all duration-100'>
                       <Camera className='w-4 h-4 text-neutral-B900'/>
                    </div>
                  }
                 </div>
             </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn"
                                    className='max-w-md h-[45px]'
                                     disabled={true} value={field.value} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn"
                                    className='max-w-md h-[45px]'
                                    {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={updatingUser}>
                        {updatingUser ? "Updating":"Save Change"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default UserForm