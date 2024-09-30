"use client"
import useStudentModule from '@/stores/principalReport/students'
import React, { useEffect } from 'react'
import Sections from './Sections';
import { CampusClassWithSections } from '@/app/actions/principalReport/students';
import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import ClassTable from './class/Table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from "@/components/ui/textarea"


type CampusClass = {
  id: number;
  name: string;
  campus: number;
}



const StudentFormModule = ({campusClass, data}: {campusClass: CampusClass[], data: CampusClassWithSections[]}) => {

    const ststore = useStudentModule()

    useEffect(() => {
        const session = sessionStorage.getItem("student-module-storage")
        if(!session) {
        
        ststore.setClasses(
            data.map((cls) => ({
                id: cls.campusClass.id,
                name: cls.campusClass.name,
                previous: 0,
                left: 0,
                new: 0,
                transfered: 0,
                promoted: 0,
                total: 0,
                boys: 0,
                girls: 0,
                sectionCount: cls.section.length,
                studentPerSection: 0,
                sections: cls.section.map((sec) => ({
                    id: sec.id,
                    name: sec.name,
                    previous: 0,
                    left: 0,
                    new: 0,
                    transfered: 0,
                    promoted: 0,
                    total: 0,
                    boys: 0,
                    girls: 0,
                })),
            }))
        )
      }
    }, [campusClass])

  return (
    <div className='space-y-6'>

      <ClassTable/>

      <Card>
      <CardHeader>
          <CardTitle>Any Remarks</CardTitle>
          <CardDescription>Enter any remarks you have regarding this Module</CardDescription>
      </CardHeader>
      <CardContent>
          <Textarea
          
          />
      </CardContent>
      </Card>

    </div>
  )
}

export default StudentFormModule