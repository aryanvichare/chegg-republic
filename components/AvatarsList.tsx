import React from "react";
import BlurImage from "./BlurImage";

const AvatarsList = () => {
  return (
    <div className='isolate flex -space-x-2 overflow-hidden'>
      <BlurImage
        width={32}
        height={32}
        className='relative z-30 inline-block h-8 w-8 rounded-full ring-2 ring-background'
        src='https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
      <BlurImage
        width={32}
        height={32}
        className='relative z-20 inline-block h-8 w-8 rounded-full ring-2 ring-background'
        src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
      <BlurImage
        width={32}
        height={32}
        className='relative z-10 inline-block h-8 w-8 rounded-full ring-2 ring-background'
        src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
        alt=''
      />
      <BlurImage
        width={32}
        height={32}
        className='relative z-0 inline-block h-8 w-8 rounded-full ring-2 ring-background'
        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
    </div>
  );
};

export default AvatarsList;
