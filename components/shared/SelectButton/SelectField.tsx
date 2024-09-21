import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

type Props = {
    data: {
        name: string,
        value: string
    }[],
    placeHolder: string,
    value: string,
    onChange: (value:string) => void
    className:string
}

function SelectField({data,placeHolder,value,onChange,className}: Props) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeHolder} />
            </SelectTrigger>
            <SelectContent>
              {data.map((select,index)=>(
                  <SelectItem value={select.value} key={index}>
                     {select.name}
                  </SelectItem>
              ))}
            </SelectContent>
        </Select>
    )
}

export default SelectField