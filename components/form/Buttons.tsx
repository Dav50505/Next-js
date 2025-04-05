'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucidePenSquare, LucideTrash2, } from 'lucide-react';
import { SignInButton } from '@clerk/nextjs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

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

type actionType = 'edit' | 'delete';

export const ActionButton = ({type}:{type: actionType}) => {
    const {pending} = useFormStatus();
    const renderIcon = () =>{
        switch(type){
            case 'edit':
                return <LucidePenSquare />
            case 'delete':
                return <LucideTrash2 />
            default:
                const never: never = type;
                throw new Error(`Invalid action type: ${never}`);
        }
    }
    return <Button type='submit' size='icon' variant='link' className='p-2 cursor-pointer'>
        {pending ?<ReloadIcon className='size-4 animate-spin' /> : renderIcon()}
    </Button>
}

export const CardSignInButton = () =>{
    return (
        <SignInButton mode='modal'>
            <Button type='button' className='p-2 cursor-pointer' variant='outline' size='icon'>
                <FaRegHeart />
            </Button>
        </SignInButton>
    )
}

export const CardSubmitButton =({isFavorite}:{isFavorite:boolean})=>{
    const {pending} = useFormStatus();
    return (
        <Button type='submit' size='icon' variant='outline' className='p-2 cursor-pointer'>
            {pending?<ReloadIcon className='animate-spin'/>:isFavorite? <FaHeart/> : <FaRegHeart/>}
        </Button>
    )
}

