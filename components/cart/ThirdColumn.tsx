"use client";
import { useState } from "react";
import SelectProductAmount from "../single-product/SelectProductAmount";
import { Mode } from "../single-product/SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions";
import { toast } from 'sonner';

function ThirdColumn({quantity, id}:{quantity:number, id:string}) {
  const [amount, setAmount] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false); 
  const handleAmountChange = async(value:number)=>{
    setIsLoading(true);
    toast('Updating cart item...', { duration: 2000 });
    const result = await updateCartItemAction({
      amount:value,
      cartItemId:id,
    })
    setAmount(value)
    toast(result.message)
    setIsLoading(false);
  }

  return (
    <div className="md:ml-8">
      <SelectProductAmount amount={amount} mode={Mode.CartItem} isLoading={false} setAmount={handleAmountChange}/>
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name='id' value={id} />
        <SubmitButton size='sm' text='Remove' className="mt-4 bg-red-600 hover:bg-red-700" />
      </FormContainer> 
    </div>
  )
}

export default ThirdColumn