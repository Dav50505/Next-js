import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AddToCart ({productId, className}:{productId:string, className?: string}) {
  // TODO: Implement add to cart functionality using productId
  return (
    <Button className={cn("capitalize mt-8", className)} size='lg'>
        Add to cart
    </Button>
  )
}

export default AddToCart