import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { getSectionsByClass } from '@/app/actions/classes/section'
import SectionCell from './Cell'

const SectionTable = async ({id}: {id: number}) => {
  const campusSection = await getSectionsByClass(id)

  return (
    <Accordion type="single" collapsible>
        <AccordionItem className='p-0' value="item-1">
            <AccordionTrigger className='p-0 pb-1'>Sections - {campusSection.length} </AccordionTrigger>
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
                        {campusSection.length > 0 ? (
                            campusSection.map((sec, index) => (
                                <SectionCell key={index} data={sec} />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No Section found.
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

export default SectionTable