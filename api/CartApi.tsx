import { useMutation } from "@tanstack/react-query"
import { API_BASE_URL } from "./AuthApi"
import { toast } from "sonner"


type CartInput = {
    productId:number,
    quantity:number,
    selectedSize:string
    selectedColor:string
}

const token = localStorage.getItem('token')

export const useAddCart = ()=>{
    const AddCart = async (cartInput:CartInput)=>{
        const res = await fetch(`${API_BASE_URL}/api/cart/addCart`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
                 "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(cartInput)
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:addCart,isPending} = useMutation({
        mutationFn:AddCart,
        onSuccess:()=>{
            toast.success("Cart Added")
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {addCart,isPending}
}

export const useChangeQuantity = ()=>{
    const ChangeQuantity = async ({quantity,id}:{quantity:number,id:string})=>{
        const res = await fetch(`${API_BASE_URL}/api/cart/changeQuantity/${id}`,{
            method:"PUT",
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
                 "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify({quantity})
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:changeQuantity,isPending} = useMutation({
        mutationFn:ChangeQuantity
    })

    return {changeQuantity,isPending}
}

export const useRemoveCart =  ()=>{
    const RemoveCart = async (id:string)=>{
        const res = await fetch(`${API_BASE_URL}/api/cart/deleteCart/${id}`,{
            method:"DELETE",
            credentials:"include",
            headers:{
                 "Authorization": `Bearer ${token}`
            }
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:removeCart,isPending} = useMutation({
        mutationFn:RemoveCart,
        onSuccess:()=>{
            toast.success("Item Removed!")
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })
    return {removeCart,isPending}
}