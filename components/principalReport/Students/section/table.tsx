import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getSectionsByClass } from '@/app/actions/classes/section'
import { StudentModuleSection } from '@/stores/principalReport/students'
import SectionCell from './Cell'


const SectionTable = ({classId, data, classIndex}: {classId: number, data: StudentModuleSection[], classIndex: number}) => {
  return (
        <Accordion type="single" collapsible>
            <AccordionItem className='p-0' value="item-1">
                <AccordionTrigger className='p-0 pb-1'>Sections - {data.length} </AccordionTrigger>
                <AccordionContent>
                    <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
                        <TableHeader className='bg-secondary '>
                            <TableRow>
                                <TableHead className="text-secondary-foreground">Name</TableHead>
                                <TableHead className='text-secondary-foreground'>Prev</TableHead>
                                <TableHead className='text-secondary-foreground'>Left</TableHead>
                                <TableHead className='text-secondary-foreground'>New</TableHead>
                                <TableHead className='text-secondary-foreground'>Promoted</TableHead>
                                <TableHead className='text-secondary-foreground'>Transfered</TableHead>
                                <TableHead className='text-secondary-foreground'>Total</TableHead>
                                <TableHead className='text-secondary-foreground'>Boys/Girls</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.length > 0 ? (
                                data.map((sec, index) => (
                                    <SectionCell classId={classId} key={index} data={sec} classIndex={classIndex}/>
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