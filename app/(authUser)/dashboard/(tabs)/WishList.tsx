"use client"
import { useRemoveWishlist } from '@/api/WishlistApi'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { Button } from '@/components/ui/button'
import { RemoveWishlist } from '@/state/userSlice'
import { HeartOff } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const WishList = () => {
   const userInfo = useAppSelector((state)=>state.user.user)
   const router = useRouter()
   const dispatch = useAppDispatch()
   const {removeWishlist,isPending} = useRemoveWishlist()
   const handleRemoveWishlist = async(id:number)=>{
     try{
       const response = await removeWishlist(id.toString())
       dispatch(RemoveWishlist(response.wishlist))
       console.log(response)
     }catch(error){
      console.log(error)
     }
   }
  return (
    <div className='w-full py-6 lg:px-3  max-md:gap-6'>
         <h4 className='text-[18px] font-semibold text-neutral-B900 mb-5'>Wishlist</h4>
         <>
           {
            userInfo?.wishlist.length === 0 ? <div className='w-full flex flex-col gap-4 justify-center items-center'>
              <HeartOff  className='w-14 h-11 text-neutral-B600' />
              <p className='text-neutral-B500 font-medium text-[14px]'>
                No item in your wishlist 
              </p>
            </div>:
             <div className='flex flex-col gap-4'>
             {userInfo?.wishlist.map((wishlist) => (
               <div className='w-full flex gap-3' key={wishlist.id}>
                 <div className='w-[90px] h-[90px] px-2 rounded-lg shadow-md flex justify-center items-center'>
                   <Image src={wishlist.product.images[0]}
                     alt='cart-image'
                     width={60} height={60} />
                 </div>
                 <div className='w-full sm:w-[600px] flex flex-col sm:flex-row gap-4 justify-start sm:justify-between items-start sm:items-center'>
                   {/**left side */}
                   <div className='flex gap-3'>
                     <div className='flex flex-col gap-1'>
                       <span className='text-[14px]  font-medium text-neutral-B900'>
                         {wishlist.product.name}
                       </span>
                       <span className='text-[14px] font-medium text-neutral-B500'>
                         Added On: {moment(wishlist.createdAt).format("LL")}
                       </span>
                       <span className='text-[14px] font-medium text-neutral-B900 underline cursor-pointer'
                        onClick={()=>handleRemoveWishlist(wishlist.id)}>
                          {
                            isPending ? "removing...":"Remove Item"
                          }
                       </span>
                     </div>
                   </div>
 
                   <div className='flex flex-col sm:flex-row sm:gap-5 sm:items-center'>
                     <p className='text-[14px] font-semibold text-neutral-B900 max-sm:mb-2'>
                     $ {wishlist.product.price}
                     </p>
                    <Button onClick={()=>router.push(`/productdetails/${wishlist.productId}`)}>
                       View more
                    </Button>
                   </div>
                 </div>
               </div>
             ))}
           </div>
           }
         </>
    </div>
  )
}

export default WishList