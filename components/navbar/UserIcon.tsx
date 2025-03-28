import { LuUser } from 'react-icons/lu';
import { currentUser } from '@clerk/nextjs/server';

async function UserIcon() {
  try {
    const user = await currentUser();
    const profileImage = user?.imageUrl;
    
    if (profileImage) {
      return (
        <img src={profileImage} className='w-6 h-6 rounded-full object-cover' />
      );
    }
    
    // Provide a fallback UI when no user or profile image is available
    return <LuUser className='w-6 h-6 bg-primary rounded-full text-white' />;
  } catch (error) {
    console.error("Error fetching current user:", error);
    // Return a fallback UI when an error occurs
    return <LuUser className='w-6 h-6 bg-primary rounded-full text-white' />;
  }
}

export default UserIcon;