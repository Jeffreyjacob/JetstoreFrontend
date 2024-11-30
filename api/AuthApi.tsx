
import { LoginInputType, ResetPasswordType, SignUpInputType } from "@/lib/type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const  API_BASE_URL =  process.env.NEXT_PUBLIC_API_BASE_URL

export const useSignUp = ()=>{
    const queryClient = useQueryClient()
    const SignUp = async (SignUpInput:SignUpInputType)=>{
        const res = await fetch(`${API_BASE_URL}/api/auth/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(SignUpInput)
        })

        const data = await res.json()
        if(!res.ok){
            console.log(data)
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:signup,isPending} = useMutation({
        mutationFn:SignUp,
        onSuccess:()=>{
            toast.success("User registered!")
            queryClient.invalidateQueries({queryKey:["getAuthUser"]})
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {signup,isPending}
}

export const useLogin = ()=>{
     const queryClient = useQueryClient()
    const Login = async(LoginInput:LoginInputType)=>{
        const res = await fetch(`${API_BASE_URL}/api/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(LoginInput)
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:login,isPending} = useMutation({
        mutationFn:Login,
        onSuccess:()=>{
            toast.success("Login Successfully!")
            queryClient.invalidateQueries({queryKey:["getAuthUser"]})
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })
   return {login,isPending}
}

export const useForgetPassword = ()=>{
    const ForgetPassword = async (email:string)=>{
        const res = await fetch(`${API_BASE_URL}/api/auth/forgetPassword`,{
             method:"POST",
             headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({email})
        })

        const data = await res.json()

        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:forgetPassword,isPending} = useMutation({
        mutationFn:ForgetPassword,
        onSuccess:()=>{
            toast.success("Reset link has been sent to your email")
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return {forgetPassword,isPending}
}

export const useResetPassword  = ()=>{
    const ResetPassword = async(ResetPasswordInput:ResetPasswordType)=>{
        const res = await fetch(`${API_BASE_URL}/api/auth/resetPassword/${ResetPasswordInput.resetToken}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({password:ResetPasswordInput.password})
        })

        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data 
    }

    const {mutateAsync:resetPassword,isPending} = useMutation({
         mutationFn:ResetPassword,
         onSuccess:()=>{
            toast.success("Password changed!")
         },
         onError:(error)=>{
            toast.error(error.message)
         }
    })

    return {resetPassword,isPending}
}


export const useLogout = ()=>{
    const queryClient = useQueryClient()
    const Logout = async ()=>{
        const res = await fetch(`${API_BASE_URL}/api/auth/logout`,{
            method:"POST",
            credentials:"include"
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }

    const {mutateAsync:logOut} = useMutation({
        mutationFn:Logout,
        onSuccess:()=>{
            toast.success("logout successful!")
            queryClient.invalidateQueries({queryKey:["getAuthUser"]})
            
        }
    })

    return {logOut}
}