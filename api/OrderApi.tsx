import { useMutation } from "@tanstack/react-query"
import { API_BASE_URL } from "./AuthApi"
import { toast } from "sonner"

type OrderInput = {
    address:String
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