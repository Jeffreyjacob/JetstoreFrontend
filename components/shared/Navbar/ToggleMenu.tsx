import { useLogout } from '@/api/AuthApi'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { RemoveUser } from '@/state/userSlice'
import { AlignJustify, CircleUser, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ToggleMenu = () => {
    const userInfo = useAppSelector((state)=>state.user.user)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const NavLink = [
        { name: "Home", href: "/" },
        { name: "Categories", href: "/categories" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
      ]
      const [open, setOpen] = useState(false);
      const handleClose = ()=>{
          setOpen(false)
      }
      const {logOut} = useLogout()
      const handleLogout = async ()=>{
         try{
           await logOut()
           dispatch(RemoveUser())
           setOpen(false)
           router.push("/")
         }catch(error){
            console.log(error)
         }
      }
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
            <AlignJustify className='text-neutral-500 w-6 h-6 md:w-8 md:h-8' />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className='flex gap-2 items-center'>
                    <CircleUser className='w-6 h-6 text-neutral-B500'/>
                    <p className='text-[19px] font-bold capitalize'>{userInfo?.fullname}</p>
                    </SheetTitle>
                </SheetHeader>
                 <Separator className='mt-4 mb-4'/>
                 
                 <div className='flex flex-col gap-1'>
                 <Link href="/dashboard" onClick={handleClose} className='bodyText px-4 py-3 hover:bg-neutral-B100 rounded-xl '>
                   Dashboard
                 </Link>
                 {
                    userInfo?.role === "SELLER" && (
                        <Link href="/sellerdashboard" onClick={handleClose} className='bodyText px-4 py-3 hover:bg-neutral-B100 rounded-xl '>
                            Seller Dashboard
                        </Link>
                    )
                 }
                 </div>
                <div className='w-full flex flex-col gap-1'>
                {
                    NavLink.map((nav)=>(
                       <Link className='bodyText px-4 py-3 hover:bg-neutral-B100 rounded-xl ' key={nav.name} onClick={handleClose} href={nav.href}>
                          {nav.name}
                       </Link>
                    ))
                  }
                </div>
                <Button className='w-full mt-2' onClick={handleLogout}>
                    Logout
                </Button>
            </SheetContent>
        </Sheet>

    )
}

export default ToggleMenu