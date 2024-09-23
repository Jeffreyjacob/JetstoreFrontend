import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { SellerOrderType } from '@/lib/type'
import React from 'react'

type Props = {
    order: SellerOrderType
}

const SellerDetailDialog = ({ order }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='text-[12px]'>
                    Show more
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogDescription>
                      <div className='flex flex-col gap-1 mt-4'>
                         <Label className='text-[14px] font-semibold text-neutral-B900'>Product Name</Label>
                         <span className='text-[12px] font-medium text-neutral-B500'>
                           {order.product.name}
                         </span>
                      </div>

                      <div className='flex flex-col gap-1'>
                         <Label className='text-[14px] font-semibold text-neutral-B900'>Product Quantity</Label>
                         <span className='text-[12px] font-medium text-neutral-B500'>
                           {order.quantity}
                         </span>
                      </div>

                      <div className='flex flex-col gap-1'>
                         <Label className='text-[14px] font-semibold text-neutral-B900'>Shipping Address</Label>
                         <span className='text-[12px] font-medium text-neutral-B500'>
                           {order.Order.address}
                         </span>
                      </div>

                      <div className='flex flex-col gap-1'>
                         <Label className='text-[14px] font-semibold text-neutral-B900'>Customer Name</Label>
                         <span className='text-[12px] font-medium text-neutral-B500'>
                           {order.Order.buyer.fullname}
                         </span>
                      </div>

                      <div className='flex flex-col gap-1'>
                         <Label className='text-[14px] font-semibold text-neutral-B900'>Customer Contact Info</Label>
                         <span className='text-[12px] font-medium text-neutral-B500'>
                         {order.Order.buyer.email}
                         </span>
                      </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default SellerDetailDialog