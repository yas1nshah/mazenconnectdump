import { getEmployeesByDepartment } from '@/app/actions/employees/employees'
import React from 'react'
import { TableBody, TableCell, TableRow } from '../ui/table'

const EmployeesByDep = async ({department}: {department: number}) => {

  const employees = await getEmployeesByDepartment(department)
  return (
    <TableBody>
        {
          employees.map((employee, index) => (
            <TableRow key={index}>
              <TableCell className='text-accent-foreground font-bold'>{employee.id}</TableCell>
              <TableCell className='text-accent-foreground font-bold'>{employee.name}</TableCell>
              <TableCell className='text-accent-foreground font-bold'>{employee.name}</TableCell>
              <TableCell className='text-accent-foreground font-bold'>Rs {employee.salary}</TableCell>
              {/* <td className='text-accent-foreground font-bold'>{employee.Staff?.dateJoined as string}</td> */}
              <TableCell className='text-accent-foreground font-bold'>{employee.dateJoined ? employee.dateJoined.toDateString() : "N/A"}</TableCell>
              <TableCell className='text-accent-foreground font-bold'>{employee.status}</TableCell>
              <TableCell className='text-accent-foreground font-bold text-right'>
                <button className='bg-accent text-accent-foreground font-bold py-2 px-4 rounded-md'>Edit</button>
              </TableCell>
            </TableRow>
          ))
        }
    </TableBody>
  )
}

export default EmployeesByDep