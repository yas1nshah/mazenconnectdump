import { getClasses } from '@/app/actions/classes/class'
import { getClassesWithSections } from '@/app/actions/principalReport/students'
import AnimatedHeading from '@/components/general/AnimatedHeading'
import PrincipalReportNav from '@/components/principalReport/nav'
import StudentFormModule from '@/components/principalReport/Students/module'
// import PRStaffModule from '@/components/principalReport/staff'

import React from 'react'

const AddPrincipalReportPage = async () => {
    const  classes = await getClasses()
    const classesWithSections = await getClassesWithSections()
  return (
    <div className='py-6'>
        <div>
            <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Submit ' varient='heading' />
            <AnimatedHeading className='font-misologist font-normal' title='Principal Report' varient='heading' />
        </div>

        <PrincipalReportNav/>


        <StudentFormModule campusClass={classes} data={classesWithSections}/>
        <div className="">
            {/* <PRStaffModule/> */}

        </div>
    </div>

)}

export default AddPrincipalReportPage