import { useMutation } from "@tanstack/react-query"
import { API_BASE_URL } from "./AuthApi"
import { toast } from "sonner"




export const useAddWishlist = ()=>{
    const token = localStorage.getItem('token')
    const AddWishlist = async (productId:number)=>{
        const res = await fetch(`${API_BASE_URL}/api/wishlist/addWishlit`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
                 "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify({productId})
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:addWishlist,isPending} = useMutation({
        mutationFn:AddWishlist,
        onSuccess:(data)=>{
            toast.success(data.message)
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })
    return {addWishlist,isPending}
}

export const useRemoveWishlist = ()=>{
    const token = localStorage.getItem('token')
    const RemoveWishList = async (id:string)=>{
        const res = await fetch(`${API_BASE_URL}/api/wishlist/removeWishlist/${id}`,{
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

    const {mutateAsync:removeWishlist,isPending} = useMutation({
        mutationFn:RemoveWishList,
        onSuccess:()=>{
            toast.success("Removed from wishlist!")
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {removeWishlist,isPending}
}