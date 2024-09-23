"use client"
import { useAppSelector } from '@/app/redux'
import CartCard from '@/components/shared/Cart/CartCard'
import CheckoutButton from '@/components/shared/Checkout/CheckoutButton'
import Header from '@/components/shared/Header/Header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
    const router = useRouter()
    const userInfo = useAppSelector((state) => state.user.user)
        const subTotal = ()=>{
            const itemTotal =  userInfo?.cart.reduce((total,cart)=> total + parseInt(cart.product.price) * cart.quantity,0) || 0
            return itemTotal
         }

         const total = ()=>{
            const total =  subTotal() + 3 
            return total.toFixed(2)
        }

    return (
        <div>
            <Header title='Cart' />
            <div className='w-full flex justify-center items-center mb-12'>
                <div className='w-full max-w-6xl px-5 md:px-7 xl:px-4 mt-10'>
                    <div className='w-full flex flex-col lg:flex-row  gap-5 lg:gap-10'>
                        {/**left side */}
                        <div className='w-full flex flex-col gap-5 lg:w-2/3'>
                            <div className='w-full flex flex-col gap-3'>
                                <h4 className='text-[16px] font-semibold'>Your Cart</h4>
                                <Separator />
                            </div>
                            <div className='flex flex-col gap-6'>
                                {
                                userInfo?.cart.length === 0 ?<div className='w-full flex flex-col gap-4 justify-center items-center min-h-[55vh]'>
                                <ShoppingBag className='w-14 h-11 text-neutral-B600' />
                                <p className='text-neutral-B500 font-medium text-[14px]'>
                                  You have no item in your cart
                                </p>
                                <Button className='flex gap-3' onClick={()=>router.push("/search")}>
                                  Start Shopping
                                  <ArrowRight className='text-white w-4 h-4' />
                                </Button>
                              </div>:
                                <>
                                {
                                    userInfo?.cart.map((cart, index) => (
                                        <CartCard cart={cart} key={index} />
                                    ))
                                }
                                </>
                                }
                            </div>
                        </div>
                        {/**right side */}
                        <div className='w-full lg:w-[340px] h-fit flex justify-center'>
                            <Card className='w-full flex flex-col gap-3 px-7 lg:px-5 py-6 h-fit'>
                                <h4 className='w-full text-[16px] font-bold text-neutral-B900 mb-5'>
                                    Order Summary
                                </h4>

                                <div className='flex flex-col gap-3'>
                                    <div className='flex justify-between'>
                                        <Label className='text-[14px] font-medium text-neutral-B500'>
                                            SubTotal
                                        </Label>
                                        <span className='text-[14px] font-medium text-neutral-B900'>
                                            $ {subTotal().toFixed(2)}
                                        </span>
                                    </div>

                                    <div className='flex justify-between'>
                                        <Label className='text-[14px] font-medium text-neutral-B500'>
                                            Shipping:
                                        </Label>
                                        <span className='text-[14px] font-medium text-neutral-B900'>
                                            Free
                                        </span>
                                    </div>

                                    <div className='flex justify-between'>
                                        <Label className='text-[14px] font-medium text-neutral-B500'>
                                            Tax:
                                        </Label>
                                        <span className='text-[14px] font-medium text-neutral-B900'>
                                            $ 3.00
                                        </span>
                                    </div>

                                </div>
                                <Separator />

                                <div className='flex justify-between'>
                                    <Label className='text-[14px] font-medium text-neutral-B900'>
                                        Total
                                    </Label>
                                    <h6 className='text-[14px] font-medium text-neutral-B900'>
                                        $ {total()}
                                    </h6>
                                </div>
                               <CheckoutButton netAmount = {total()}/>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page