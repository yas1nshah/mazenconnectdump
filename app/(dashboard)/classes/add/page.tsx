import { getClasses } from '@/app/actions/classes/class'
import AddClass from '@/components/class/AddClass'
import AddSection from '@/components/class/AddSection'
import ClassTable from '@/components/class/class/table'
import AnimatedHeading from '@/components/general/AnimatedHeading'
import React from 'react'

const AddClassPage =async () => {

  const classes = await getClasses()
  return (
    <div className='py-6'>
      <div>
        <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Add' varient='heading' />
        <AnimatedHeading className='font-misologist font-normal' title='Campus Classes' varient='heading' />
      </div>

    <ClassTable/>

      <div className="flex gap-4">
        <AddClass/>
        <AddSection campusClasses={classes}/>
      </div>
    </div>
  )
}

export default AddClassPage