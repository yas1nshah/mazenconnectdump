import { getCities } from '@/actions/campus/cities'
import AddCampus from '@/components/campus/addCampus'
import AddCityForm from '@/components/campus/addCity'
import ManageCampusCard from '@/components/campus/ManageCampusCard'
import ManageCitiesCard from '@/components/campus/ManageCitiesCard'
import { Separator } from '@/components/ui/separator'
import React, { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image'
import AnimatedHeading from '@/components/general/AnimatedHeading'

const CampusPage = async() => {
  return (
    <div className='py-6'>
        {/* <div className='rounded-xl overflow-clip my-4 w-full'>
                <Image
                src={'/manage-campuses.png'}
                className='w-full h-auto object-contain'
                alt="Authentication Cover"
                width={1500}
                height={500}
                draggable={false}
                />
            </div> */}
            <div className="mb-4">
            <AnimatedHeading className='font-misologist font-light text-2xl text-primary' title='Manage' varient='heading' />
            <AnimatedHeading className='font-misologist font-normal' title='Campuses' varient='heading' />
            </div>
        <div className='flex gap-4'>
            <div className="flex-grow">
                <Suspense fallback={
                    <Skeleton className="min-h-64 px-6 py-8 space-y-6">
                        <Skeleton className='h-6 w-24'/>
                        <Skeleton className='h-36 w-full'/>
                    </Skeleton>
                }>
                    <ManageCampusCard/>
                </Suspense>
            </div>
            
           
        </div>

        <Separator className='my-6 opacity-25'/>

        <div className='flex gap-4'>
            <div className="flex-grow">
                <Suspense fallback={
                    <Skeleton className="min-h-64 px-6 py-8 space-y-6">
                        <Skeleton className='h-6 w-24'/>
                        <Skeleton className='h-36 w-full'/>
                    </Skeleton>
                }>
                    <ManageCitiesCard/>
                </Suspense>
            </div>

          
        </div>
    </div>
  )
}

export default CampusPage