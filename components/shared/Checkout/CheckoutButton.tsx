import { useCreateCheckout } from '@/api/OrderApi'
import { useAppSelector } from '@/app/redux'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type Props = {
    netAmount: string
}

const CheckoutButton = ({ netAmount }: Props) => {
    const userInfo = useAppSelector((state) => state.user.user)
    const [address,setAddress] = useState("")
    const router = useRouter()
    const {createCheckout,isPending} = useCreateCheckout()


        console.log(address)
     
    const handleProceed = async ()=>{
        try{
          const response = await createCheckout({address})
          router.push(response.url) 
        }catch(error){
            console.log(error)
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='h-[44px] mt-8' disabled={userInfo?.cart.length === 0}>
                    Checkout
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Shipping Address</DialogTitle>
                    <DialogDescription>
                        <div>
                        <Label className='text-[14px] text-neutral-B900 font-medium mt-5' >Select Address</Label>
                        </div>
                        <div className='mt-5'>
                            {
                                userInfo?.address.length === 0 ? <div className='text-neutral-B500 text-[14px]'>
                                    Add an address to your profile to proceed
                                </div>:
                                <Select value={address} onValueChange={setAddress}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Address" />
                                </SelectTrigger>
                                <SelectContent>
                                   {
                                    userInfo?.address.map((address)=>(
                                        <SelectItem value={`${address.lineOne} ${address.city} ${address.country}`} 
                                        key={address.id}>
                                            {address.lineOne} {address.city} {address.country}
                                        </SelectItem>
                                    ))
                                   }
                                </SelectContent>
                            </Select>
                            }
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={userInfo?.address.length === 0 && address === "" || isPending}
                     className='' onClick={handleProceed}>
                        {isPending ? "Loading..":"Proceed"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CheckoutButton