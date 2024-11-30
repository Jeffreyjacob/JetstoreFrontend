import { useLogout } from '@/api/AuthApi'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { RemoveUser } from '@/state/userSlice'
import { CircleUser } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Dropdown = () => {
    const userInfo = useAppSelector((state)=>state.user.user)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const {logOut} = useLogout()
      const handleLogout = async ()=>{
         try{
           await logOut()
           dispatch(RemoveUser())
           localStorage.removeItem('token')
           router.push("/")
         }catch(error){
            console.log(error)
         }
      }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <CircleUser className='w-8 h-8 text-neutral-B500'/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                       Dashboard
                    </Link>
                </DropdownMenuItem>
                 {
                    userInfo?.role === "SELLER" && (
                        <>
                         <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/sellerdashboard">
                            Seller Dashboard
                            </Link>
                        </DropdownMenuItem>
                        </>
                    )
                 }
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className='focus:text-white focus:bg-neutral-B900/90'>
                  <Button className='w-full' onClick={handleLogout}>
                     Logout
                  </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default Dropdown