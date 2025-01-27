import InfoCard from '@/app/components/InfoCard'
import ServiceCountChart from '@/app/components/ServiceCountChart'
import React from 'react'

const AdminPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row bg-gray-100'>
      {/* Left */}

      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
      {/* cards */}
        <div className='flex gap-4 justify-between flex-wrap'>
          <InfoCard type="services"/>
          <InfoCard type="Services"/>
          <InfoCard type="Services"/>
          <InfoCard type="Services"/>
        </div>
        {/* Middle Charts */}
        <div className=' flex gap-4 flex-col lg:flex-row'>
          {/* ServiceCountChart */}
          <div className='w-100 lg:w-1/3 h-[450px]'>
          <ServiceCountChart/>
          </div>
          {/* AttendanceChart */}
          <div className='w-100 lg:w-2/3 h-[450px]'>
          </div>
        </div>
        {/* Bottom Charts */}
        <div></div>
      </div>


      {/* right side */}
      <div className='w-full lg:w-1/3 bg-cyan-300'>r</div>
    
    </div>
  )
}

export default AdminPage
