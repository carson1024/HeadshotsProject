'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import moment from 'moment';
import { ChevronDownIcon, ChevronUpIcon, CloudArrowUpIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function Faq({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createClientComponentClient();
  const [faqs, setFaqs] = useState<any[]>([]);
  const fetchFaqs = async () => {
    const { data, error } = await supabase.from('faqs').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error(error.message);
      return;
    }
    setFaqs(data);
  }
  useEffect(() => {
    fetchFaqs();
  }, []);

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (<>
    <div className='flex flex-col items-center px-5'>
      <div className="mx-auto text-left md:text-center">
          <h1 className="mt-3 text-2xl py-3 font-bold tracking-[-1.05px] sm:text-3xl lg:text-[42px] text-primary-500 lg:leading-[48px]">
          Your questions, answered
          </h1>
          <p className="mt-3 mb-5 text-base font-medium sm:text-lg text-[#474368]">
            Got more questions? Feel free to email us.
          </p>
      </div>
      {
        faqs.map((faq, index) => <>
          <div key={index}
            className='border-b-[1px] border-[#888] w-full'
            style={{
              
              transition: 'max-height 0.3s ease-in-out',
            }}
          >
            <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleItem(index)}>
              <button className='text-lg font-bold py-3'>
                {faq.question}
              </button>
              <span className='w-6 h-6'>
                {
                  activeIndex === index ? <ChevronUpIcon /> : <ChevronDownIcon />
                }
                
              </span>
            </div>
            <div
              style={{
                maxHeight: activeIndex === index ? '1000px' : '0px',
                marginBottom: activeIndex === index ? '10px' : '0px',
                overflow: 'hidden',
              }}
            >
              {faq.answer}
            </div>
          </div>
        </>)
      }
      
    </div>
  </>);
}