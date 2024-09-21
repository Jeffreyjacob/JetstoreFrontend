import { cn } from '@/lib/utils'
import React, { useState } from 'react'

type Props = {
    value:string[],
    onChange:(size:string[])=>void,
    sizeOption:string[]
}

const SizeField = ({value,onChange,sizeOption}:Props) => {
    const handleSelectSize = (size:string)=>{
        let newSizeSelection =  [...value]
        if(newSizeSelection.includes(size)){
             newSizeSelection = newSizeSelection.filter((newsize) => newsize !== size);
        }else{
            newSizeSelection.push(size)
        }
        onChange(newSizeSelection)
    }
  return (
    <div className='w-full flex gap-3 flex-nowrap'>
         {
            sizeOption.map((size:any)=>(
                <div key={size} onClick={()=>handleSelectSize(size)}
                className={cn(`px-3 cursor-pointer flex justify-center items-center bodyText h-[40px] border  border-neutral-B100 rounded-lg`,{
                    "border-[2px] border-neutral-B900":value.includes(size)
                })}>
                   {size}
                </div>
            ))
         }
    </div>
  )
}

export default SizeField