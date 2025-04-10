import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format";
import { createOrderAction } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { Cart } from "@prisma/client";

function CartTotals({cart}:{cart:Cart}) {
  const {cartTotal, tax, shipping, orderTotal} = cart;
  return (
    <div>
      <Card className="p-8">
        <CartTotalRow label='Subtotal' amount={cartTotal} />
        <CartTotalRow label='Tax' amount={tax} />
        <CartTotalRow label='Shipping' amount={shipping} />
        <CardTitle className="mt-8">
          <CartTotalRow label='Total' amount={orderTotal} lastRow />
        </CardTitle>
      </Card>
      <FormContainer action={createOrderAction}>
        <SubmitButton className="w-full mt-8 bg-red-600 hover:bg-red-700" text="Place Order" />
      </FormContainer>
    </div>
  )
}

function CartTotalRow({label,amount, lastRow}:{label:string, amount:number, lastRow?:boolean}){
  return<>
  <p className="flex justify-between text-sm">
    <span>{label}</span>
    <span>{formatCurrency(amount)}</span>
  </p>
    {lastRow ? <Separator className="border-dashed !bg-white" /> : <Separator className="!bg-gray-400" />}
  </>
}

export default CartTotals