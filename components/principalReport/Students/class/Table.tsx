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
import { getClasses } from '@/app/actions/classes/class'
import ClassTableCell from '@/components/principalReport/Students/class/Cell'
import { CampusClass, CampusClassWithSections } from '@/app/actions/principalReport/students'
import useStudentModule from '@/stores/principalReport/students'

const ClassTable =  () => {
    const store = useStudentModule()
  return (
    <Card>
    <CardHeader>
        <CardTitle>Module Students</CardTitle>
        <CardDescription>If a Class has Sections Enter Data in the Sections Table the Class will automatically Update</CardDescription>
    </CardHeader>
    <CardContent>
        <Table className='bg-accent p-6 rounded-md my-4 overflow-clip'>
            <TableHeader className='bg-secondary '>
                <TableRow>
                    <TableHead className="w-[100px] text-secondary-foreground">Name</TableHead>
                    <TableHead className='text-secondary-foreground'>Prev</TableHead>
                    <TableHead className='text-secondary-foreground'>Left</TableHead>
                    <TableHead className='text-secondary-foreground'>New</TableHead>
                    <TableHead className='text-secondary-foreground'>Promoted</TableHead>
                    <TableHead className='text-secondary-foreground'>Transfered</TableHead>
                    <TableHead className='text-secondary-foreground'>Total</TableHead>
                    <TableHead className='text-secondary-foreground'>Boys/Girls</TableHead>
                    <TableHead className='text-secondary-foreground'>Sections</TableHead>
                    <TableHead className='text-secondary-foreground'>Ratio / sec</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {store.classes.length > 0 ? (
                    store.classes.map((item, index) => (
                        <ClassTableCell key={index} data={item}  index={index}/>
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

export default ClassTable