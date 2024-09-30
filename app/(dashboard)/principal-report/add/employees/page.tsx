import { getStaff } from '@/app/actions/principalReport/employees'
import AnimatedHeading from '@/components/general/AnimatedHeading'
import PREmployeesModule from '@/components/principalReport/employees/module'
import PrincipalReportNav from '@/components/principalReport/nav'
// import PRStaffModule from '@/components/principalReport/staff'

import { Badge } from '@/components/ui/badge'
import { PRStaff } from '@/drizzle/schema'
import { validateRequest } from '@/lib/validateSession'
import { Building, Projector, TimerResetIcon, User2, Brain, SquareActivity, Weight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AddPREmployeesModulePage = async () => {
    const session = await validateRequest();

    const staff = await getStaff()
  return (
    <div className='py-6'>
        <div>
            <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Submit ' varient='heading' />
            <AnimatedHeading className='font-misologist font-normal' title='Principal Report' varient='heading' />
        </div>

        

        <PrincipalReportNav/>

        {
           JSON.stringify(staff)
        }

        <PREmployeesModule/>

        <div className="">
            {/* <PRStaffModule/> */}
        </div>
    </div>

)}

export default AddPREmployeesModulePage