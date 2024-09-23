"use client"
import { useGetBuyerOrder } from '@/api/OrderApi'
import BuyerDetailDialog from '@/components/shared/Order/BuyerDetailDialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight, HardDrive } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Order = () => {
  const { getBuyerOrder, isLoading } = useGetBuyerOrder()
  const router  = useRouter()
  return (
    <div className='w-full py-6 lg:px-3  max-md:gap-6'>
      <h4 className='text-[18px] font-semibold text-neutral-B900 mb-5'>Order</h4>
      {
        isLoading ? <div className='w-full  sm:w-[600px] flex flex-col gap-4'>
          {
            [1,2,3].map((index)=>(
             <Skeleton key={index} className='h-[70px] w-full'/>
            ))
          }
        </div> :
         <>
           {
            getBuyerOrder?.order.length === 0 ? <div className='w-full flex flex-col gap-4 justify-center items-center'>
              <HardDrive className='w-14 h-11 text-neutral-B600' />
              <p className='text-neutral-B500 font-medium text-[14px]'>
                Your order history is waiting to be filled.
              </p>
              <Button className='flex gap-3' onClick={()=>router.push("/search")}>
                Start Shopping
                <ArrowRight className='text-white w-4 h-4' />
              </Button>
            </div>:
             <div className='flex flex-col gap-4'>
             {getBuyerOrder?.order.map((order) => (
               <div className='w-full flex gap-3'>
                 <div className='w-[90px] h-[90px] px-2 rounded-lg shadow-md flex justify-center items-center'>
                   <Image src={order.product.images[0]}
                     alt='cart-image'
                     width={60} height={60} />
                 </div>
                 <div className='w-full sm:w-[600px] flex flex-col sm:flex-row gap-4 justify-start sm:justify-between items-start sm:items-center' key={order.id}>
                   {/**left side */}
                   <div className='flex gap-3'>
                     <div className='flex flex-col gap-1'>
                       <span className='text-[14px]  font-medium text-neutral-B900'>
                         {order.product.name}
                       </span>
                       <span className='text-[14px] font-medium text-neutral-B500'>
                         Order On: {moment(order.createdAt).format("LL")}
                       </span>
                       <span className='text-[14px] font-medium text-neutral-B900'>
                         $ {order.quantity * parseInt(order.product.price)}
                       </span>
                     </div>
                   </div>
 
                   <div className='flex flex-col sm:flex-row sm:gap-5 sm:items-center'>
                     <p className='text-[14px] font-semibold text-neutral-B900 max-sm:mb-2'>
                       {order.Order.status}
                     </p>
                     <BuyerDetailDialog
                       productName={order.product.name}
                       productQuantity={order.quantity}
                       storeName={order.product.store.storeName}
                       storeInfo={order.product.store.storeDescription} />
                   </div>
                 </div>
               </div>
             ))}
           </div>
           }
         </>
      }
    </div>
  )
}

export default Order