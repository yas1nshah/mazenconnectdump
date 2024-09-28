
import React from 'react'
import { TableCell, TableRow } from '../../ui/table'
import {
  CornerDownRightIcon,
} from "lucide-react"
import DesignationsTable from '../designations/DesignationsTable'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { deleteDepartment } from '@/app/actions/employees/departments';
import DepartmentalCellDel from './DepartmentalCellDel';

type department = {
  name: string
  id: number
}

const DepartmentalCell = ({data}: {data: department}) => {

  return (
    <>
    <TableRow>
      <TableCell>{data.id}</TableCell>
      <TableCell>{data.name}</TableCell>
      <TableCell className='text-right'>
      <Dialog>
          {/* Use DialogTrigger with asChild to prevent button nesting */}
          <DialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. You also need to delete all designations associated with this department first.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {/* Ensure this button is not nested inside another button */}
              <DepartmentalCellDel id={data.id}/>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>

    <TableRow className='bg-primary/15 hover:bg-primary/20'>
      <TableCell className='flex justify-end'>
        <CornerDownRightIcon className='h-5 opacity-50' />
      </TableCell>
      <TableCell colSpan={2}>
        <DesignationsTable id={data.id}/>
      </TableCell>
    </TableRow>
    </>
  )
}

export default DepartmentalCell