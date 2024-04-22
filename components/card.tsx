'use client'
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface CardProps {
  title: string;
  description: string;
  url: string;
}

const Card: React.FC<CardProps> = ({ title, description, url }) => {
  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    // <div
    //   className="bg-white rounded-sm border shadow-sm p-6 hover:shadow-md transition-shadow duration-300 cursor-pointer"
    //   onClick={handleClick}
    // >
    //   <div className="flex items-center justify-between">
    //     <h2 className="text-xl font-bold">{title}</h2>
    //     <div className="hover:translate-x-1 transition-transform duration-300">
    //       <ArrowRightIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
    //     </div>
    //   </div>
    //   <p className="mt-2 text-gray-600 text-left">{description}</p>
    // </div>
        <a
          href={url}
          className="group rounded-sm border px-5 py-4 transition-all hover:bg-gray-50"
        >
          <h2 className="mb-3 text-2xl font-semibold flex justify-between items-center">
            {title}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <ArrowRightIcon className="h-6 w-6 text-neutral-800" aria-hidden="true" />
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50 text-left">
            {description}
          </p>
        </a>
  );
};

export default Card;