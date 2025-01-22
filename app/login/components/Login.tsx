'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Database } from '@/types/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import disposableDomains from 'disposable-email-domains';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineGoogle } from 'react-icons/ai';
import { WaitingForMagicLink } from './WaitingForMagicLink';

import bannerImg from "/public/login_banner.png";
import bannerLeft from "/public/left-banner.webp";
import bannerRight from "/public/right-banner.webp";

type Inputs = {
  email: string;
};

export const Login = ({
  host,
  searchParams,
}: {
  host: string | null;
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const supabase = createClientComponentClient<Database>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    try {
      await signInWithMagicLink(data.email);
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: 'Email sent',
          description: 'Check your inbox for a magic link to sign in.',
          duration: 5000,
        });
        setIsMagicLinkSent(true);
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
        description: 'Please try again, if the problem persists, contact us at hello@tryleap.ai',
        duration: 5000,
      });
    }
  };

  let inviteToken = null;
  if (searchParams && 'inviteToken' in searchParams) {
    inviteToken = searchParams['inviteToken'];
  }

  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const redirectUrl = `${protocol}://${host}/auth/callback`;

  console.log('redirect url = >>>', redirectUrl);

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      },
    });

    console.log(data, error);
  };

  const signInWithMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    console.log(error);

    if (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  if (isMagicLinkSent) {
    return <WaitingForMagicLink toggleState={() => setIsMagicLinkSent(false)} />;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-8 w-full px-40">
        <div className="lg:w-1/4 w-full mt-8 lg:mt-0">
          <img
            src={bannerLeft.src}
            alt="AI headshot"
            className="rounded-lg object-cover w-full"
            style={{ float: "right" }} />
        </div>
        <div className="flex flex-col space-y-4 lg:w-2/4 w-full" style={{textAlign:"center"}}>
          <div className='flex items-center justify-center p-8'>
            <div className='flex flex-col gap-4  p-4 rounded-xl  w-full'>
              <h1 className="text-6xl font-bold" style={{ color: "white" }}>
                <span className="text-[#1b145d]">Welcome</span>
              </h1>
              <p className='text-2xl opacity-60'>Sign in or create an account to get started.</p>
              <Button
                onClick={signInWithGoogle}
                variant={"outline"}
                className="w-full py-6 text-[white] px-2 md:px-8 mt-4 shadow-md md:mt-6 text-xl flex w-full md:w-auto  md:inline-flex justify-center items-center rounded-full  font-semibold bg-[#20aca0] hover:bg-[#20aca0] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                style={{ color: "white" }}
              >
                <AiOutlineGoogle size={20} />
                Continue with Google
              </Button>
              <OR />

              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-2'>
                    <Input
                      className='py-6'
                      type='email'
                      placeholder='Email'
                      {...register('email', {
                        required: true,
                        validate: {
                          emailIsValid: (value: string) =>
                            /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
                            'Please enter a valid email',
                          emailDoesntHavePlus: (value: string) =>
                            /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
                            "Email addresses with a '+' are not allowed",
                          emailIsntDisposable: (value: string) =>
                            !disposableDomains.includes(value.split('@')[1]) ||
                            'Please use a permanent email address',
                        },
                      })}
                    />
                    {isSubmitted && errors.email && (
                      <span className={'text-xs text-red-400'}>
                        {errors.email?.message || 'Email is required to sign in'}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  variant='outline'
                  type='submit'
                  className="w-full py-6 text-[white] px-2 md:px-8 mt-4 shadow-md md:mt-6 text-xl flex w-full md:w-auto  md:inline-flex justify-center items-center rounded-full  font-semibold bg-[#20aca0] hover:bg-[#20aca0] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                >
                  Continue with Email
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="lg:w-1/4 w-full mt-8 lg:mt-0">
          <img
            src={bannerRight.src}
            alt="AI headshot"
            className="rounded-lg object-cover w-full"
            style={{ float: "right" }} />
        </div>
      </div>
    </>
  );
};

export const OR = () => {
  return (
    <div className='flex items-center my-1'>
      <div className='border-b flex-grow mr-2 opacity-50' />
      <span className='text-sm opacity-50'>OR</span>
      <div className='border-b flex-grow ml-2 opacity-50' />
    </div>
  );
};
