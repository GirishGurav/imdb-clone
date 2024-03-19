import React from 'react'

const Banner = () => {
  return (
    <div className='h-[20vh] md:h-[80vh] bg-cover bg-center flex items-end' style={{backgroundImage:'url(./m2.jpg)'}}>
        <div className='text-white tect-xl text-center w-full bg-gray-900/60 p-4'>Avengers</div>
    </div>
  )
}

export default Banner
