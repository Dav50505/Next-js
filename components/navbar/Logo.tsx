import React from 'react';
import { FaCouch } from 'react-icons/fa';
import { Button } from '../ui/button';
import Link from 'next/link';

function Logo() {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <FaCouch className='size-7 text-primary bg-red-600 rounded' />
      </Link>
    </Button>
  );
}

export default Logo;
