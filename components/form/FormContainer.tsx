'use client';

import { useActionState } from 'react';
import { useEffect } from 'react';
import { actionFunction } from '@/utils/types';
import { toast } from 'sonner';

const initialState = {
    message: ''
}

function FormContainer({action, children}:{action:actionFunction, children:React.ReactNode}) {
    const [state,forAction] = useActionState(action, initialState);
    
    useEffect(()=>{
        if(state.message){
            toast(state.message);
        }
    },[state])
  return (
    <form action={forAction}>{children}</form>
  )
}

export default FormContainer