'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import moment from 'moment';
import Link from 'next/link';
import { Button } from './ui/button';

export default function BlogDetail({
  id,
}: {
  id?: any;
}) {
  const supabase = createClientComponentClient();
  const [blog, setBlog] = useState<any>({});
  const fetchBlog = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error(error.message);
      return;
    }
    setBlog(data);
  }
  useEffect(() => {
    fetchBlog();
  }, []);

  return (<>
    <div className='flex flex-col items-center pt-16 px-40  w-full max-w-[1200px]'>
        <Link href='/blog'>
            <Button className='lg:w-full py-6 px-2 md:px-8 shadow-md text-xl flex w-full md:w-auto  md:inline-flex justify-center items-center rounded-full  font-semibold bg-[#20aca0] focus:ring-2 focus:ring-offset-2 transition-all'>
            To List
            </Button>
        </Link>
        <div className="mx-auto text-left md:text-center w-full">
            <h1 className="mt-3 text-2xl font-bold tracking-[-1.05px] sm:text-3xl lg:text-[42px] text-primary-500 lg:leading-[48px]">
                {blog.title}
            </h1>
            <p className="mt-3 text-base font-medium sm:text-lg text-[#474368]">
                {moment(blog.created_at).format("MMM DD YYYY")}
            </p>
            <img src={blog.image} alt="" className="w-full" />
            <p>
                {blog.content}
            </p>
        </div>

    </div>
  </>);
}