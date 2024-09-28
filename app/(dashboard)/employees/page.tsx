import ManageDepartments from '@/components/employees/departments/ManageDepartments'
import AnimatedHeading from '@/components/general/AnimatedHeading'
import React from 'react'

const EmployeesPage = () => {
  return (
    <div className='py-6 space-y-4'>
      <div>
        <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Manage' varient='heading' />
        <AnimatedHeading className='font-misologist font-normal' title='Campus Employees' varient='heading' />
      </div>

      <ManageDepartments/>
    </div>
  )
}

export default EmployeesPage