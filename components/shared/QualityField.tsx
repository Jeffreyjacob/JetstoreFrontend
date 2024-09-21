import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

type Props = {
    value:number,
    onChange:(quality:number)=>void,
    availableProduct:number
}

const QualityField = ({value,onChange,availableProduct}:Props) => {
     const increaseQuantity = ()=>{
        if(availableProduct > value){
            onChange(value + 1)
        }else{
            toast.error("You exceeded the amount of stock we have for this product")
        }
     }

     const decreaseQuantity = ()=>{
        if(value > 0){
            onChange(value -1)
        }
     }
  return (
    <div className='w-[154px] h-[44px] border border-neutral-W100 shadow-md grid grid-cols-3 items-center '>
        <div className='cursor-pointer p-3 flex justify-center' onClick={decreaseQuantity}>
        <Minus className='w-5 h-5 text-neutral-B500' />
        </div>
       <p className='text-[15px] text-center font-medium'>
         {value}
       </p>
       <div className='cursor-pointer p-3 flex justify-center' onClick={increaseQuantity}>
       <Plus className='w-5 h-5 text-neutral-B500'/>
       </div>
    </div>
  )
}

export default QualityField