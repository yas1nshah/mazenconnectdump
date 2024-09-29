import { getDepartments } from '@/app/actions/employees/departments'
import { getDesignations } from '@/app/actions/employees/dessignations'
import { getEmployeesStatus } from '@/app/actions/employees/employees'
import AddEmployees from '@/components/employees/AddEmployees'
import ManageDepartments from '@/components/employees/departments/ManageDepartments'
import EmployeesTable from '@/components/employees/EmployeesTable'
import AnimatedHeading from '@/components/general/AnimatedHeading'
import React from 'react'

const AddEmployeesPage = async () => {
    const departments = await getDepartments()
    const designations = await getDesignations()
    const status = await getEmployeesStatus()

  return (
    <div className='py-6 space-y-4'>
      <div>
        <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Manage' varient='heading' />
        <AnimatedHeading className='font-misologist font-normal' title='Campus Employees' varient='heading' />
      </div>
      
      <EmployeesTable/>
      <AddEmployees departments={departments} designations={designations} status={status}/>
    </div>
  )
}

export default AddEmployeesPage