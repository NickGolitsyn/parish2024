'use client'
import Image from 'next/image'
import placeholder from '@/public/320x180.png'
import { useState } from 'react'
import { Button } from './ui/button'

export default function NewsFeed() {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [visibleCounter, setVisibleCounter] = useState(3);

  const loadMore = () => {
    setVisibleCounter((prevCount) => prevCount + 2);
  }
  return (
    <section className='mx-5 mb-16'>
      <div className='space-y-5'>
        {arr.slice(0, visibleCounter).map((index) => (
          <div key={index} className='flex flex-col sm:flex-row items-center space-y-4 sm:space-x-4 rounded-sm border py-3 px-5'>
            <Image 
              src={placeholder} 
              alt={'News image'}
              className='rounded-sm h-40 w-auto'
            />
            <div>
              <h1 className='font-semibold sm:text-xl'>News title</h1>
              <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        ))}
        {visibleCounter < arr.length && (
          <div className='flex justify-center'>
            <Button onClick={loadMore} variant={'outline'}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
