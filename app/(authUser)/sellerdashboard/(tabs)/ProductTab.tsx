"use client"
import { useDeleteProduct, useGetProductByUserId } from '@/api/ProductApi'
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ProductByUser, ProductType } from '@/lib/type';
import { ArrowUpDown, Ellipsis, Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { debounce } from "lodash"
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ProductAlert from '@/components/shared/ProductAlert';
import PaginationSelector from '@/components/shared/Pagination/PaginationSelector';
import { Skeleton } from '@/components/ui/skeleton';


export type SearchTermType = {
  search: string,
  page: number
}

const ProductTab = () => {
  const [searchTerm, setSearchTerm] = useState<SearchTermType>({
    search: "",
    page: 1
  })
  const { getProductByuser, isLoading } = useGetProductByUserId(searchTerm)
  const { deleteProduct } = useDeleteProduct()
  const [products, setProducts] = useState<ProductType[]>()

  useEffect(() => {
    if (getProductByuser) {
      setProducts(getProductByuser.product)
    }
  }, [getProductByuser, searchTerm.search])

  console.log(products)

  const handleSearchTerm = debounce((searchTerm: string) => {
    setSearchTerm((prevState) => ({
      ...prevState,
      search: searchTerm
    }))
  }, 2000)

  const handleDeleteProduct = async (productId: string) => {
    console.log(productId)
    try {
      await deleteProduct(productId)
      setProducts((prevState) => prevState = prevState?.filter((products) => products.id.toString() !== productId))
    } catch (error) {
      console.log(error)
    }
  }

  const handlePageChange = (selectedPage: number) => {
    setSearchTerm((prevState) => ({
      ...prevState,
      page: selectedPage
    }))
  }
  return (
    <div className='w-full py-10 lg:px-3'>
      <Card className='w-full px-3 md:px-5 py-4'>
        <div className='w-full flex justify-between items-center mb-3'>
          <h4 className='text-[18px] font-medium text-neutral-B900'>Products</h4>
          <Input type='text' placeholder='search products'
            className='md:w-[200px] w-[150px]'
            onChange={(e) => handleSearchTerm(e.target.value)} />
        </div>
        <Table>
          <TableCaption>
            <PaginationSelector page={getProductByuser?.currentpage || 1}
              onPageChange={handlePageChange} pages={getProductByuser?.totalPage || 1} />
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] bodyText">
                <ArrowUpDown className=" w-3 h-3" />
              </TableHead>
              <TableHead className='bodyText'>Name</TableHead>
              <TableHead className='bodyText'>Price</TableHead>
              <TableHead className='bodyText'>Stock</TableHead>
              <TableHead className='bodyText'>Category</TableHead>
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
                  products?.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className='text-left'>
                        <Image src={product.images[0]} alt='product-image' width={35} height={35}
                          className='rounded-lg shadow-md object-contain' />
                      </TableCell>
                      <TableCell className='bodyText w-fit min-w-[150px]'>{product.name}</TableCell>
                      <TableCell className="bodyText min-w-[80px]">$ {product.price}</TableCell>
                      <TableCell className="bodyText">{product.quantityAvaliable}</TableCell>
                      <TableCell className="bodyText w-fit">{product.category}</TableCell>
                      <TableCell className="bodyText text-right">
                        <Popover>
                          <PopoverTrigger>
                            <Ellipsis className="w-5 h-5" />
                          </PopoverTrigger>
                          <PopoverContent className='w-fit'>
                            <ProductAlert id={product.id.toString()} onDelete={handleDeleteProduct} />
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
      </Card>

    </div>
  )
}

export default ProductTab