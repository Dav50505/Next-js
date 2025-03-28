import LoadingContainer from '@/components/global/LoadingContainer'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Hero from '@/components/home/Hero'
import React from 'react'
import { Suspense } from 'react'

function homePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts/>
      </Suspense>
    </>
  )
}

export default homePage