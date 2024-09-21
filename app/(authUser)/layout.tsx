"use client"
import { useAuthUser } from '@/api/UserApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { AddUser, RemoveUser } from '@/state/userSlice'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../redux'

const AuthUserlayout = ({ children }: { children: React.ReactNode }) => {

    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
    const userInfo = useAppSelector((state) => state.user.user)
    const { authUser, isLoading, isRefetching, refetch } = useAuthUser()
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "" as string


    useEffect(() => {
        const fetchUser = async () => {
            if (isAuthenticated) {
                  dispatch(AddUser(authUser));
            } else {
                dispatch(RemoveUser());
                router.push('/login');
            }
        };
        refetch()
        fetchUser();
    },[authUser, dispatch, router,refetch]);

    console.log(userInfo)

    if (isLoading || isRefetching) {
        return <div className='w-full min-h-[100vh] flex justify-center items-center'>
            <Loader2 className=' animate-spin w-5 h-5' />
        </div>
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default AuthUserlayout