"use client"
import React from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { deleteDesignation } from '@/app/actions/employees/dessignations'
import { useRouter } from 'next/navigation'

type department = {
  name: string
  id: number
}

const DesignationCell = ({data}: {data: department}) => {
  const router = useRouter()
  return (
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
                This action cannot be undone. This will permanently delete your Campus.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {/* Ensure this button is not nested inside another button */}
              <DialogClose className="bg-destructive text-destructive-foreground text-sm px-4 py-2 rounded-sm" onClick={async () => {
                await deleteDesignation(data.id);
                router.refresh();
              }}>
                 Confirm Delete
              </DialogClose>
              
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </TableCell>
    </TableRow>
  )
}

export default DesignationCell