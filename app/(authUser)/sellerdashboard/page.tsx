"use client"
import Header from '@/components/shared/Header/Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import StoreTab from './(tabs)/Store'
import OrderTab from './(tabs)/OrderTab'
import ProductTab from './(tabs)/ProductTab'
import CreateProductTab from './(tabs)/CreateProductTab'
import { useAppSelector } from '@/app/redux'
import { useGetStore } from '@/api/StoreApi'

const Page = () => {
  const {getStore} = useGetStore()
    return (
        <div>
            <Header title='Seller Dashboard' />

            <div className=' w-full flex justify-center items-center'>
                <div className='w-full max-w-6xl px-5 md:px-7 xl:px-0 mt-10'>
                    <Tabs defaultValue="store">
                        <TabsList>
                            <TabsTrigger value="store">Store</TabsTrigger>
                            <TabsTrigger value="order">Order</TabsTrigger>
                            <TabsTrigger value='product'>Product</TabsTrigger>
                           {
                             getStore &&  <TabsTrigger value='createProduct'>Create Product</TabsTrigger>
                           }
                        </TabsList>
                        <TabsContent value="store">
                            <StoreTab/>
                        </TabsContent>
                        <TabsContent value="order">
                            <OrderTab/>
                        </TabsContent>
                        <TabsContent value="product">
                            <ProductTab/>
                        </TabsContent>
                        <TabsContent value="createProduct">
                            <CreateProductTab/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

        </div>
    )
}

export default Page