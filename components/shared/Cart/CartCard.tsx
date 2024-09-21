import { CartItemType } from '@/lib/type'
import Image from 'next/image'
import React, { useState } from 'react'
import QualityField from '../QualityField'
import { X } from 'lucide-react'
import { useChangeQuantity, useRemoveCart } from '@/api/CartApi'
import { useAppDispatch } from '@/app/redux'
import { ChangeQuantity, RemoveCart } from '@/state/userSlice'

type Props = {
  cart: CartItemType
}

const CartCard = ({ cart }: Props) => {
  const {changeQuantity} = useChangeQuantity()
  const {removeCart} = useRemoveCart()
  const dispatch = useAppDispatch()
  
  const handleDeleteCart = async (id:number)=>{
      try{
         await removeCart(id.toString())
         dispatch(RemoveCart({id}))
      }catch(error){
        console.log(error)
      }
  }

  const handleChangeQuantity = async (value:number)=>{
    console.log(value)
      try{
        dispatch(ChangeQuantity({id:cart.id,quantity:value}))
        await changeQuantity({id:cart.id.toString(),quantity:value})
      }catch(error){
        console.log(error)
      }
  }
  return (
    <div className='w-full flex justify-start md:justify-between sm:items-center gap-2 sm:gap-5'>
      <div className='w-full flex gap-3'>
        <div className='w-[90px] h-[90px] px-2 rounded-lg shadow-md flex justify-center items-center'>
          <Image src={cart.product.images[0]}
            alt='cart-image'
            width={60} height={60} />
        </div>
        <div className='w-full grid sm:grid-cols-2 justify-start sm:justify-between items-center max-sm:gap-2'>
          <div className='w-full flex flex-col gap-1 sm:gap-2'>
            <p className='bodyText font-medium text-neutral-B900'>{cart.product.name}</p>
              <div className='w-full flex gap-3 text-[12px] font-medium text-neutral-B500'>
                     <span>
                       Color - {cart.selectedColor} 
                     </span>
                     <span>
                       Size: {cart.selectedSize}
                     </span>
              </div>
          </div>
          <div className='w-full flex max-sm:flex-col max-sm:gap-2 justify-start sm:justify-between sm:items-center'>
             <span className='text-[14px] font-semibold'>$ {cart.product.price}</span>
             <QualityField value={cart.quantity} onChange={handleChangeQuantity} 
             availableProduct={cart.product.quantityAvaliable}/>
          </div>
        </div>
      </div>
      <div className=''>
           <div className='rounded-lg p-3 shadow-md bg-neutral-W100'>
             <X className='w-3 h-3  cursor-pointer' onClick={()=>handleDeleteCart(cart.id)}/>
           </div>
      </div>
    </div>
  )
}

export default CartCard