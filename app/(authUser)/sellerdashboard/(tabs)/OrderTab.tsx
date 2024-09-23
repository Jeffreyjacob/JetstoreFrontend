"use client"
import { useChangeOrderStatus, useDeleteOrder, useGetSellerOrder } from '@/api/OrderApi'
import DeleteAlert from '@/components/shared/DeleteAlert'
import SellerDetailDialog from '@/components/shared/Order/SellerDetailDialog'
import PaginationSelector from '@/components/shared/Pagination/PaginationSelector'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { SellerOrderType } from '@/lib/type'
import { ArrowUpDown, Ellipsis, HardDrive } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const OrderTab = () => {
  const [page, setPage] = useState(1)
  const { Order, isLoading } = useGetSellerOrder(page)
  const [sellerOrder, setSellerOrder] = useState<SellerOrderType[]>([])
  const [status, setStatus] = useState<{[key:string]:string}>({})
  const {changeOrderStatus} = useChangeOrderStatus()
  const {deleteOrder,isPending} = useDeleteOrder()

  useEffect(() => {
    if (Order) {
      setSellerOrder(Order.order)
      const initialStatus = Order.order.reduce((acc:any,order:SellerOrderType)=>{
        acc[order.Order.id] = order.Order.status 
        return acc;
      },{})

      setStatus(initialStatus)
    }
  }, [Order])

  const statusInput = [
    { name: "Shipped", value: "SHIPPED" },
    { name: "Delievered", value: "DELIEVERED" },
    { name: "Cancelled", value: "CANCELED" },
    { name: "Paid", value: "PAID" },
    { name: "Placed", value: "PLACED" }
  ]
  console.log(Order)
  const handleChangeStatus = async (value: string,id:string) => {
      console.log(value,id)
     setStatus((prevState)=>({
       ...prevState,
       [id]:value
     }))
     try{
      await changeOrderStatus({id:id,status:value})
     }catch(error){
       console.log(error)
     }
  }

  const handleDeleteOrder = async (id:string) => {
     try{
      await deleteOrder(id)
     }catch(error){
      console.log(error)
     }
  }
  return (
    <div className='w-full py-10 lg:px-3'>
      <Card className='w-full px-3 md:px-5 py-4'>
        <div className='w-full flex justify-between items-center mb-3'>
          <h4 className='text-[18px] font-medium text-neutral-B900'>Orders</h4>
        </div>
        {
          Order?.order.length === 0 ? <div className='w-full flex flex-col gap-4 justify-center items-center h-min-[50vh]'>
          <HardDrive className='w-14 h-11 text-neutral-B600' />
          <p className='text-neutral-B500 font-medium text-[14px]'>
            No order Yet, No one has purshase any of your products from your store. 
          </p>
        </div> :
          <Table>
          <TableCaption>
            <PaginationSelector page={Order?.currentPage || 1}
              onPageChange={setPage} pages={Order?.totalPages || 1} />
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] bodyText">
                <ArrowUpDown className=" w-3 h-3" />
              </TableHead>
              <TableHead className='bodyText'>Order</TableHead>
              <TableHead className='bodyText'>Date</TableHead>
              <TableHead className='bodyText'>Total</TableHead>
              <TableHead className='bodyText'>Status</TableHead>
              <TableHead className="text-right bodyText">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {
              isLoading ? <>
                {
                  [1, 2, 3, 4, 5, 6].map((skeleton, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={6}>
                        <Skeleton className='w-full h-[40px] bg-neutral-W100 rounded-lg' />
                      </TableCell>
                    </TableRow>
                  ))
                }
              </> : <>
                {
                  sellerOrder?.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className='text-left'>
                        <Image src={order.product.images[0]} alt='product-image' width={35} height={35}
                          className='rounded-lg shadow-md object-contain' />
                      </TableCell>
                      <TableCell className='bodyText w-fit min-w-[150px]'>
                        {order.product.name}
                      </TableCell>
                      <TableCell className="bodyText min-w-[80px]">
                        {moment(order.createdAt).format("LL")}
                      </TableCell>
                      <TableCell className="bodyText">
                        $ {order.quantity * parseInt(order.product.price)}
                      </TableCell>
                      <TableCell className="bodyText w-fit">
                        <Select value={status[order.Order.id]} 
                        onValueChange={(value)=>handleChangeStatus(value,order.Order.id.toString())}>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="status" />
                          </SelectTrigger>
                          <SelectContent>
                            {statusInput.map((select, index) => (
                              <SelectItem value={select.value} key={index}>
                                {select.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className='text-right'>
                        <Popover>
                          <PopoverTrigger>
                            <Ellipsis className="w-5 h-5" />
                          </PopoverTrigger>
                          <PopoverContent className='w-fit flex flex-col gap-2 text-[12px]'>
                            <DeleteAlert title='Order' id={order.id.toString()}
                              onDelete={handleDeleteOrder} isDeleting={isPending} />
                            <Separator />
                            <SellerDetailDialog order={order} />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </>
            }
          </TableBody>
        </Table>
        }
      </Card>
    </div>
  )
}

export default OrderTab