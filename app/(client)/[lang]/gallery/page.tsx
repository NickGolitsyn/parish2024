'use client'
import React from 'react';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

export default async function page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)
  return (
    <main className="p-24">
      <div className='grid'>
        <Gallery>
          <Item
            original="https://placekitten.com/1024/768?image=1"
            thumbnail="https://placekitten.com/80/60?image=1"
            width="1024"
            height="768"
          >
            {({ ref, open }) => (
              <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" alt="Kitten 1" />
            )}
          </Item>
          <Item
            original="https://placekitten.com/1024/768?image=2"
            thumbnail="https://placekitten.com/80/60?image=2"
            width="1024"
            height="768"
          >
            {({ ref, open }) => (
              <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=2" alt="Kitten 2" />
            )}
          </Item>
          <Item
            original="https://placekitten.com/1024/768?image=1"
            thumbnail="https://placekitten.com/80/60?image=1"
            width="1024"
            height="768"
          >
            {({ ref, open }) => (
              <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" alt="Kitten 1" />
            )}
          </Item>
          <Item
            original="https://placekitten.com/1024/768?image=2"
            thumbnail="https://placekitten.com/80/60?image=2"
            width="1024"
            height="768"
          >
            {({ ref, open }) => (
              <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=2" alt="Kitten 2" />
            )}
          </Item>
          <Item
            original="https://placekitten.com/1024/768?image=1"
            thumbnail="https://placekitten.com/80/60?image=1"
            width="1024"
            height="768"
          >
            {({ ref, open }) => (
              <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" alt="Kitten 1" />
            )}
          </Item>
          <Item
            original="https://placekitten.com/1024/768?image=2"
            thumbnail="https://placekitten.com/80/60?image=2"
            width="1024"
            height="768"
          >
            {({ ref, open }) => (
              <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=2" alt="Kitten 2" />
            )}
          </Item>
          <Item
            original="https://placekitten.com/1024/768?image=1"
            thumbnail="https://placekitten.com/80/60?image=1"
            width="1024"
            height="768"
          >
            {({ ref, open }) => (
              <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" alt="Kitten 1" />
            )}
          </Item>
          <Item
            original="https://placekitten.com/1024/768?image=2"
            thumbnail="https://placekitten.com/80/60?image=2"
            width="1024"
            height="768"
          >
            {({ ref, open }) => (
              <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=2" alt="Kitten 2" />
            )}
          </Item>
        </Gallery>
      </div>
    </main>
  )
}

// const page = () => (
//   <Gallery>
//     <Item
//       original="https://placekitten.com/1024/768?image=1"
//       thumbnail="https://placekitten.com/80/60?image=1"
//       width="1024"
//       height="768"
//     >
//       {({ ref, open }) => (
//         <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" alt="Kitten 1" />
//       )}
//     </Item>
//     <Item
//       original="https://placekitten.com/1024/768?image=2"
//       thumbnail="https://placekitten.com/80/60?image=2"
//       width="1024"
//       height="768"
//     >
//       {({ ref, open }) => (
//         <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=2" alt="Kitten 2" />
//       )}
//     </Item>
//   </Gallery>
// );

// export default page;
