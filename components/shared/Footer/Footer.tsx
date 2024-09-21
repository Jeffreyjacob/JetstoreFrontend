import LogoImage from '@/public/Logomark.png';
import { GithubIcon, Instagram, Youtube } from 'lucide-react';
import masterCard from '@/public/Mastercard.png';
import amex from "@/public/Amex.png";
import visa from "@/public/Visa.png";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

type Props = {
    footColor: boolean
}
const footerLinks = [
    {
        name: "SUPPORT", link: [
            "FAQ",
            "Term of Use",
            "Privacy Policy"
        ]
    }, {
        name: "COMPANY", link: [
            "About us",
            "Contact",
            "Career"
        ]
    }, {
        name: "SHOP", link: [
            "My Account",
            "Checkout",
            "Cart"
        ]
    }
]
const Footer = ({ footColor }: Props) => {
    return (
        <div className={cn(`w-full flex justify-center px-5 md:px-7 xl:px-0 `,
            footColor ? "bg-[#F6F6F6]":null
        )}>
          <div className='max-w-6xl w-full'>
          <div className="w-full grid md:grid-cols-3 md:gap-4 gap-5 lg:justify-between justify-center py-7">
                {/**Left section */}
                <div className='flex flex-col gap-4 md:w-[250px]  md:mt-5'>
                    <div className="flex gap-1 items-center tracking-tight'">
                        <Image src={LogoImage} alt='logoImage' className='w-[35px] h-[30px] object-contain' />
                        <span className='text-[16px] font-extrabold font-manrope'>ECOMMERCE</span>
                    </div>
                    <span className='text-[14px] font-normal text-Neutral-B500'>
                        DevCut is a YouTube channel for practical project-based learning.
                    </span>
                    <div className='flex gap-5 text-Neutral-B500'>
                        <GithubIcon className='w-5 h-5' />
                        <Instagram className='w-5 h-5' />
                        <Youtube className='w-5 h-5' />
                    </div>
                </div>
                {/**middle section */}
                <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:gap-3'>
                    {
                        footerLinks.map((item,index)=>(
                            <div key={index} className='flex flex-col'>
                                <span className='text-[14px] font-medium text-Neutral-B300 mb-5 mt-5'>
                                    {item.name}
                                </span>
                                {
                                    item.link.map((subItem,index)=>(
                                        <span key={index} 
                                        className=' text-Neutral-B500 text-[13px] font-medium my-1'>
                                            {subItem}
                                        </span>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
                {/**right section */}
                <div className='flex flex-col flex-nowrap w-full mt-5'>
                    <span className='text-[14px] text-Neutral-B300 font-medium'>ACCEPTED PAYMENTS</span>
                    <div className='flex gap-3'>
                        <Image src={amex} alt='payment'/>
                        <Image src={visa} alt='visa'/>
                        <Image src={masterCard} alt='master'/>
                    </div>
                </div>

            </div>
            <Separator/>
             <span className=' flex justify-center items-center text-[14px] text-Neutral-B500 font-normal py-4'>
                © 2023 DevCut. All rights reserved.
            </span>
          </div>
        </div>
    )
}

export default Footer