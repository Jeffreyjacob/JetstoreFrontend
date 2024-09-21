import { Card } from "@/components/ui/card"
import { ProductType } from "@/lib/type"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { setInterval } from "timers"


type Props = {
    product: ProductType,
}

const ProductCard = ({ product }: Props) => {
    const router = useRouter()
    const handleCheck = () => {
        router.push(`/productdetails/${product.id}`)
    }
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const imageCount = product.images.length;
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount); // Cycle through images
        }, 4000);
        return () => clearInterval(intervalId);
    }, [product.images.length]);
    return (
        <div>
            <Card className="bg-neutral-W100 w-[238px] h-[312px] cursor-pointer" onClick={handleCheck}>
                <Image src={product.images[currentImageIndex]} alt="image" className="w-full h-full rounded-xl transition-all duration-300" width={238} height={312} />
            </Card>
            <div className="flex flex-col gap-3 mt-5">
                <h5 className=" font-medium text-[14px] text-Neutral-B900 w-[230px]">{product.name}</h5>
                <div className="flex gap-6 items-center">
                    {
                        product.quantityAvaliable <= 0 ? <span className=" text-[12px] text-Neutral-B900 font-medium 
                    border-[1px] border-Neutral-B600 px-2 py-1 rounded-full opacity-20 ">
                            OUT OF STOCK
                        </span> : <span className=" text-[12px] text-Neutral-B900 font-medium 
                    border-[1px] border-Neutral-B600 px-2 py-1 rounded-full">
                            IN STOCK
                        </span>
                    }
                    <span className=" text-Neutral-B600 text-[14px] font-normal">${product.price}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard