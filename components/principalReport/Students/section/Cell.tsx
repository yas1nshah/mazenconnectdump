import { Input } from '@/components/ui/input'
import { TableCell, TableRow } from '@/components/ui/table'
import useStudentModule, { StudentModuleSection } from '@/stores/principalReport/students'
import { parse } from 'path'
import React, { useEffect } from 'react'

const SectionCell = ({classId, data, classIndex}: {classId: number, data: StudentModuleSection, classIndex: number}) => {
    const store = useStudentModule()

    useEffect(() => {
        const totalPrevious = store.classes[classIndex]?.sections.reduce((total, section) => {
            return total + section.previous;
        }, 0);
    
        if (totalPrevious !== undefined) {
            store.updateClass(classId, { previous: totalPrevious });
        }

        const totalLeft = store.classes[classIndex]?.sections.reduce((total, section) => {
            return total + section.left;
        }, 0);

        if (totalLeft !== undefined) {
            store.updateClass(classId, { left: totalLeft });
        }

        const totalNew = store.classes[classIndex]?.sections.reduce((total, section) => {
            return total + section.new;
        }, 0);

        if (totalNew !== undefined) {
            store.updateClass(classId, { new: totalNew });
        }


        const totalPromoted = store.classes[classIndex]?.sections.reduce((total, section) => {
            return total + section.promoted;
        }, 0);

        if (totalPromoted !== undefined) {
            store.updateClass(classId, { promoted: totalPromoted });
        }

        const totalTransfered = store.classes[classIndex]?.sections.reduce((total, section) => {
            return total + section.transfered;
        }, 0);

        if (totalTransfered !== undefined) {
            store.updateClass(classId, { transfered: totalTransfered });
        }

        const totalTotal = store.classes[classIndex]?.sections.reduce((total, section) => {
            return total + section.total;
        }, 0);

        if (totalTotal !== undefined) {
            store.updateClass(classId, { total: totalTotal });
        }

        const totalBoys = store.classes[classIndex]?.sections.reduce((total, section) => {
            return total + section.boys;
        }, 0);

        if (totalBoys !== undefined) {
            store.updateClass(classId, { boys: totalBoys });
        }

        const totalGirls = store.classes[classIndex]?.sections.reduce((total, section) => {
            return total + section.girls;
        }, 0);

        if (totalGirls !== undefined) {
            store.updateClass(classId, { girls: totalGirls });
        }   


        store.updateClass(classId, { studentPerSection: parseFloat((store.classes[classIndex].total / store.classes[classIndex]?.sections.length).toFixed(2))  });

    }, [store.classes[classIndex]?.sections])

  return (
    <TableRow>
        <TableCell>
            <Input 
            disabled
            value={data.name}
            onChange={(e)=> {
                store.updateSection(classId,data.id, {name: e.target.value})
            }}
            />
        </TableCell>

        <TableCell>
            <Input 
            type='number'
            value={data.previous}
            onChange={(e) => store.updateSection(classId, data.id, { previous: parseInt(e.target.value, 10) || 0 })}
            />

        </TableCell>

        <TableCell>
            <Input 
            type='number'
            value={data.left}
            onChange={(e) => store.updateSection(classId, data.id, { left: parseInt(e.target.value, 10) || 0 })}
            />

        </TableCell>

        <TableCell>
            <Input 
            type='number'
            value={data.new}
            onChange={(e)=> store.updateSection(classId,data.id, {new: parseInt(e.target.value)})}
            />
        </TableCell>

        <TableCell>
            <Input 
            type='number'
            value={data.promoted}
            onChange={(e)=> store.updateSection(classId,data.id, {promoted: parseInt(e.target.value)})}
            />
        </TableCell>

        <TableCell>
            <Input 
            type='number'
            value={data.transfered}
            onChange={(e)=> store.updateSection(classId,data.id, {transfered: parseInt(e.target.value)})}
            />
        </TableCell>

        <TableCell>
            <Input 
            type='number'
            value={data.total}
            onChange={(e)=> store.updateSection(classId,data.id, {total: parseInt(e.target.value)})}
            />
        </TableCell>

        <TableCell className='flex gap-2'>
            <Input 
            type='number'
            value={data.boys}
            onChange={(e)=> store.updateSection(classId,data.id, {boys: parseInt(e.target.value)})}
            />
            /
            <Input 
            type='number'
            value={data.girls}
            onChange={(e)=> store.updateSection(classId,data.id, {girls: parseInt(e.target.value)})}
            />
        </TableCell>
    </TableRow>
  )
}

export default SectionCell