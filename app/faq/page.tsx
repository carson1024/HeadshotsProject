import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import imgBlog from "/public/video_tutorial.png";
import Faq from '@/components/Faq';

export const dynamic = 'force-dynamic';

export default async function Index({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {


    return (
        <Faq />

    );
}
