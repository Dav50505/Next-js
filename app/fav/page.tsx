import SectionTitle from '@/components/global/SectionTitle';
import { fetchUserFavorites } from '@/utils/actions';
import ProductsGrid from '@/components/products/ProductsGrid';


async function FavPage() {
  const favorites = await fetchUserFavorites();
  if(favorites.length === 0) return <SectionTitle text="You don't have any favorites"/>
  return (
    <div>
      <SectionTitle text='Favorites'/>
      <ProductsGrid products={favorites.map((fav)=>fav.product)}/>
    </div>
  )
}

export default FavPage