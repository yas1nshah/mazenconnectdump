import AnimatedHeading from '@/components/general/AnimatedHeading'
import React from 'react'

const EmployeesPage = () => {
  return (
    <div className='py-6'>
      <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Manage' varient='heading' />
      <AnimatedHeading className='font-misologist font-normal' title='Campus Employees' varient='heading' />
    </div>
  )
}

export default EmployeesPage