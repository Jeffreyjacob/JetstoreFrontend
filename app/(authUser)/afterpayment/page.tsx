"use client"
import Header from '@/components/shared/Header/Header'
import { Button } from '@/components/ui/button'
import { ArrowRight, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const router = useRouter()
  return (
    <div className='w-full min-h-screen h-full'>
      <Header title='Success Order' />
      <div className='w-full h-full flex flex-col gap-5 justify-center items-center transition-all duration-300'>
        <Package className='w-36 h-28 text-neutral-B600 mt-10' />
        <h4 className='text-[24px] font-bold text-neutral-B900'>Thank you for Shopping</h4>
        <p className='text-neutral-B500 font-normal text-[14px] max-w-[300px]'>
        Your order has been successfully placed and is now being processed.
        </p>
        <Button className='flex gap-3' onClick={() => router.push("/dashboard")}>
          Start Shopping
          <ArrowRight className='text-white w-4 h-4' />
        </Button>
      </div>
    </div>
  )
}

export default Page