'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import imgBlog from "/public/video_tutorial.png";
import imgDelete from "/public/delete.png";
import { ChevronDownIcon, ChevronUpIcon, CloudArrowUpIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Database } from '@/types/supabase';
import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
import moment from 'moment';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Swal from 'sweetalert2';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB image size limit
dotenv.config();

export default function Admin({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [addType, setAddType] = useState('blog');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [id, setId] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [blogs, setBlogs] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  const handleFileUpload = (file: File) => {
    setBlogImage(file);
  };
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  }, [handleFileUpload]);
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, [handleFileUpload]);

  const deleteFile = async (filePath: string) => {
    if (!filePath) return;
    try {
      filePath = filePath.replace(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/`, '');
      const { error } = await supabase.storage
        .from('uploads')
        .remove([filePath]);
  
      if (error) {
        console.error('Error deleting file:', error);
        // Handle the error appropriately
      } else {
        console.log('File deleted successfully');
        // Perform any necessary actions after successful deletion
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      // Handle the error appropriately
    }
  }

  // Upload the image to Supabase Storage
  const uploadImage = async (): Promise<string | null> => {
    if (!blogImage) return null;

    const filePath = `images/${Date.now()}`;
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(filePath, blogImage);

    if (error) {
      toast.error('Error uploading image.');
      console.error('Error uploading image:', error);
      return null;
    }

    return data?.path || null;
  };

  const clearForm = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
    setBlogImage(null);
    setTitle('');
    setContent('');
    setQuestion('');
    setAnswer('');
    setId(0);
    setImageUrl('');
  }

  const fetchBlogs = async () => {
    const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error(error.message);
      return;
    }
    setBlogs(data);
  }

  const fetchFaqs = async () => {
    const { data, error } = await supabase.from('faqs').select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error(error.message);
      return;
    }
    setFaqs(data);
  }

  useEffect(() => {
    fetchBlogs();
    fetchFaqs();
  }, []);

  const handleSubmit = async () => {
    switch(addType) {
      case 'blog': {
        if ((!id && !blogImage) || !title || !content) {
          toast.error("Please fill the fields");
          break;
        }
        setIsUploading(true);
        // Upload image and get the image URL
        let image: string = imageUrl;
        if (blogImage) {
          const imageKey = await uploadImage();
          if (!imageKey) {
            setIsUploading(false);
            break;
          }
          image = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${imageKey}`;
        }
        if (imageUrl && id && blogImage) {
          deleteFile(imageUrl);
        }
        // Insert form data into Supabase
        if (!id) {
          const { data, error } = await supabase
          .from('blogs')
          .insert([
            {
              title,
              content: content,
              image: image,
            },
          ]).select();
          
          setIsUploading(false);
  
          if (error) {
            toast.error('Error inserting data.');
          } else {
            toast.success('New Blog Added.');
            clearForm();
            blogs.splice(0, 0, data[0]);
            setBlogs(blogs);
          }
        }else {
          const { data, error } = await supabase
          .from('blogs')
          .update([
            {
              title,
              content,
              image,
            },
          ]).eq('id', id).select();
          
          setIsUploading(false);
  
          if (error) {
            toast.error('Error udpating data.');
          } else {
            toast.success('Blog updated.');
            console.log('Blog udpated', data[0]);
            clearForm();
            for (let i = 0; i < blogs.length; ++i) {
              if (blogs[i].id == id) {
                blogs[i] = data[0];
                break;
              }
            }
            setBlogs(blogs);
          }
        }

        break;
      }
      case 'faq': {
        if (!question || !answer) {
          toast.error("Please fill the fields");
          break;
        }
        // Insert form data into Supabase
        if (!id) {
          const { data, error } = await supabase
          .from('faqs')
          .insert([
            {
              question,
              answer,
            },
          ]).select();
  
          if (error) {
            toast.error('Error inserting data.');
          } else {
            toast.success('New Faq Added.');
            clearForm();
            faqs.splice(0, 0, data[0]);
            setFaqs(faqs);
          }
        }else {
          const { data, error } = await supabase
          .from('faqs')
          .update([
            {
              question,
              answer,
            },
          ]).eq('id', id).select();
          
          if (error) {
            toast.error('Error udpating data.');
          } else {
            toast.success('Faq updated.');
            console.log('Faq udpated', data[0]);
            clearForm();
            for (let i = 0; i < faqs.length; ++i) {
              if (faqs[i].id == id) {
                faqs[i] = data[0];
                break;
              }
            }
            setFaqs(faqs);
          }
        }

        break;
      }
    }
  }

  const editBlog = async (id: number, index: number, e: any) => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching row:', error);
      return null;
    }

    setId(data.id);
    setTitle(data.title);
    setContent(data.content);
    setImageUrl(data.image);
  };

  const handleDelete = (callback: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#333',
      cancelButtonColor: '#888',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  };

  const deleteBlog = async (id: number, index: number, e: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleDelete(async () => {
      try {
        deleteFile(blogs[index].image);
        const { data, error } = await supabase
          .from('blogs')
          .delete()
          .match({ id: id });
    
        if (error) {
          console.error('Error deleting row:', error);
          throw error;
        }
    
        toast.success('Blog Deleted');
        const newBlogs = [...blogs];
        newBlogs.splice(index, 1);
        console.log('Deleted Blog', index);
        setBlogs(newBlogs);
      } catch (error) {
        console.error('Error deleting row:', error);
      }
    });
  };

  const editFaq = async (id: number, index: number, e: any) => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching row:', error);
      return null;
    }

    setId(data.id);
    setQuestion(data.question);
    setAnswer(data.answer);
  };

  const deleteFaq = (id: number, index: number, e: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleDelete(async () => {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .delete()
          .match({ id: id });
    
        if (error) {
          console.error('Error deleting row:', error);
          throw error;
        }
    
        toast.success('Faq Deleted');
        const newFaqs = [...faqs];
        newFaqs.splice(index, 1);
        console.log('Deleted Faq', index);
        setFaqs(newFaqs);
      } catch (error) {
        console.error('Error deleting row:', error);
      }
    });
  };

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 w-full pt-8 lg:px-40 md:px-10'>
        <input type="hidden" value={id}/>
        <div className="items-center justify-start text-center space-y-5">
          <div className="space-y-2.5 w-full">
            <div className="mb-1 flex flex-col items-start justify-between space-y-0.5">
              <div className="flex justify-between w-full items-center">
                <label className="block text-md font-medium leading-5 text-gray-900">
                  Type
                </label>
              </div>
            </div>
            <div className="">
              <select 
                className="form-input block w-full rounded border p-2 sm:text-sm sm:leading-5 border-black/20 opacity-100 bg-dark/10 border-black/20 text-black"
                value={addType}
                onChange={(e) => setAddType(e.target.value)}
              >
                <option value="blog">Add Blog</option>
                <option value="faq">Add FAQ</option>
              </select>
            </div>
          </div>
          {
            addType == 'blog' ?
            <>
              <div className='space-y-2.5 w-full'>
                  <div className="mb-1 flex flex-col items-start justify-between space-y-0.5">
                      <div className="flex justify-between w-full items-center">
                          <label className="block text-md font-medium leading-5 text-gray-900">
                              Blog Image
                          </label>
                      </div>
                  </div>
                  <div
                  className="mt-1 flex justify-center items-center px-4 py-4 border-2 border-[var(--card)] border-dashed rounded-md hover:border-[var(--primary-hover)] transition duration-150 ease-in-out bg-[var(--card2)]"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  >
                  <div className="space-y-1 text-center">
                      <div className="flex flex-col items-center">
                      <CloudArrowUpIcon className="mx-auto h-10 w-10 text-subtext mb-2" />
                      <div className="flex flex-col sm:flex-row text-sm text-subtext items-center">
                          <label
                          htmlFor="tokenImage"
                          className="outline-none cursor-pointer rounded-md text-[var(--primary)] hover:text-[var(--primary-hover)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--primary)] transition duration-150 ease-in-out px-3 py-2 mb-2 sm:mb-0 sm:mr-2"
                          >
                          <span>Upload File Drag and Drop</span>
                          <input
                              id="tokenImage"
                              name="tokenImage"
                              type="file"
                              accept="image/*"
                              className="sr-only outline-none"
                              onChange={handleImageChange}
                              disabled={isUploading}
                              ref={fileInputRef}
                          />
                          </label>
                      </div>
                      <p className="text-xs text-subtext mt-2">PNG, JPG, GIF up to 1MB</p>
                      </div>
                  </div>
                  </div>
                  {isUploading && <p className="text-sm text-subtext mt-2">Uploading image...</p>}
              </div>
              <div className="space-y-2.5 w-full">
                <div className="mb-1 flex flex-col items-start justify-between space-y-0.5">
                  <div className="flex justify-between w-full items-center">
                    <label className="block text-md font-medium leading-5 text-gray-900">
                      Title
                    </label>
                  </div>
                </div>
                <div className="">
                  <input 
                    type="text" max="999999999" 
                    placeholder="How Much Does a Headshot Cost in 2024?" 
                    className="form-input block w-full rounded border p-2 sm:text-sm sm:leading-5 border-black/20 opacity-100 bg-dark/10 border-black/20 text-black"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
              </div>
              <div className="space-y-2.5 w-full">
                <div className="mb-1 flex flex-col items-start justify-between space-y-0.5">
                  <div className="flex justify-between w-full items-center">
                    <label className="block text-md font-medium leading-5 text-gray-900">
                      Content
                    </label>
                  </div>
                </div>
                <div className="">
                  <textarea placeholder="My name is X and I'm a..." 
                    className="w-full h-[250px] bg-white border border-gray-300 text-gray-700 p-2 rounded"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </> :
            <>
              <div className="space-y-2.5 w-full">
                <div className="mb-1 flex flex-col items-start justify-between space-y-0.5">
                  <div className="flex justify-between w-full items-center">
                    <label className="block text-md font-medium leading-5 text-gray-900">
                      Question
                    </label>
                  </div>
                </div>
                <div className="">
                  <input 
                    type="text" max="999999999" 
                    placeholder="How Much Does a Headshot Cost in 2024?" 
                    className="form-input block w-full rounded border p-2 sm:text-sm sm:leading-5 border-black/20 opacity-100 bg-dark/10 border-black/20 text-black"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
              </div>
              <div className="space-y-2.5 w-full">
                <div className="mb-1 flex flex-col items-start justify-between space-y-0.5">
                  <div className="flex justify-between w-full items-center">
                    <label className="block text-md font-medium leading-5 text-gray-900">
                      Answer
                    </label>
                  </div>
                </div>
                <div className="">
                  <textarea placeholder="My name is X and I'm a..." 
                    className="w-full h-[250px] bg-white border border-gray-300 text-gray-700 p-2 rounded"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </>
          }
          <Button 
            className='lg:w-full py-6 px-2 md:px-8 shadow-md text-xl flex w-full md:w-auto  md:inline-flex justify-center items-center rounded-full  font-semibold bg-[#20aca0] focus:ring-2 focus:ring-offset-2 transition-all'
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </div>
        <div className="items-center justify-start space-x-4 text-center">
          <div className="w-full h-[500px]">
            {
              addType == 'blog' ?
              <>
                {
                  blogs.map((blog, index) => 
                  <a href="javascript:;" onClick={(e) => editBlog(blog.id, index, e)} key={index}>
                    <div className="w-full flex mb-[20px] items-center">
                      <a href='javascript:;' onClick={(e) => deleteBlog(blog.id, index, e)}>
                        <img src={imgDelete.src} alt="" style={{cursor:"pointer"}} className='w-[40px] h-[40px] mr-[10px]'/>
                      </a> 
                      <div className="w-[100px]">
                        <img src={blog.image} alt="" className="object-cover w-full" />
                      </div>
                      <div className="w-full text-left px-4">
                        <p className="text-base font-bold sm:text-lg text-primary-500 tracking-[-0.3px]">{blog.title}</p>
                        <hr />
                        <p className="text-sm tracking-[-0.3px] font-medium text-[#474368]">
                        {moment(blog.created_at).format("YYYY-MM-DD HH:mm")}
                        </p>
                      </div>
                    </div>
                  </a>)
                }
              </>:
              <>
                {
                  faqs.map((faq, index) => 
                  <a href="javascript:;" onClick={(e) => editFaq(faq.id, index, e)} key={index}>
                    <div className="w-full flex mb-[20px] items-center">
                      <a href='javascript:;' onClick={(e) => deleteFaq(faq.id, index, e)}>
                        <img src={imgDelete.src} alt="" style={{cursor:"pointer"}} className='w-[40px] h-[40px] mr-[10px]'/>
                      </a> 
                      <div className="w-full text-left px-4">
                        <p className="text-base font-bold sm:text-lg text-primary-500 tracking-[-0.3px]">{faq.question}</p>
                        <hr />
                        <p className="text-sm tracking-[-0.3px] font-medium text-[#474368]">
                        {moment(faq.created_at).format("YYYY-MM-DD HH:mm")}
                        </p>
                      </div>
                    </div>
                  </a>)
                }
              </>
            }
          </div>
        </div>
      </div>
      <ToastContainer />
    </>

  );
}
