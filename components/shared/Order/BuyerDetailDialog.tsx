import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import React from 'react'

type Props = {
    productName:string,
    productQuantity:number,
    storeName:string,
    storeInfo:string
}

const BuyerDetailDialog = ({productName,productQuantity,storeName,storeInfo}:Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='text-[12px] border-neutral-B900' variant="outline">
                    View More
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogDescription>
                        <div className='flex flex-col gap-1 mt-4'>
                            <Label className='text-[14px] font-semibold text-neutral-B900'>Product Name</Label>
                            <span className='text-[12px] font-medium text-neutral-B500'>
                                {productName}
                            </span>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='text-[14px] font-semibold text-neutral-B900'>Product Quantity</Label>
                            <span className='text-[12px] font-medium text-neutral-B500'>
                                {productQuantity}
                            </span>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='text-[14px] font-semibold text-neutral-B900'>Store Name</Label>
                            <span className='text-[12px] font-medium text-neutral-B500'>
                                {storeName}
                            </span>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='text-[14px] font-semibold text-neutral-B900'>Store Info</Label>
                            <span className='text-[12px] font-medium text-neutral-B500'>
                                {storeInfo}
                            </span>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default BuyerDetailDialog