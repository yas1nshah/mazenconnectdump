import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { getDesignationsbyDepartment } from '@/app/actions/employees/dessignations'
import DepartmentalCell from '../departments/DepartmentalCell'
import DesignationCell from './DesignationCell'

  
const DesignationsTable = async ({id}: {id: number}) => {
    const designations = await getDesignationsbyDepartment(id)

  return (
    <Accordion type="single" collapsible>
        <AccordionItem className='p-0' value="item-1">
            <AccordionTrigger className='p-0 pb-1'>Designations - {designations.length} </AccordionTrigger>
            <AccordionContent>
                <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
                    <TableHeader className='bg-secondary '>
                        <TableRow>
                            <TableHead className="w-[100px] text-secondary-foreground">ID</TableHead>
                            <TableHead className='text-secondary-foreground'>Name</TableHead>
                            <TableHead className='text-right text-secondary-foreground'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {designations.length > 0 ? (
                            designations.map((department, index) => (
                                <DesignationCell key={index} data={department} />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No Employees found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    </Table>
            </AccordionContent>
        </AccordionItem>
    </Accordion>

  )
}

export default DesignationsTable