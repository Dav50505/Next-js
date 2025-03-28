import { fetchFeaturedProducts } from '@/utils/actions'
import EmptyList from '../global/EmptyList'
import React from 'react'
import SectionTitle from '../global/SectionTitle'
import ProductsGrid from '../products/ProductsGrid'

async function FeaturedProducts() {
  const products = await fetchFeaturedProducts()
  if(products.length === 0) return <EmptyList heading='No featured products found'/>
  return (
    <section className='py-24'>
      <SectionTitle text='Featured Products'/>
      <ProductsGrid products={products}/>
    </section>
  )
}

export default FeaturedProducts