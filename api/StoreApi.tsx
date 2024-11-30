import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API_BASE_URL } from "./AuthApi"
import { toast } from "sonner"
import { StoreType } from "@/lib/type"


const token = localStorage.getItem('token')

export const useCreateStore = () => {
    const queryClient = useQueryClient()
    const CreateStore = async (storeInput: FormData) => {
        const res = await fetch(`${API_BASE_URL}/api/store/createStore`, {
            method: "POST",
            credentials: "include",
            body: storeInput,
            headers:{
                "Authorization": `Bearer ${token}` 
            }
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:createStore,isPending} = useMutation({
        mutationFn:CreateStore,
        onSuccess:()=>{
            toast.success("Store created!")
            queryClient.invalidateQueries({
                queryKey:["getStoreInfo"]
            })
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {createStore,isPending}
}

export const useGetStore = ()=>{
    const GetStore = async () =>{
        const res = await fetch(`${API_BASE_URL}/api/store/getStore`,{
             method:"GET",
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

    const {data:getStore,isLoading,refetch} = useQuery({
        queryKey:["getStoreInfo"],
        queryFn:GetStore
    })

    return {getStore,isLoading,refetch}
}

export const useEditStore = (id:string)=>{
    const queryClient = useQueryClient()
    const EditStore = async(storeInput:FormData)=>{
        const res =  await fetch(`${API_BASE_URL}/api/store/editStore/${id}`,{
            method:"PUT",
            credentials:"include",
            body:storeInput,
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

    const {mutateAsync:editSore,isPending} = useMutation({
        mutationFn:EditStore,
        onSuccess:()=>{
            toast.success("Stored Updated!")
            queryClient.invalidateQueries({
                queryKey:["getStoreInfo"]
            })
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {editSore,isPending}
}