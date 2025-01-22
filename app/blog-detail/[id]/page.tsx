"use client";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import imgBlog from "/public/video_tutorial.png";

export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { useParams } from 'next/navigation';
import BlogDetail from '@/components/BlogDetail';

export default async function Index({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const params = useParams();
    const postId = params.id;
    return (
        <BlogDetail id={postId} />

    );
}
