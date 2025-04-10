'use client'

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function loading() {
  return (
    <div className='grid md:grid-cols-2 gap-8 mt-4'>
        <ReviewLoadingCard />
        <ReviewLoadingCard />
    </div>
  )
}

const ReviewLoadingCard = ()=>{
    return (
        <Card>
            <div className='flex items-center'>
                <Skeleton className='w-12 h-12 rounded-full bg-gray-200 ml-4' />
                <div className='ml-4'>
                    <Skeleton className='w-[150px] h-4 mb-2 bg-gray-200'/>
                    <Skeleton className='w-[150px] h-4 bg-gray-200'/>
                </div>
            </div>
        </Card>
    )
}

export default loading