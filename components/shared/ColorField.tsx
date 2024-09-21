import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    value:string[],
    onChange:(color:string[])=>void
}

 const colorData = [
    {name:"#4078FF",value:"BLUE"},
    {name:"#F3B40A",value:"YELLOW"},
    {name:"#057234",value:"GREEN"},
    {name:"#000000",value:"BLACK"},
    {name:"#ff0000",value:"RED"},
    {name:"#F6F6F6",value:"WHITE"}

 ]
const ColorField = ({value,onChange}:Props) => {
    const handleSelectColor = (color:string)=>{
        let newSelectedColor = [...value]
        if(newSelectedColor.includes(color)){
             newSelectedColor = newSelectedColor.filter((newcolor)=> newcolor !==color)
        }else{
            newSelectedColor.push(color)
        }
        onChange(newSelectedColor)
     }
  return (
    <div className='w-full flex gap-3'>
       {
        colorData.map((color)=>(
            <div className={cn(`w-[40px] h-[40px]  rounded-full cursor-pointer`,{
               "border-[2px] border-neutral-B300 ":value.includes(color.value) 
            })} key={color.value}
            onClick={()=>handleSelectColor(color.value)} style={{
                backgroundColor:color.name
            }}/>
        ))
       }
    </div>
  )
}

export default ColorField