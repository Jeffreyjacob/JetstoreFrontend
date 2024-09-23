import { useMutation, useQuery } from "@tanstack/react-query"
import { API_BASE_URL } from "./AuthApi"
import { toast } from "sonner"
import { AddressInputType } from "@/components/shared/forms/AddressForm"
import { UserType } from "@/lib/type"


export const useAuthUser = ()=>{
    const AuthUser = async ()=>{
        const res = await fetch(`${API_BASE_URL}/api/user/authUser`,{
            method:"GET",
            credentials:"include"
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {data:authUser,isLoading,refetch,isRefetching} = useQuery({
        queryKey:["getAuthUser"],
        queryFn:AuthUser
    })

    return {authUser,isLoading,refetch,isRefetching}
}

export const useUpdateUserInfo = ()=>{
    const UpdateUserInfo = async (updateUserInput:FormData)=>{
        const res = await fetch(`${API_BASE_URL}/api/user/updateUserProfile`,{
            method:"PUT",
            credentials:"include",
            body:updateUserInput
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:updateUserInfo,isPending} = useMutation({
        mutationFn:UpdateUserInfo,
        onSuccess:()=>{
            toast.success("Information Updated!")
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {updateUserInfo,isPending}
}

export const useAddaddress = ()=>{
    const AddAddress = async (addressInput:AddressInputType)=>{
        const res = await fetch(`${API_BASE_URL}/api/user/addAddress`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(addressInput)
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:addAddress,isPending} = useMutation({
        mutationFn:AddAddress,
        onSuccess:()=>{
            toast.success("Address Added!")
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {addAddress,isPending}
}

export const useRemoveAddress = ()=>{
    const RemoveAddress = async (id:string)=>{
        const res = await fetch(`${API_BASE_URL}/api/user/removeAddress/${id}`,{
            method:"DELETE",
            credentials:"include"
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:removeAdress} = useMutation({
        mutationFn:RemoveAddress,
        onSuccess:()=>{
            toast.success("Address Removed!")
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {removeAdress}
}