import { getCities } from '@/actions/campus/cities'
import AddCampus from '@/components/campus/addCampus'
import AddCityForm from '@/components/campus/addCity'
import ManageCampusCard from '@/components/campus/ManageCampusCard'
import ManageCitiesCard from '@/components/campus/ManageCitiesCard'
import { Separator } from '@/components/ui/separator'
import React, { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image'

const AddCampusPage = async() => {
    const cities = await getCities()
  return (
    <div>
        <div className='rounded-xl overflow-clip my-4 w-full'>
                <Image
                src={'/manage-campuses.png'}
                className='w-full h-auto object-contain'
                alt="Authentication Cover"
                width={1500}
                height={500}
                draggable={false}
                />
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
            
            <Suspense fallback={
                <Skeleton className="min-h-64 px-6 py-8 space-y-6">
                    <Skeleton className='h-6 w-32'/>
                    <Skeleton className='h-8 w-full'/>
                    <Skeleton className='h-8 w-full'/>
                    <Skeleton className='h-8 w-full'/>
                    <Skeleton className='h-8 w-24'/>
                
                </Skeleton>
            }>
                <AddCampus cities={cities}/>
            </Suspense>
        </div>
        {/* <Skeleton className="min-h-64 px-6 py-8 space-y-6">
            <Skeleton className='h-6 w-32'/>
            <Skeleton className='h-8 w-full'/>
            <Skeleton className='h-8 w-full'/>
            <Skeleton className='h-8 w-full'/>
            <Skeleton className='h-8 w-24'/>
          
        </Skeleton> */}

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

            <Suspense fallback={
                <Skeleton className="min-h-64 px-6 py-8 space-y-6">
                    <Skeleton className='h-6 w-32'/>
                    <Skeleton className='h-8 w-full'/>               
                </Skeleton>
            }>
                <AddCityForm />
            </Suspense>
        </div>
    </div>
  )
}

export default AddCampusPage