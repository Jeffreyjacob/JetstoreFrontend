"use client"
import { useGetStore } from '@/api/StoreApi'
import { useAppSelector } from '@/app/redux'
import StoreForm from '@/components/shared/forms/StoreForm'
import { Label } from '@/components/ui/label'
import { StoreType } from '@/lib/type'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const StoreTab = () => {
  const userInfo = useAppSelector((state) => state.user.user)
  const {getStore,isLoading,refetch} = useGetStore()
  const [storeInfo,setStoreInfo] = useState<StoreType | null>(null)
  const [imageFile,setImagefile] = useState<File | null>(null)

  useEffect(()=>{
      refetch()
      if(getStore){
        setStoreInfo(getStore?.store)
      }
  },[getStore])

  useEffect(()=>{
    const convertImage = async () => {
      try {
        if (storeInfo?.storeImage) {
          const res = await fetch(storeInfo.storeImage)
          const blob = await res.blob()
          const fileName = storeInfo?.storeImage.split('/').pop() || 'edit-image'
          const file = new File([blob], fileName, { type: blob.type })
          setImagefile(file)
        }
      } catch (error) {
        console.error('Error converting image:', error)
      }
    }
    convertImage()
  },[storeInfo?.storeImage])
   

  const storeDefault = {
    storeName: "",
    storeDescription: "",
    image: undefined
  }
   const storeInformation = {
    storeName:storeInfo?.storeName || "",
    storeDescription:storeInfo?.storeDescription || "",
    image:imageFile || undefined
   }

   console.log(imageFile)
  return (
    <div className='w-full mt-10 lg:px-3'>
     {
      isLoading ? <div className='w-full h-full flex justify-center items-center'> 
           <Loader className=" animate-spin"/>
      </div>:<>
      {
        userInfo?.store.length || 0 > 0 ? <div className='mb-10'>
          <h4 className='text-[20px] lg:text-[24px] font-bold mb-5'>Store Information</h4>
          {
             storeInfo && <div className='w-full flex flex-col gap-2'>
                <div className='flex flex-col gap-3'>
                  <Label className='text-[15px] font-bold'>
                    Store Name
                  </Label>
                  <p className='bodyText'>
                    {storeInfo?.storeName}
                  </p>
                </div>
                <div>
                  <Label className='text-[15px] font-bold'>
                    Store Description
                  </Label>
                  <p className='max-w-xl bodyText'>
                    {storeInfo?.storeDescription}
                  </p>
                </div>
                <div className='mb-6'>
                  <Label className='text-[16px] font-bold'>
                    Store Logo/Image
                  </Label>
                  <Image src={storeInfo?.storeImage || ""} alt='storeImage'
                    className='object-contain rounded-xl shadow-md' width={100} height={100} />
                </div>
                <StoreForm formType="edit" formInput={storeInformation} id={storeInfo.id.toString()} />
              </div>
          }
        </div> :
          <div className='w-full flex flex-col gap-4 px-2 md:px-5 xl:px-0'>
            <h4 className='font-bold text-[20px]'>
              Hi, {userInfo?.fullname}
            </h4>
            <p className='text-neutral-500 bodyText'>Create a store with our platform to sell your products and accessories for free</p>
            <StoreForm formType="create" formInput={storeDefault} />
          </div>
      }
      </>
     }
    </div>
  )
}

export default StoreTab