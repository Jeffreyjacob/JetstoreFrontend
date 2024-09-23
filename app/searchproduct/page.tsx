"use client"
import { useSearchProduct } from '@/api/ProductApi'
import Header from '@/components/shared/Header/Header'
import PaginationSelector from '@/components/shared/Pagination/PaginationSelector'
import ProductCard from '@/components/shared/Product/ProductCard'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductType } from '@/lib/type'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [searchInput, setSearchInput] = useState<{ searchTerm: string, page: number }>({
    searchTerm: "",
    page: 1
  })
  const [product, setProduct] = useState<ProductType[]>([])
  const { searchProduct, isLoading } = useSearchProduct({
    searchTerm: searchInput.searchTerm,
    page: searchInput.page.toString()
  })

  useEffect(() => {
    if (searchProduct) {
      setProduct(searchProduct.product)
    }
  }, [searchInput, searchProduct])

  const handleSearchTerm = (value: string) => {
    setSearchInput((prevState) => ({
      ...prevState,
      searchTerm: value
    }))
  }

  const handlePageChange = (SelectedPage: number) => {
    setSearchInput((prevState) => ({
      ...prevState,
      page: SelectedPage
    }))
  }
  return (
    <div className='w-full h-full'>
      <Header title='Search' />
      <div className='w-full flex justify-center items-center'>
        <div className='w-full h-full max-w-5xl px-5 md:px-7 xl:px-3 py-5 flex flex-col gap-4 mt-7'>
          <Input type='search' className='w-full sm:w-[600px] h-[45px] placeholder:text-neutral-B500'
            placeholder='Search Proudct' onChange={(e) => handleSearchTerm(e.target.value)} />
          <Label className='text-[14px] font-medium text-neutral-B500'>
            Showing 1-9 of {product.length} results.
          </Label>

          <div className='w-full max-w-[900px] grid sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-7 justify-center xl:justify-start'>
            {
              isLoading ? <>
                {
                  [1, 2, 3, 4].map((skeleton) => (
                    <Skeleton className="w-[238px] h-[312px]" key={skeleton} />
                  ))
                }
              </> : <>
                {
                  product.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))
                }
              </>
            }
          </div>

           {
            searchProduct?.product.length! > 0 && <div className='mt-7 w-full h-full flex justify-center items-center mb-10 '>
            <PaginationSelector page={searchProduct?.currentPage || 1}
              pages={searchProduct?.totalPage!}
              onPageChange={handlePageChange} />
          </div>
           }
        </div>
      </div>
    </div>
  )
}

export default Page