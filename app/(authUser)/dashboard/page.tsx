import Header from '@/components/shared/Header/Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import AccountInfo from './(tabs)/AccountInfo'
import Order from './(tabs)/Order'
import WishList from './(tabs)/WishList'

const Page = () => {
  return (
    <div>
    <Header title='Dashboard' />

    <div className=' w-full flex justify-center items-center'>
        <div className='w-full max-w-6xl px-5 md:px-7 xl:px-0 mt-10'>
            <Tabs defaultValue="userInfo">
                <TabsList>
                    <TabsTrigger value="userInfo">Account</TabsTrigger>
                    <TabsTrigger value="Order">Order</TabsTrigger>
                    <TabsTrigger value='wishlist'>WishList</TabsTrigger>
                </TabsList>
                <TabsContent value="userInfo">
                    <AccountInfo/>
                </TabsContent>
                <TabsContent value="Order">
                    <Order/>
                </TabsContent>
                <TabsContent value="wishlist">
                    <WishList/>
                </TabsContent>
            </Tabs>
        </div>
    </div>

</div>
  )
}

export default Page