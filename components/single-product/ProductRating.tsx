import {FaStar} from 'react-icons/fa'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProductRating({productId}:{productId:string}) {
    // TODO: Implement dynamic rating fetching using productId
    const rating = 4.5;
    const count = 250;
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