import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getDesignationsbyDepartment } from '@/app/actions/employees/dessignations'
import { getEmployees } from '@/app/actions/employees/employees'
import { getDepartments } from '@/app/actions/employees/departments'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import EmployeesRow from './EmployeesByDep'
import EmployeesByDep from './EmployeesByDep'


  
const EmployeesTable = async () => {
    const designations = await getEmployees()
    const departments = await getDepartments()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Employee</CardTitle>
        <CardDescription>
          Please ensure accurate entries as this will affect all reports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {
            departments.map((department, index) => (
                <div key={index} className='mt-4'>
                    <div className='p-4 bg-accent rounded-md'>
                        <div className='flex justify-between'>
                            <h2 className='text-accent-foreground font-bold'>{department.name}</h2>
                        </div>
                    </div>
                    <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
                        <TableHeader className='bg-primary/20'>
                          <TableRow>
                            <TableHead className='text-accent-foreground font-bold'>ID</TableHead>
                            <TableHead className='text-accent-foreground font-bold'>Name</TableHead>
                            <TableHead className='text-accent-foreground font-bold'>Designation</TableHead>
                            <TableHead className='text-accent-foreground font-bold'>Salary</TableHead>
                            <TableHead className='text-accent-foreground font-bold'>Joined</TableHead>
                            <TableHead className='text-accent-foreground font-bold'>Status</TableHead>
                            <TableHead className='text-accent-foreground font-bold text-right'>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                          <EmployeesByDep department={department.id} />
                        
                    </Table>
                </div>
            ))
        }
      </CardContent>
    </Card>
  )
}

export default EmployeesTable