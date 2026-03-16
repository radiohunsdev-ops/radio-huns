import React from 'react'

const LoadMore = () => {
  return (
    <div className="my-14 flex flex-col items-center text-[#1F3A44] font-serif">
      <p className="text-[20px] mb-4">Load More</p>
      <div className="w-5 h-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 36 36">
          <path d="M17.5,35A17.5,17.5,0,1,1,35,17.5,17.52,17.52,0,0,1,17.5,35Zm0-34A16.5,16.5,0,1,0,34,17.5,16.52,16.52,0,0,0,17.5,1Z"></path>
          <path
            d="M14.92,26.71a.51.51,0,0,1-.36-.15.51.51,0,0,1,0-.71l8.13-8.13L14.56,9.59a.5.5,0,1,1,.71-.71l8.48,8.49a.5.5,0,0,1,0,.71l-8.48,8.48A.5.5,0,0,1,14.92,26.71Z"
            transform="rotate(90,17.5,17.5)"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default LoadMore
