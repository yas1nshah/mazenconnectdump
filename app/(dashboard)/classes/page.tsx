import ClassTable from '@/components/class/class/table'
import AnimatedHeading from '@/components/general/AnimatedHeading'
import React from 'react'

const ClassesPage = () => {
  return (
    <div className='py-6 space-y-4'>
    <div>
      <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Add' varient='heading' />
      <AnimatedHeading className='font-misologist font-normal' title='Campus Classes' varient='heading' />
    </div>

  <ClassTable/>

  </div>
  )
}

export default ClassesPage