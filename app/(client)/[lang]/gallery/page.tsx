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
    <main className="py-24 px-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center [&>img]:h-32">
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
