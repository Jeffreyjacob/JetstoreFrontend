"use client"
import { useGetProductById, useGetProductReview, useRelatedProduct } from '@/api/ProductApi'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronRight, Ellipsis, Heart, Loader2, Star } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import SizeField from '@/components/shared/SizeField'
import ColorField from '@/components/shared/ColorField'
import QualityField from '@/components/shared/QualityField'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import ReviewForm from '@/components/shared/forms/ReviewForm'
import ReviewCard from '@/components/shared/ReviewCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import SelectField from '@/components/shared/SelectButton/SelectField'
import ProductCard from '@/components/shared/Product/ProductCard'
import { useAddCart } from '@/api/CartApi'
import { AddCart, AddWishList } from '@/state/userSlice'
import { useAddWishlist } from '@/api/WishlistApi'

const Page = () => {
    const { id } = useParams()
    const { getProductById, isLoading } = useGetProductById(id as string)
    const userInfo = useAppSelector((state) => state.user.user)
    const dispatch = useAppDispatch()
    const [sortBy, setSortBy] = useState("")
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
    const { getProductReview, reviewLoading } = useGetProductReview({ id: id as string, sortBy })
    const {relatedProduct,isLoading:isLoadingRelatedProduct} = useRelatedProduct(id as string)
    const {addCart,isPending} = useAddCart()
    const {addWishlist,isPending:addingWishlist} = useAddWishlist()

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    const sortByInput = [
        { name: "Newest", value: "asc" },
        { name: "Oldest", value: "desc" },
    ]

    const [size, setSize] = useState<string[]>([])
    const [color, setColor] = useState<string[]>([])
    const [quantity, setQuantity] = useState(1)

    const handleAddCart = async ()=>{
       try{
         const response = await addCart({
            productId:parseInt(id.toString()),
            quantity:quantity,
            selectedSize:size[0],
            selectedColor:color[0]
         })
         dispatch(AddCart(response.cart))
       }catch(error){
           console.log(error)
       }
    }
    const handleAddWishList = async ()=>{
        try{
         const response = await addWishlist(parseInt(id.toString()))
         dispatch(AddWishList(response.wishlist))
         console.log(response)
        }catch(error){
            console.log(error)
        }
    }
    
    return (
        <div className='flex flex-col justify-center items-center w-full'>
            <div className='w-full h-full max-w-5xl px-5 md:px-7 xl:px-3'>
                {
                    isLoading ?
                        <div className="mb-20 h-full py-10 w-full">
                            <div className="flex flex-col lg:flex-row w-full h-full gap-10">
                                <div className="flex w-full lg:w-1/2">
                                    <Skeleton className="w-full h-[300px] lg:h-[350px] rounded-lg" />
                                </div>
                                <div className="flex w-full lg:w-1/2 h-full">
                                    <Skeleton className="w-full h-[300px] lg:h-[350px] rounded-lg" />
                                </div>
                            </div>
                            <Skeleton className="w-full h-[80px] mt-10" />
                        </div>
                        : <div className='mb-20 h-full py-10 w-full '>
                            <div className="flex  gap-3 py-5 text-[14px] items-center">
                                <h4 className=" font-medium text-Neutral-B500">Ecommerce</h4>
                                <ChevronRight className="w-4 h-4 text-Neutral-B500" />
                                <span className=" text-Neutral-B900 font-medium">
                                    {getProductById?.product.name}
                                </span>
                            </div>

                            <div className='w-full grid md:grid-cols-2 gap-7 md:gap-12 h-full mt-4'>
                                {/**Left Side */}
                                <Carousel plugins={[plugin.current]}
                                    onMouseEnter={plugin.current.stop}
                                    onMouseLeave={plugin.current.reset}
                                    className='w-[534p] h-[450px]  rounded-xl shadow-md bg-neutral-W100 py-5'>
                                    <CarouselContent>
                                        {
                                            getProductById?.product.images.map((image) => (
                                                <CarouselItem className='flex justify-center items-center  '>
                                                    <Image src={image} alt='product-image'
                                                        width={300} height={300} />
                                                </CarouselItem>
                                            ))
                                        }
                                    </CarouselContent>
                                </Carousel>

                                <div className='w-full flex flex-col gap-4'>
                                    {/**Right side */}
                                    <h4 className='text-[24px] font-semibold'>
                                        {getProductById?.product.name}
                                    </h4>
                                    <div className='flex gap-4'>
                                        <div className='bg-neutral-W100 p-2 flex justify-center items-center rounded-3xl text-[12px] text-neutral-B500'>
                                            {getProductById?.product.reviews.length} Reviews
                                        </div>
                                        {
                                            getProductById?.product.quantityAvaliable == 0 ? <div className='p-3 rounded-3xl bodyText text-white text-[12px] opacity-50 bg-green-500'>
                                                OUT OF STOCK
                                            </div> : <div className='bg-green-500  p-3 rounded-3xl bodyText text-white text-[12px]'>
                                                IN STOCK
                                            </div>
                                        }
                                    </div>
                                    <h4 className='text-[18px] text-neutral-B900 font-semibold'>
                                        $ {getProductById?.product.price}
                                    </h4>

                                    <div>
                                        <Label className='bodyText text-neutral-B500 uppercase mb-7'>
                                            Available Colors
                                        </Label>
                                        <ColorField value={color} onChange={setColor} />
                                    </div>

                                    <div>
                                        <Label className='bodyText text-neutral-B500 uppercase py-3'>
                                            Select Size
                                        </Label>
                                        <SizeField value={size} onChange={setSize}
                                            sizeOption={getProductById?.product.size || []} />
                                    </div>

                                    <div className='mt-5'>
                                        <Label className='bodyText text-neutral-B500 uppercase py-3'>
                                            Quantity
                                        </Label>
                                        <QualityField value={quantity}
                                            onChange={setQuantity}
                                            availableProduct={getProductById?.product.quantityAvaliable || 0} />
                                    </div>
                                    <div className='flex gap-4'>
                                        {
                                            ((getProductById?.product.quantityAvaliable === 0) || !isAuthenticated || (userInfo?.id === getProductById?.product.userId || 0)) ?
                                                <Button className='w-[280px] h-[40px]' disabled>
                                                    {isAuthenticated ? "Add to  Cart":"Login to Add to Cart"}
                                                </Button> :
                                                <Button className='w-[280px] h-[40px]' disabled={isPending} onClick={handleAddCart}>
                                                    {
                                                        isPending ? "Adding...":"Add to Cart"
                                                    }
                                                </Button>
                                        }
                                        {isAuthenticated && 
                                        <Button 
                                        variant={userInfo?.wishlist.some((wishlist)=>wishlist.productId === parseInt(id.toString())) ? "default":"outline"}
                                         className='w-fit' onClick={handleAddWishList}>
                                            {
                                                addingWishlist ? <Loader2 className={userInfo?.wishlist.some((wishlist)=>wishlist.productId === parseInt(id.toString())) ? "text-white w-4 h-4 animate-spin":"text-neutral-900 w-4 h-4 animate-spin"}/>: 
                                                <Heart className={`w-4 h-4 ${
                                                    userInfo?.wishlist.some((wishlist)=>wishlist.productId === parseInt(id.toString())) ? "text-white":"text-neutral-B900" 
                                                }` }/>
                                            }
                                        </Button>
                                        }
                                    </div>
                                </div>

                            </div>

                            <div className='mt-12'>
                                <Tabs defaultValue="details">
                                    <TabsList>
                                        <TabsTrigger value="details" className='flex gap-2 '>
                                            <Ellipsis className='w-4 h-4 text-neutral-B900' />
                                            Details
                                        </TabsTrigger>
                                        <TabsTrigger value="reviews" className='flex gap-2 '>
                                            <Star className='w-4 h-4 text-neutral-B900' />
                                            Reviews
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="details" className='max-w-[550px]'>
                                        <p className='bodyText mt-7'>{getProductById?.product.description}</p>
                                    </TabsContent>
                                    <TabsContent value="reviews">
                                        <div className='flex flex-col gap-4'>
                                            <h4 className='text-[16px] font-semibold text-neutral-B900'>Reviews</h4>
                                            <div className='w-full flex justify-between'>
                                                <>
                                                    {
                                                        isAuthenticated ? <ReviewForm id={id as string} /> : <Button className='w-fit' disabled >
                                                            Login to Leave a review
                                                        </Button>
                                                    }
                                                </>
                                                <SelectField value={sortBy} placeHolder='SortBy'
                                                 onChange={setSortBy} data={sortByInput} className='w-fit'/>

                                            </div>
                                            <Separator />

                                            <div className='flex flex-col gap-4 mt-5'>
                                                {
                                                    reviewLoading ? <div>
                                                        <Skeleton className='h-[100px]' />
                                                        <Skeleton className='h-[100px]' />
                                                    </div> : <ScrollArea className='h-[200px] flex flex-col w-full'>
                                                        {
                                                            getProductReview?.review.length === 0 ?
                                                                <div className='w-full h-full flex justify-center items-center'>
                                                                    <p className='text-[14px] font-semibold text-neutral-B500'>
                                                                        No Review
                                                                    </p>
                                                                </div> : <>
                                                                    {getProductReview?.review.map((review) => (
                                                                        <ReviewCard review={review} key={review.id} />
                                                                    ))}
                                                                </>
                                                        }
                                                    </ScrollArea>
                                                }
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>

                            <div className='mt-7 flex flex-col md:justify-start justify-center w-full'>
                                <h4 className='text-[24px] font-bold text-neutral-B900 w-full text-center md:text-start'>You might also like</h4>
                                <span className='text-neutral-B300 uppercase my-4 text-[12px] w-full text-center md:text-start'>
                                    Similar Products
                                </span>
                                 <div className='mt-7 w-full grid md:grid-cols-2 lg:grid-cols-3 max-lg:gap-3 justify-center md:justify-start'>
                                    {
                                    isLoadingRelatedProduct ? <>
                                      {[1,2,4].map((skeleton)=>(
                                        <Skeleton key={skeleton} className='w-[238px] h-[312px]'/>
                                      ))}
                                    </>:
                                     <>
                                     {
                                      relatedProduct?.productByCategory.slice(0,3).map((product)=>(
                                        <ProductCard product={product} key={product.id}/>
                                      )) 
                                    }
                                     </>
                                    }
                                 </div>
                            </div>

                        </div>
                }
            </div>
        </div>
    )
}

export default Page