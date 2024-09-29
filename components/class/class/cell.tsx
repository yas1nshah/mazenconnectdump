import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CornerDownRightIcon } from 'lucide-react';
import SectionTable from '../section/Table';


type campusClass = {
    id: number;
    name: string;
    campus: number;
}

const ClassTableCell = ({data}: {data: campusClass}) => {
  return (
    <>
        <TableRow>
            <TableCell>{data.id}</TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell className='text-right'>
                <button className='bg-accent text-accent-foreground font-bold py-2 px-4 rounded-md'>Edit</button>
            </TableCell>

        </TableRow>
        

        <TableRow className='bg-primary/15 hover:bg-primary/20'>
            <TableCell className='flex justify-end'>
                <CornerDownRightIcon className='h-5 opacity-50' />
            </TableCell>
            <TableCell colSpan={2}>
                <SectionTable id={data.id}/>
            </TableCell>
        </TableRow>

    </>
  )
}

export default ClassTableCell