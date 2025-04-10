import {FaStar} from 'react-icons/fa'
import { fetchProductRating } from '@/utils/actions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function ProductRating({productId}:{productId:string}) {
    const {rating, count} = await fetchProductRating(productId);
    const className = `flex gap-1 items-center text-md mt-1 mb-4`;
    const countValue = `(${count} customer reviews)`

  return (
    <span className={className}>
        <FaStar className='size-3'/>
        {rating} {countValue}
    </span>
  )
}

export default ProductRating