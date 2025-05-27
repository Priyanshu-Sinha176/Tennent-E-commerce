"use client"

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import NavbarSidebar from './navbar-sidebar';
import { MenuIcon } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

const poppins = Poppins({
    weight: ['700'],
    subsets: ['latin'],
})

interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
    return (
        <Button asChild variant="outline"
            className={cn(
                " bg-transparent border-transparent hover:bg-transparent rounded-full hover:border-primary px-3.5 text-lg "
                , isActive && "bg-black text-white hover:bg-black hover:text-white"
            )}>

            <Link href={href}> {children} </Link>

        </Button >
    )
}

const NavbarItems = [
    {
        href: '/',
        children: 'Home',
    },
    {
        href: '/about',
        children: 'About',
    },
    {
        href: '/feature',
        children: 'Feature',
    },
    {
        href: '/pricing',
        children: 'Pricing',
    },
    {
        href: '/contact',
        children: 'Contact',
    },
]

const Navbar = () => {

    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const trpc = useTRPC()
    const session = useQuery(trpc.auth.session.queryOptions())

    return (
        <nav className='h-20 flex border-b justify-between font-medium bg-white'>

            < Link href="/" className="pl-6 flex items-center">

                <span className={cn("text-5xl font-semibold", poppins.className)}> TenantBay </span>

            </Link>

            < NavbarSidebar items={NavbarItems} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

            <div className=' items-center gap-4 hidden lg:flex'>

                {NavbarItems.map((item) => (

                    <NavbarItem key={item.href} href={item.href} isActive={pathname === item.href} >

                        {item.children}

                    </NavbarItem>

                ))}

            </div>

            {session.data?.user ? (

                <div className='hidden lg:flex'>

                    <Button asChild className=
                        'border-l border-y-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-rose-400 hover:text-black transition-colors text-lg'>

                        <Link href="/admin">

                            Dashboard

                        </Link>

                    </Button>

                </div>

            ) : (

                < div className='hidden lg:flex'>

                    <Button asChild variant="secondary" className=
                        'border-l border-y-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-rose-400 transition-colors text-lg'>

                        <Link prefetch href="/sign-in">

                            Log in

                        </Link>

                    </Button>

                    <Button asChild className=
                        'border-l border-y-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-rose-400 hover:text-black transition-colors text-lg'>

                        <Link prefetch href="/sign-up">

                            Start Selling

                        </Link>

                    </Button>

                </div>

            )}

            <div className='flex lg:hidden items-center justify-center pr-4'>

                <Button variant="ghost" className='size-12 border-transparent bg-white hover:bg-rose-300'
                    onClick={() => setIsSidebarOpen(true)}>

                    < MenuIcon />

                </Button>

            </div>

        </nav>
    );
}

export default Navbar;
