"use client"
import { useRemoveAddress } from '@/api/UserApi'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import AddressForm from '@/components/shared/forms/AddressForm'
import UserForm from '@/components/shared/forms/UserForm'
import { RemoveAddress } from '@/state/userSlice'
import { Loader2, Trash } from 'lucide-react'
import React from 'react'

const AccountInfo = () => {
    const userInfo = useAppSelector((state) => state.user.user)
    if (!userInfo) {
        return;
    }
    const dispatch = useAppDispatch()
    const {removeAdress} = useRemoveAddress()

    const handleRemoveAddress = async (id:string)=>{
         try{
           const response = await removeAdress(id)
           console.log(response)
            dispatch(RemoveAddress(response.address))
         }catch(error){
             console.log(error)
         }
    }
    return (
        <div className='w-full py-10 lg:px-3 grid md:grid-cols-2 max-md:gap-6'>
            <div>
                <h4 className='text-[18px] font-medium text-neutral-B900'>Account Information</h4>
                <UserForm />
            </div>
            <div>
                <h4 className='text-[18px] font-medium text-neutral-B900 mb-4' >Address</h4>
                <div>
                    {
                        (userInfo?.address.length > 0) ? <div className='max-w-lg flex flex-col gap-3'>
                            {
                                userInfo.address.map((address, index) => (
                                    <div className='flex flex-col gap-1'  key={address.id}>
                                        <h6 className='text-[15px] font-medium text-neutral-B600'>Address {index + 1}</h6>
                                        <div className='flex gap-3'>
                                            <span className='text-[13px] font-normal w-[300px]'>
                                                {address.lineOne}  {address.city}  {address.country}
                                            </span>
                                                <Trash className='text-red-600 w-4 h-4 cursor-pointer' onClick={()=>handleRemoveAddress(address.id.toString())} />
                                            
                                        </div>
                                    </div>
                                ))
                            }
                            <AddressForm />
                        </div> :
                            <div className='w-full flex flex-col gap-4'>
                                <p className='max-w-lg bodyText text-neutral-B400'>
                                    You don't have an account added to your account, Click the button to add an address
                                </p>
                                <AddressForm />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AccountInfo