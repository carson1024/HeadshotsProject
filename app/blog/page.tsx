import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import imgBlog from "/public/video_tutorial.png";
import Blog from '@/components/Blog';

export const dynamic = 'force-dynamic';

export default async function Index({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {


    return (
        <Blog />

    );
}
