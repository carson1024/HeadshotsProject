import Link from 'next/link';
import { Button } from './ui/button';
import { Rate } from 'antd';

export default function PricingSection() {
  return (
    <div className='w-full px-20 mt-16 mb-16 p-8 rounded-lg space-y-8 bg-gray-100'>
      <h2 className='text-5xl font-bold text-[#1c1b1b]'>
        Pricing
      </h2>
      <div className='flex flex-wrap justify-center lg:space-x-4 space-y-4 lg:space-y-0 items-stretch'>
        {pricingOptions.map((option, index) => (
          <div
            key={index}
            className={`flex flex-col border border-[blue]-500 rounded-lg p-8 w-full lg:w-1/4 ${option.bgColor} `}
          >
            <div className='flex-grow space-y-4'>
              <h3 className='text-2xl font-semibold text-center'>{option.title}</h3>
              <p className='text-6xl font-bold text-center mb-2'>{option.price}</p>
              <p className='text-sm text-gray-600 text-center'>{option.description}</p>
              <ul className='space-y-2 mb-4 pl-4 text-center m-[auto] px-10'>
                {option.features.map((feature, fIndex) => (
                  <li key={fIndex} className='flex items-center space-x-2'>
                    <span className='text-orange-500'>✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <ul className='space-y-2 mb-4 pl-4 text-center m-[auto]'>
                {option.styles.map((styles, fIndex) => (
                  <li key={fIndex} className='flex items-center space-x-2'>
                    <span className='text-orange-500'>✔</span>
                    <span>{styles}</span>
                  </li>
                ))}
              </ul>
              <ul className='space-y-2 mb-4 pl-4 text-center m-[auto]'>
                {option.resolutions.map((resolution, fIndex) => (
                  <li key={fIndex} className='flex items-center space-x-2'>
                    <span className='text-orange-500'>✔</span>
                    <span>{resolution}</span>
                  </li>
                ))}
              </ul>
              <Rate disabled defaultValue={2} className='pl-4' />
            </div>
            <div className='mt-10 text-center'>
              <Link href='/login'>
                {' '}
                <Button className='w-3/4 py-6 px-2 md:px-8 text-md shadow-lg flex md:inline-flex justify-center items-center rounded-full  font-semibold bg-[#20aca0] hover:bg-[#20aca0] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all'>
                  {option.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const pricingOptions = [
  {
    title: 'Starter',
    price: '$1',
    description: 'Perfect for individuals looking to enhance their online presence.',
    features: ['1 Credit'],
    styles: ['+50 Models'],
    resolutions: ['1536 * 2304 image resolution'],
    buttonText: 'Choose Starter',
    bgColor: 'bg-white',
  },
  {
    title: 'Basic',
    price: '$3',
    description: 'Ideal for professionals requiring frequent updates to their profiles.',
    features: ['3 Credits'],
    styles: ['+50 Models'],
    resolutions: ['836 * 1404 image resolution'],
    buttonText: 'Choose Basic',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Premium',
    price: '$5',
    description: 'The best value with unlimited possibilities.',
    features: ['5 Credits'],
    styles: ['+50 Models'],
    resolutions: ['1536 * 2304 image resolution'],
    buttonText: 'Choose Premium',
    bgColor: 'bg-white',
  },
];
