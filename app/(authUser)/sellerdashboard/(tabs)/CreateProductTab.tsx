import ProductForm from '@/components/shared/forms/ProductForm'
import React from 'react'

const CreateProductTab = () => {
   const productDefault = {
    name:"",
    description:"",
    price:"",
    quantityAvaliable:"",
    color:[],
    category:"",
    images:undefined,
    size:[]
   }
  return (
    <div className='w-full py-10 lg:px-3'>
      <h4 className='text-[18px] font-medium text-neutral-B900'>Add Product</h4>
         <ProductForm formType="create" formInput={productDefault}/>
    </div>
  )
}

export default CreateProductTab