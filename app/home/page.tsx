"use client"
import { useGetAllProduct } from '@/api/ProductApi';
import Hero from '@/components/shared/HeroSections/Hero1'
import SecondHero from '@/components/shared/HeroSections/SecondHero';
import NewsLetter from '@/components/shared/NewsLetter';
import ProductCard from '@/components/shared/Product/ProductCard';
import { Skeleton } from '@/components/ui/skeleton'
import { Award, Shield, Truck } from 'lucide-react'
import React from 'react'

const HomePage = () => {
  const { getAllProducts, fetchingProduct } = useGetAllProduct()
  return (
    <div className='w-full h-full'>
      <Hero />
      {/**Second section */}
      <div className="max-w-6xl w-full mx-auto flex flex-col justify-center items-center py-10  px-5 md:px-7 xl:px-4">
        <div className="max-sm:flex-col flex justify-center items-center w-full gap-4 ">
          {/**Free Shipping */}
          <div className="flex flex-col w-[250px] h-[270px] items-start justify-center gap-3">
            <div className="p-4 rounded-full bg-neutral-W100 w-fit">
              <Truck className="w-5 h-5 text-Neutral-B900" />
            </div>
            <span className=" text-[16px] font-semibold  text-Neutral-B500">Free Shipping</span>
            <span className="text-[14px] font-normal text-Neutral-B500">
              Upgrade your style today and get FREE shipping on all orders! Don't miss out.
            </span>
          </div>

          {/**Satifaction Gurantee*/}
          <div className="flex flex-col w-[250px] h-[270px] items-start justify-center gap-3">
            <div className="p-4 rounded-full bg-neutral-W100 w-fit">
              <Award className="w-5 h-5 text-Neutral-B900" />
            </div>
            <span className=" text-[16px] font-semibold text-Neutral-B500">Satisfaction Guarantee</span>
            <span className="text-[14px] font-normal text-Neutral-B500">
              Shop confidently with our Satisfaction Guarantee: Love it or get a refund.
            </span>
          </div>

          {/**Secure Payment */}
          <div className="flex flex-col w-[250px] h-[270px] items-start justify-center gap-3">
            <div className="p-4 rounded-full bg-neutral-W100 w-fit">
              <Shield className="w-5 h-5 text-Neutral-B900" />
            </div>
            <span className=" text-[16px] font-semibold text-Neutral-B500">Secure Payment</span>
            <span className="text-[14px] font-normal text-Neutral-B500">
              Your security is our priority. Your payments are secure with us.
            </span>
          </div>
        </div>

        <div className="text-center mt-12 mb-10">
          <h5 className="text-[12px] font-normal text-Neutral-B300">
            SHOP NOW
          </h5>
          <h3 className="text-[24px] font-bold text-Neutral-B900">
            Best Selling
          </h3>
        </div>

        <div className="flex justify-center items-center w-full py-10 mb-16">
          {
            fetchingProduct ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                  [1, 2, 3, 4].map((skeleton) => (
                    <Skeleton className="w-[238px] h-[312px]" key={skeleton} />
                  ))
                }
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 ">
                {
                  getAllProducts?.product.slice(0, 4).map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))
                }
              </div>
            )
          }
        </div>
      </div>


      {/**second hero section*/}
      <SecondHero />
      <div className="flex mx-auto justify-center items-center w-full py-10 mb-16">
        {
          fetchingProduct ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {
                [1, 2, 3, 4].map((skeleton) => (
                  <Skeleton className="w-[238px] h-[312px]" key={skeleton} />
                ))
              }
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {
                getAllProducts?.product.slice(4, 8).map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))
              }
            </div>
          )
        }
      </div>

      <NewsLetter />
    </div>
  )
}

export default HomePage