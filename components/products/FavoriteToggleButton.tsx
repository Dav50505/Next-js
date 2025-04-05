// import FaHeart from '...'; // Remove this line if it's not used
// import Button from '...'; // Remove this line if it's not used
// const isFavorite = ...; // Remove this line if it's not used
import { auth } from '@clerk/nextjs/server';
import { CardSignInButton } from '../form/Buttons';
import { fetchFavoriteId } from '@/utils/actions';
import FavoriteToggleForm from './FavoriteToggleForm';

async function FavoriteToggleButton({productId}:{productId:string}) {
  const authObject = await auth();
  const userId = authObject.userId;
  if(!userId) return <CardSignInButton />
  const favoriteId = await fetchFavoriteId({productId});

  return (
    <FavoriteToggleForm favoriteId={favoriteId} productId={productId}/>
  )
}

export default FavoriteToggleButton