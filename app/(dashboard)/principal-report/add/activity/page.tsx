import AnimatedHeading from '@/components/general/AnimatedHeading'
import PrincipalReportNav from '@/components/principalReport/nav'
// import PRStaffModule from '@/components/principalReport/staff'

import { Badge } from '@/components/ui/badge'
import { PRStaff } from '@/drizzle/schema'
import { Building, Projector, TimerResetIcon, User2, Brain, SquareActivity, Weight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AddPRActivityModulePage = () => {
  return (
    <div className='py-6'>
        <div>
            <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Submit ' varient='heading' />
            <AnimatedHeading className='font-misologist font-normal' title='Principal Report' varient='heading' />
        </div>
        
        <PrincipalReportNav/>

        <div className="">
            {/* <PRStaffModule/> */}
        </div>
    </div>

)}

export default AddPRActivityModulePage