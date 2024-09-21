import { ChevronRight } from 'lucide-react'
import React from 'react'
type Props = {
    title:string
}

const Header = ({title}:Props) => {
  return (
    <div className='w-full bg-neutral-W100 h-[120px] flex flex-col justify-center items-center'>
         <div className='max-w-5xl px-5 md:px-7 xl:px-1 w-full flex flex-col gap-3'>
             <h3 className='text-[24px] font-bold'>{title}</h3>
             <div className='flex gap-2 items-center '>
             <p className='bodyText text-neutral-B500'>Ecommerce</p>
             <ChevronRight className='w-4 h-4 text-neutral-B400'/>
             <p className='bodyText text-neutral-B900'>{title}</p>
             </div>
         </div>
    </div>
  )
}

export default Header