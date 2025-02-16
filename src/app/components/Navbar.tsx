import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4 bg-white'>
      <span className='hidden md:inline text-[25px] font-bold whitespace-nowrap'>Auto Miraj</span>
      {/* Search Bar*/}
      <div className='relative flex w-[350px] h-[45px]'>
      <Image 
        src="/BottomBar/ServiceStationIcon.jpeg" 
        alt='' 
        fill 
        style={{ objectFit: 'contain' }} 
        />
      </div>
      {/*  Icons and User*/}
      <div className='flex justify-end w-full'>
          <div className='flex items-center gap-6'>
             <div className='flex items-center gap-2 text-xs rounded-full bg-gray-100 ring-[1.5px] px-2 ring-gray-100'>
                 <Image src={"/BottomBar/search.png"} alt='' width={18} height={20} className='ml-2'/>
                 <input type="text" placeholder="Search..." className='w-[10px] md:w-[200px] p-3 bg-transparent outline-none'></input>
              </div>
            <div className='bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer'>
            <Image src={"/Bottombar/announcement.png"} alt='' width={20} height={12}></Image>
            </div>
            <div className='flex flex-col'>
              <span className='text-base whitespace-nowrap leading-3 font-medium'>Sithum Duleka</span>
              <span className='text-[13px] text-gray-500 text-right '>Admin</span>
            </div>
            <Image src={"/BottomBar/ProfileIcon.png"} alt='' width={36} height={12} className='rounded-full'></Image>
          </div>
      </div>
    </div>
  )
}

export default Navbar
