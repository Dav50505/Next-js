import { LuUser } from 'react-icons/lu';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';

async function UserIcon() {
  try {
    const user = await currentUser();
    const profileImage = user?.imageUrl;
    
    if (profileImage) {
      return (
        <Image 
          src={profileImage} 
          alt={`${user?.firstName || 'User'}'s profile`}
          width={24}
          height={24}
          className='rounded-full object-cover' 
        />
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