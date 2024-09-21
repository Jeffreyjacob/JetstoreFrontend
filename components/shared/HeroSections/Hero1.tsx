
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react"
import HeroImage from '@/public/Mastercard.png';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero = () => {
  return (
     <div className=" relative bg-neutral-W100">
     <div className="flex flex-col-reverse md:flex-row max-w-6xl px-5 md:px-7 lg:px-0   max-md:py-10 h-full items-center justify-center ">
         <div className="flex flex-col gap-2 w-full md:w-1/2 max-md:mt-5 justify-center items-center">
             <div className="flex flex-col">
                 <span className="text-[26px] lg:text-[32px]  font-semibold tracking-tight">Fresh Arrivals Online</span>
                 <span className="text-[14px] font-normal text-neutral-B600">Discover Our Newest Collection Today.</span>
             </div>
             <Button className="flex gap-2 bg-neutral-B900 text-neutral-W900 w-[183px] mt-7">
                 View Collection
                 <MoveRight className="w-4 h-4 text-neutral-W900" />
             </Button>
         </div>
         <div className=" w-full md:w-1/2">
             <AspectRatio ratio={16 / 16} style={{
                 backgroundImage: `url(${HeroImage})`,
                 backgroundSize: "cover"
             }} className="relative">
                 <div className=" absolute inset-0 w-full flex flex-col justify-end pointer-events-none">
                     <div className="h-1/4 bg-gradient-to-t from-neutral-W900 to-transparent" />
                 </div>
             </AspectRatio>
         </div>
     </div>
 </div>

  )
}

export default Hero