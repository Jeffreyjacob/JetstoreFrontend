import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API_BASE_URL } from "./AuthApi"
import { toast } from "sonner"
import { BuyerOrderType, SellerOrderType } from "@/lib/type"

type OrderInput = {
    address:String,
}

type SellerOrderResponse = {
order:SellerOrderType[]
currentPage:number
totalOrder:number
totalPages:number
}

type ChangeStatusType = {
    id:string,
    status:string
}

export const useCreateCheckout = ()=>{
    const CreateCheckout = async (OrderInput:OrderInput)=>{
        const res = await fetch(`${API_BASE_URL}/api/order/createCheckout`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(OrderInput)
        })

        const data = await res.json()

        if(!res.json){
            throw new Error(data.message)
        }

        return data
    }

    const {mutateAsync:createCheckout,isPending} = useMutation({
        mutationFn:CreateCheckout,
        onError:(error)=>{
          toast.error(error.message)
        }
    })

    return {createCheckout,isPending}
}

export const useGetSellerOrder = (page:number)=>{
    const params = new URLSearchParams()
    params.set("page",page.toString())
    const GetSellerOrder = async ():Promise<SellerOrderResponse> =>{
        const res = await fetch(`${API_BASE_URL}/api/order/sellerOrder?${params.toString()}`,{
            method:"GET",
            credentials:"include"
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {data:Order,isLoading} = useQuery({
        queryKey:["getSellerOrder",page],
        queryFn:GetSellerOrder
    })

    return {Order,isLoading}
}

export const useGetBuyerOrder = ()=>{
     const GetBuyerOrder = async ():Promise<{order:BuyerOrderType[]}>=>{
        const res = await fetch(`${API_BASE_URL}/api/order/buyerOrder`,{
            method:"GET",
            credentials:"include"
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
     }

     const {data:getBuyerOrder,isLoading} = useQuery({
        queryKey:["getBuyerOrder"],
        queryFn:GetBuyerOrder
     })

     return {getBuyerOrder,isLoading}
}

export const useChangeOrderStatus = ()=>{
    const ChangeOrderStatus = async (ChangeStatusInput:ChangeStatusType)=>{
        const res = await fetch(`${API_BASE_URL}/api/order/changeOrderStatus/${ChangeStatusInput.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({status:ChangeStatusInput.status})
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:changeOrderStatus,isPending} = useMutation({
       mutationFn:ChangeOrderStatus,
       onSuccess:()=>{
          toast.success("Order Status updated!")
       },
       onError:(error)=>{
        toast.error(error.message)
       }
    })

    return {changeOrderStatus,isPending}
}

export const useDeleteOrder = ()=>{
    const queryClient = useQueryClient()
    const DeleteOrder = async (id:string)=>{
        const res = await fetch(`${API_BASE_URL}/api/order/deleteOrder/${id}`,{
            method:"DELETE",
            credentials:"include"
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:deleteOrder,isPending} = useMutation({
        mutationFn:DeleteOrder,
        onSuccess:()=>{
            toast.success("Order deleted!")
            queryClient.invalidateQueries({queryKey:["getSellerOrder"]})
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {deleteOrder,isPending}
}