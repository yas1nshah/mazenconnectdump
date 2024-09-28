import { getDepartments } from '@/app/actions/employees/departments'
import AddDepartment from '@/components/employees/departments/AddDepartment'
import AddDesignation from '@/components/employees/designations/AddDesignation'
import ManageDepartments from '@/components/employees/departments/ManageDepartments'
import AnimatedHeading from '@/components/general/AnimatedHeading'
import React from 'react'
import { Separator } from '@/components/ui/separator'

const RolePage = async () => {
    const departments = await getDepartments()
  return (
    <div className='py-6 space-y-4'>
    <div>
      <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Add' varient='heading' />
      <AnimatedHeading className='font-misologist font-normal' title='Employees Roles' varient='heading' />
    </div>

    <ManageDepartments/>
    <Separator className='my-6 opacity-25'/>
    <div className="flex gap-4">
        <AddDepartment/>
        <AddDesignation departments={departments}/>
    </div>
  </div>
  )
}

export default RolePage