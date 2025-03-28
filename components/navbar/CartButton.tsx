import { Button } from "../ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

function CartButton() {
  const numInCart = 0;
  return (
    <Button asChild variant='outline' size='icon' className="flex justify-center items-center relative">
      <Link href='/'>
        <ShoppingCart className="w-6 h-6"/>
        <span className="absolute -top-3 -right-3 rounded-full bg-red-600 size-5 flex items-center justify-center text-lg">
          {numInCart}
        </span>
      </Link>

    </Button>
  )
}

export default CartButton