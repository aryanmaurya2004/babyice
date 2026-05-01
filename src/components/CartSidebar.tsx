import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartSidebar() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl flex flex-col animate-slide-in-right">
        <div className="p-6 flex items-center justify-between border-b border-warm-pink/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-warm-pink" />
            <h2 className="font-display text-2xl font-bold text-chocolate">Your Cart</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-chocolate/60 hover:text-warm-pink transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-chocolate/50">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.flavor.id} className="flex gap-4 items-center bg-cream/30 p-3 rounded-2xl border border-warm-pink/5">
                <div className={`w-16 h-16 rounded-xl ${item.flavor.bg} flex items-center justify-center text-3xl shrink-0`}>
                  {item.flavor.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-chocolate truncate">{item.flavor.name}</h4>
                  <div className="text-warm-pink font-medium">{item.flavor.price}</div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.flavor.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-chocolate hover:text-warm-pink hover:bg-warm-pink/5 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.flavor.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-chocolate hover:text-warm-pink hover:bg-warm-pink/5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.flavor.id)}
                  className="p-2 text-chocolate/40 hover:text-strawberry transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-cream border-t border-warm-pink/10">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-chocolate">Subtotal</span>
              <span className="font-bold text-xl text-chocolate">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-warm-pink text-white py-4 rounded-full font-semibold hover:bg-strawberry transition-colors shadow-lg shadow-warm-pink/25">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
