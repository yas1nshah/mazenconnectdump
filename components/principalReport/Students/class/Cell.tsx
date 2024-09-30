import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CornerDownRightIcon } from 'lucide-react';
import useStudentModule, { StudentModuleClass } from '@/stores/principalReport/students';
import { Input } from '@/components/ui/input';
import SectionTable from '../section/table';
// import SectionTable from '../section/Table';



const ClassTableCell = ({data, index}: {data: StudentModuleClass, index: number}) => {
    const store = useStudentModule()
  return (
    <>
        <TableRow>
            <TableCell>
                <Input 
                disabled
                value={data.name}
                onChange={(e) => store.updateClass(data.id, {name: e.target.value})}
                />
            </TableCell>
            <TableCell>
                <Input 
                disabled={data.sectionCount !== 0}
                type='number'
                value={data.previous}
                // onChange={(e) => store.updateClass(data.id, {name: e.target.value})}
                />
            </TableCell>
            <TableCell>
                <Input 
                disabled={data.sectionCount !== 0}
                value={data.left}
                onChange={(e) => store.updateClass(data.id, {name: e.target.value})}
                />
            </TableCell>
            <TableCell>
                <Input 
                disabled={data.sectionCount !== 0}
                value={data.new}
                onChange={(e) => store.updateClass(data.id, {name: e.target.value})}
                />
            </TableCell>
            <TableCell>
                <Input 
                disabled={data.sectionCount !== 0}
                value={data.promoted}
                onChange={(e) => store.updateClass(data.id, {name: e.target.value})}
                />
            </TableCell>
            <TableCell>
                <Input 
                disabled={data.sectionCount !== 0}
                value={data.transfered}
                onChange={(e) => store.updateClass(data.id, {name: e.target.value})}
                />
            </TableCell>
            <TableCell>
                <Input 
                disabled={data.sectionCount !== 0}
                value={data.total}
                onChange={(e) => store.updateClass(data.id, {name: e.target.value})}
                />
            </TableCell>
            <TableCell className='flex gap-2'>
                <Input 
                disabled={data.sectionCount !== 0}
                value={data.boys}
                onChange={(e) => store.updateClass(data.id, {name: e.target.value})}
                />
                <p className="text-2xl">/</p>
                <Input 
                disabled={data.sectionCount !== 0}
                value={data.boys}
                onChange={(e) => store.updateClass(data.id, {name: e.target.value})}
                />
            </TableCell>
            <TableCell>
                <Input 
                disabled={data.sectionCount !== 0}
                value={data.sections.length}
                onChange={(e) => store.updateClass(data.id, {name: e.target.value})}
                />
            </TableCell>
            <TableCell>
                <Input 
                disabled={data.sectionCount !== 0}
                value={data.studentPerSection}
                onChange={(e) => store.updateClass(data.id, {name: e.target.value})}
                />
            </TableCell>

        </TableRow>
        

        <TableRow className='bg-primary/15 hover:bg-primary/20'>
            <TableCell className='flex justify-end'>
                <CornerDownRightIcon className='h-5 opacity-50' />
            </TableCell>
            <TableCell colSpan={9}>
                {/* <SectionTable id={data.id}/> */}
                <SectionTable classId={data.id} data={data.sections} classIndex={index}/>
            </TableCell>
        </TableRow>

    </>
  )
}

export default ClassTableCell