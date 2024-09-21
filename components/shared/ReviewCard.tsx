import { ReviewType } from '@/lib/type'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import moment from "moment";
import {  Trash2 } from 'lucide-react';
import { useAppSelector } from '@/app/redux';
import { useDeleteProductReview } from '@/api/ProductApi';

type Props = {
    review: ReviewType
}
const ReviewCard = ({ review}: Props) => {
   const userInfo = useAppSelector((state)=>state.user.user)
   const {deleteProductReview} = useDeleteProductReview()

   const handleDelete = async ()=>{
      try{
        await deleteProductReview(review.id.toString())
      }catch(error){
        console.log(error)
      }
   }
    return (
        <div className="w-full flex flex-col py-2 max-w-3xl">
            <div className='flex gap-5 items-start w-full'>
                <Avatar className='w-[48px] h-[48px] bg-primary-B100'>
                    <AvatarFallback className=' uppercase text-primary-B900'>
                        {review.user.fullname.slice(0,2)}
                    </AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex justify-between w-full'>
                    <h4 className=' capitalize'>{review.user.fullname}</h4>
                    {
                    (userInfo?.id === review.user.id) && <Trash2 className='w-4 h-4 text-red-600 cursor-pointer' onClick={handleDelete}/>
                    }
                    </div>
                    <span className='text-[12px] uppercase text-neutral-B500'>
                        {moment(review.createdAt).subtract(1, 'day').fromNow(true)} ago
                    </span>
                    <p className='text-[14px] text-neutral-B500 font-normal'>{review.reviewText}</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard