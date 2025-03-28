import React from 'react'
import { CardContent } from '../ui/card'
import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

function LoadingProduct() {
  return (
    <Card>
      <CardContent className='p-4'>
        <Skeleton className='h-48 w-full bg-gray-200' />
        <Skeleton className='h-4 w-3/4 mt-4 bg-gray-200' />
        <Skeleton className='h-4 w-1/2 mt-4 bg-gray-200' />
      </CardContent>
    </Card>
  )
}

function LoadingContainer() {
  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <LoadingProduct />
      <LoadingProduct />
      <LoadingProduct />
    </div>
  )
}

export default LoadingContainer