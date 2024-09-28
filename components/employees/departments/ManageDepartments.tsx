import { getCampuses } from '@/app/actions/campus/campus'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import CampusCell from '@/components/campus/campusCell'
import { getDepartments } from '@/app/actions/employees/departments'
import DepartmentalCell from './DepartmentalCell'

const ManageDepartments = async () => {
    const departments = await getDepartments()
  return (
    <Card>
    <CardHeader>
        <CardTitle>Employee Roles</CardTitle>
        <CardDescription>Manage Departments and Designations</CardDescription>
    </CardHeader>
    <CardContent>
        <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
            <TableHeader className='bg-secondary '>
                <TableRow>
                    <TableHead className="w-[100px] text-secondary-foreground">ID</TableHead>
                    <TableHead className='text-secondary-foreground'>Name</TableHead>
                    <TableHead className='text-right text-secondary-foreground'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {departments.length > 0 ? (
                    departments.map((department, index) => (
                        <DepartmentalCell key={index} data={department} />
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center">
                            No Departments found.
                        </TableCell>
                    </TableRow>
                )}
        </TableBody>
        </Table>
    </CardContent>
    </Card>
  )
}

export default ManageDepartments