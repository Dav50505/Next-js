import {FaHeart} from 'react-icons/fa'
import {Button} from '../ui/button'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FavoriteToggleButton({productId}:{productId:string}) {
  // TODO: Implement favorite toggle functionality using productId
  return (
    <Button size='icon' variant='outline' className='p-2 cursor-pointer'> 
      <FaHeart />
    </Button>
  )
}

export default FavoriteToggleButton