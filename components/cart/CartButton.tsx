import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { ShoppingCart } from 'lucide-react'

function CartButton() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Subscribe to cart changes
    const channel = supabase
      .channel('cart_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'cart_items' 
        }, 
        () => {
          // Refresh cart count when changes occur
          fetchCartCount()
        }
      )
      .subscribe()

    // Initial cart count fetch
    fetchCartCount()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchCartCount = async () => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('quantity')
      
      if (error) throw error

      const totalItems = data.reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(totalItems)
    } catch (error) {
      console.error('Error fetching cart count:', error)
    }
  }

  return (
    <div className="relative">
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  )
}

export default CartButton