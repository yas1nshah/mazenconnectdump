import { getDepartments } from '@/app/actions/employees/departments'
import AddDepartment from '@/components/employees/departments/AddDepartment'
import AddDesignation from '@/components/employees/designations/AddDesignation'
import ManageDepartments from '@/components/employees/departments/ManageDepartments'
import AnimatedHeading from '@/components/general/AnimatedHeading'
import React from 'react'

const RolePage = async () => {
    const departments = await getDepartments()
  return (
    <div className='py-6 space-y-4'>
    <div>
      <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Manage' varient='heading' />
      <AnimatedHeading className='font-misologist font-normal' title='Employees Roles' varient='heading' />
    </div>

    <ManageDepartments/>
  </div>
  )
}

export default RolePage