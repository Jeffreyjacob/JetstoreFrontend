"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import Logo from "@/public/Logomark.png"
import { LucideIcon, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import Dropdown from './DropdownMenu';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import ToggleMenu from './ToggleMenu';
import { Button } from '@/components/ui/button';
import { useAuthUser } from '@/api/UserApi';
import { AddUser, RemoveUser } from '@/state/userSlice';
import { toast } from 'sonner';

type NavLinkType = {
  name: string,
  href: string,
}

const Navbar = () => {
  const pathname = usePathname()
  const NavLink = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
  const router = useRouter()
  const [isScroll,setisScroll] = useState(false)
  const {authUser} = useAuthUser()
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/" as string

  useEffect(() => {
    
    const fetchUser = async () => {
        try {
            if (authUser) {
                dispatch(AddUser(authUser));
            } else {
                throw new Error('User not authenticated');
            }
        } catch (error) {
            dispatch(RemoveUser());
            toast.error("something went wrong")
        }
    };

    fetchUser();
}, [authUser, dispatch,router]);


console.log(redirect)

  useEffect(()=>{
     const handleScroll = ()=>{
          setisScroll(window.scrollY >10)
     }

     window.addEventListener("scroll",handleScroll)
     return ()=> window.removeEventListener("scroll",handleScroll)
  },[])

  return (
    <div className={cn(`sticky top-0 w-full z-50 py-4 bg-white/50 flex justify-center items-center transition-all duration-300 shadow-md`,{
       "backdrop-blur-lg":isScroll
    })}>
      <div className='w-full h-full flex justify-between max-w-6xl px-5 md:px-7 xl:px-1 items-center'>
        <div className='flex gap-2 items-center'>
          <Image src={Logo} alt='logo' className=' w-[40px] h-[40px] object-contain' />
          <p className='text-[20px] font-extrabold'>Ecommerce</p>
        </div>

        <div className='hidden lg:flex  gap-10'>
          <div className='flex gap-3 items-center'>
            {
              NavLink.map((nav: NavLinkType) => {
                const isActive = pathname === nav.href
                return (
                  <Link href={nav.href} className={cn(`bodyText text-neutral-B500`, {
                    isActive: "text-black"
                  })} key={nav.name}>
                    {nav.name}
                  </Link>
                )
              })
            }
          </div>
          <div className='flex gap-2 w-[173px] px-3 py-2 items-center border border-neutral-B100 rounded-xl'>
            <Search className='w-6 h-6 text-neutral-B300' />
            <Input type='text' placeholder='Search Products'
              className=' placeholder:text-neutral-B300 placeholder:text-[12px] border-none ring-0 shadow-none outline-none  ' />
          </div>
        </div>


        <div className='flex gap-6 items-center'>
          {/**Toggle Menu for small screen */}

          {
            isAuthenticated ? (
              <>
                 <ShoppingCart className='w-6 h-6 text-neutral-B500 cursor-pointer' onClick={()=>router.push("/cart")}/>
                <div className='hidden lg:flex gap-8 items-center'>
                  <Dropdown />
                </div>
                <div className='flex lg:hidden'>
                  <ToggleMenu/>
                </div>
              </>
            ) : (
              <div className='flex gap-3'>
                  <Button variant="outline"
                   onClick={()=>router.push(`/login?redirect=${pathname}`)}>
                     Login
                  </Button>
                  <Button  className=' hidden lg:flex'
                  onClick={()=>router.push(`/signup?redirect=${pathname}`)}>
                    Sign Up
                  </Button>
              </div>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default Navbar