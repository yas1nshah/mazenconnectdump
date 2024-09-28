import AnimatedHeading from '@/components/general/AnimatedHeading'
import React from 'react'

const Home = () => {
  return (
    <div className="py-6">
      <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Connect by' varient='heading' />
      <AnimatedHeading className='font-misologist font-normal' title='Mazen Schools' varient='heading' />
    </div>
  )
}

export default Home