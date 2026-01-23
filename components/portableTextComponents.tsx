import { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

// Extract YouTube video ID from URL
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    /youtube\.com\/embed\/([^"&?\/\s]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) {
        return null;
      }
      
      // Sanity image in PortableText has asset with _ref or full asset object
      const imageUrl = urlForImage(value as any);
      
      if (!imageUrl) {
        return null;
      }
      
      return (
        <div className="my-8 w-full">
          <div className="relative w-full">
            <Image
              src={imageUrl}
              alt={value.alt || 'Image'}
              width={800}
              height={600}
              className="rounded-lg w-full h-auto"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          {value.alt && (
            <p className="mt-2 text-sm text-gray-600 text-center italic">{value.alt}</p>
          )}
        </div>
      );
    },
    youtube: ({ value }: { value: any }) => {
      // Handle the value structure - it should have url and optionally title
      if (!value) {
        return null;
      }
      
      const url = value.url || value?.url;
      const title = value.title || value?.title;
      
      if (!url) {
        return (
          <div className="my-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-600">YouTube embed missing URL</p>
          </div>
        );
      }
      
      const videoId = getYouTubeId(url);
      
      if (!videoId) {
        return (
          <div className="my-4 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-600">Invalid YouTube URL: {url}</p>
          </div>
        );
      }
      
      return (
        <div className="my-8 w-full">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title || 'YouTube video player'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {title && (
            <p className="mt-2 text-sm text-gray-600">{title}</p>
          )}
        </div>
      );
    },
  },
};
