import { AvatarIcon } from '@radix-ui/react-icons';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { Button } from './ui/button';
import React from 'react';
import { Database } from '@/types/supabase';
import ClientSideCredits from './realtime/ClientSideCredits';
import logo from '/public/logo.png';

export const dynamic = 'force-dynamic';

const stripeIsConfigured = process.env.NEXT_PUBLIC_STRIPE_IS_ENABLED === 'true';

const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === 'packs';

export const revalidate = 0;

export default async function Navbar() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: credits } = await supabase
    .from('credits')
    .select('*')
    .eq('user_id', user?.id ?? '')
    .single();

  return (
    <>
      <div className='fixed w-full total'>
        <div className='topbar w-full px-4 lg:px-20'>
          <div className='w-full flex flex-col lg:flex-row items-center'>
            <div className='grow md:px-4 text-[#1b145d]'>
              <div
                className='overflow-hidden'
                dangerouslySetInnerHTML={{
                  __html: `
            <marquee>Get your entire team matching professional headshots for as little as $15 per person. 80+ headshots per person, done in 2 hours or less, without the hassle of a physical photo shoot</marquee>
            `,
                }}
              />
            </div>
            <div className='md:px-4 text-[14px]'>
              {/* <span>
                <span className='text-orange-500'>✔</span>2413,241+ headshots created
              </span> */}
              <span className="flex gap-2">
                <div className="min-w-[110px] group relative flex content-center items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-2 text-center text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                  <div className="flex items-center justify-start space-x-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-6.5 6.326a6.52 6.52 0 0 1-1.5.174 6.487 6.487 0 0 1-5.011-2.36l.49-.98a.423.423 0 0 1 .614-.164l.294.196a.992.992 0 0 0 1.491-1.139l-.197-.593a.252.252 0 0 1 .126-.304l1.973-.987a.938.938 0 0 0 .361-1.359.375.375 0 0 1 .239-.576l.125-.025A2.421 2.421 0 0 0 12.327 6.6l.05-.149a1 1 0 0 0-.242-1.023l-1.489-1.489a.5.5 0 0 1-.146-.353v-.067a6.5 6.5 0 0 1 5.392 9.23 1.398 1.398 0 0 0-.68-.244l-.566-.566a1.5 1.5 0 0 0-1.06-.439h-.172a1.5 1.5 0 0 0-1.06.44l-.593.592a.501.501 0 0 1-.13.093l-1.578.79a1 1 0 0 0-.553.894v.191a1 1 0 0 0 1 1h.5a.5.5 0 0 1 .5.5v.326Z" clipRule="evenodd"></path></svg> <span className="uppercase">LANGUAGE</span></div> <ul className="hidden group-hover:flex flex-col absolute bg-white shadow rounded-md top-2 justify-start items-start py-1 w-[160px]"><div className="text-xs text-gray-700 font-semibold pb-1.5 px-2.5 border-b border-gray-100 w-full text-left">
                        SELECT LANGUAGE
                      </div>
                    <li className="border-b border-gray-100 w-full text-left hover:bg-gray-100 hover:font-bold">
                      <a href="/blog" aria-current="page" className="w-full py-1.5 px-2.5 block nuxt-link-exact-active nuxt-link-active">
                        <span>English</span></a></li><li className="border-b border-gray-100 w-full text-left hover:bg-gray-100 hover:font-bold">
                      <a href="/es/blog" className="w-full py-1.5 px-2.5 block">
                        <span>Spain</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="min-w-[110px] group relative flex content-center items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-2 text-center text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                  <div className="flex items-center justify-start space-x-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-6.5 6.326a6.52 6.52 0 0 1-1.5.174 6.487 6.487 0 0 1-5.011-2.36l.49-.98a.423.423 0 0 1 .614-.164l.294.196a.992.992 0 0 0 1.491-1.139l-.197-.593a.252.252 0 0 1 .126-.304l1.973-.987a.938.938 0 0 0 .361-1.359.375.375 0 0 1 .239-.576l.125-.025A2.421 2.421 0 0 0 12.327 6.6l.05-.149a1 1 0 0 0-.242-1.023l-1.489-1.489a.5.5 0 0 1-.146-.353v-.067a6.5 6.5 0 0 1 5.392 9.23 1.398 1.398 0 0 0-.68-.244l-.566-.566a1.5 1.5 0 0 0-1.06-.439h-.172a1.5 1.5 0 0 0-1.06.44l-.593.592a.501.501 0 0 1-.13.093l-1.578.79a1 1 0 0 0-.553.894v.191a1 1 0 0 0 1 1h.5a.5.5 0 0 1 .5.5v.326Z" clipRule="evenodd"></path></svg> <span className="uppercase">ABOUT US</span>
                  </div>
                </div>
              </span>

            </div>
          </div>
        </div>

        <div className='flex w-full px-4 lg:px-40 py-2 items-center border-b text-center gap-8 justify-between mynav'>
          <div className='flex gap-2 h-full'>
            <Link href='/' className="flex" style={{ justifyContent: "center", alignItems: "center", justifyItems: "center" }}>
              <img src={logo.src} alt="logo" className="h-[60px]" />
              <label className='font-bold text-[30px] text-[#1b145d]' style={{ cursor: "pointer" }}>INSTANT HEADSHOTS</label>
            </Link>
          </div>

          <div className='hidden lg:flex flex-row gap-2 text-[#1b145d]'>
            <Link href='/overview'>
              <Button variant={'ghost'} className='text-[16px]'>
                Home
              </Button>
            </Link>
            <Link href='/faq'>
              <Button variant={'ghost'} className='text-[16px]'>
                FAQ
              </Button>
            </Link>
            <Link href='/blog'>
              <Button variant={'ghost'} className='text-[16px]'>
                Blog
              </Button>
            </Link>
            {packsIsEnabled && (
              <Link href='/overview/packs'>
                <Button variant={'ghost'} className='text-[16px]'>
                  Packs
                </Button>
              </Link>
            )}
            {stripeIsConfigured && (
              <Link href='/get-credits'>
                <Button variant={'ghost'} className='text-[16px]'>
                  Get Credits
                </Button>
              </Link>
            )}
          </div>

          <div
            className='flex gap-4 lg:ml-auto text-[#1b145d]'
            style={{ alignItems: 'center', justifyItems: 'center' }}
          >
            {!user && (
              <>
                <Link href='/login'>
                  <Button variant={'ghost'} className='text-[16px]'>
                    Login
                  </Button>
                </Link>
                <Link href='/login'>
                  <Button className='lg:w-full py-6 px-2 md:px-8 shadow-md text-xl flex w-full md:w-auto  md:inline-flex justify-center items-center rounded-full  font-semibold bg-[#20aca0] focus:ring-2 focus:ring-offset-2 transition-all'>
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {user && (
              <div className='flex flex-row gap-4 text-center align-middle justify-center'>
                {stripeIsConfigured && <ClientSideCredits creditsRow={credits ? credits : null} />}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className='cursor-pointer'>
                    <AvatarIcon height={24} width={24} className='text-primary' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel className='text-primary text-center overflow-hidden text-ellipsis'>
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/admin">
                      <Button type='submit' className='w-full text-left' variant={'ghost'}>
                        AdminPage
                      </Button>
                    </Link>
                    <form action='/auth/sign-out' method='post'>
                      <Button type='submit' className='w-full text-left' variant={'ghost'}>
                        Log out
                      </Button>
                    </form>
                    
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
