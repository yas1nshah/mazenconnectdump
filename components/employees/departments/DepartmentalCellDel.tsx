"use client"
import { deleteDepartment } from '@/app/actions/employees/departments'
import { DialogClose } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import React from 'react'

const DepartmentalCellDel = ({id}: {id: number}) => {
    const router = useRouter()
  return (
    <DialogClose className="bg-destructive text-destructive-foreground text-sm px-4 py-2 rounded-sm" onClick={async () => {
        await deleteDepartment(id);
        router.refresh();
      }}>
         Confirm Delete
      </DialogClose>
  )
}

export default DepartmentalCellDel