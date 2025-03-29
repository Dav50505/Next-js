'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignInButton } from '@clerk/nextjs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuTrash2, LuSquarePen } from 'react-icons/lu';

type btnSize = 'default' | 'lg' | 'sm';

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

export function SubmitButton({className='', text='Submit', size='lg'}:SubmitButtonProps) {
    const {pending} = useFormStatus();
    return(
        <Button type='submit' className={cn('capitalize', className)} size={size} disabled={pending}>
            {pending ? <><ReloadIcon className='size-4 mr-2 animate-spin' /> Please wait... </> : text}
        </Button>
    )
}
