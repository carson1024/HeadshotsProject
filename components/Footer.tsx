import Link from 'next/link';
import { YoutubeIcon } from 'lucide-react';
import imgYoutube from "/public/socials/youtube.png";
import imgFacebook from "/public/socials/facebook.png";
import imgInstagram from "/public/socials/instagram.png";
import imgLinkdin from "/public/socials/linkdin.png";
import imgPinterest from "/public/socials/pinterest.png";
import imgTwitter from "/public/socials/twitter.png";



export default function Footer() {
  return (
    <>
      <footer className='footer text-center px-4 lg:px-40 py-4 h-12 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center space-y-3 sm:mb-0 mb-3 border-gray-200'>
        <div className='flex space-x-4 pb-4 sm:pb-0'>
          <a href="http://youtube.com"><img src={imgYoutube.src} alt="youtube" className="h-[30px]" /></a>
          <a href="http://facebook.com"><img src={imgFacebook.src} alt="youtube" className="h-[30px]" /></a>
          <a href="http://instagram.com"><img src={imgInstagram.src} alt="youtube" className="h-[30px]" /></a>
          <a href="http://linkdin.com"><img src={imgLinkdin.src} alt="youtube" className="h-[30px]" /></a>
          <a href="http://pinterest.com"><img src={imgPinterest.src} alt="youtube" className="h-[30px]" /></a>
          <a href="http://x.com"><img src={imgTwitter.src} alt="youtube" className="h-[30px]" /></a>


        </div>
        <hr className='border-white/10' />
        <div className='md:flex md:items-center md:justify-between md:gap-6'>
          <div className='flex flex-wrap items-center gap-5'>
            <a
              href='/author/danny-postma'
              title='About us'
              className='text-base font-normal text-white transition-all duration-150 hover:opacity-80'
            >
              Home
            </a>
            <a
              href='/blog'
              title='Blog'
              className='text-base font-normal text-white transition-all duration-150 hover:opacity-80'
            >
              Packs
            </a>
            <a
              href='/jobs'
              title='Jobs'
              className='text-base font-normal text-white transition-all duration-150 hover:opacity-80'
            >
              Get Credits
            </a>
          </div>{' '}
          <p className='mt-12 text-base font-normal text-white md:mt-0'>
            © 2024 - 2025, All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
}
