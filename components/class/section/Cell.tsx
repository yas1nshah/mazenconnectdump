import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react'

type campusSection =  {
    id: number;
    class: number;
    name: string;
}

const SectionCell = ({data}: {data: campusSection}) => {
  return (
    <TableRow>
        <TableCell>{data.id}</TableCell>
        <TableCell>{data.name}</TableCell>
        <TableCell className='text-right'> 
            <button className='bg-accent text-accent-foreground font-bold py-2 px-4 rounded-md'>Edit</button>
        </TableCell>
    </TableRow>
  )
}

export default SectionCell