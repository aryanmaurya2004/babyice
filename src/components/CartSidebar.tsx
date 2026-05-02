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
              <div key={item.flavor.id} className="group relative flex gap-4 items-center bg-white p-4 rounded-3xl shadow-sm border border-warm-pink/10 hover:shadow-md hover:border-warm-pink/30 transition-all duration-300">
                <div className={`w-20 h-20 rounded-full ${item.flavor.bg} flex items-center justify-center shrink-0 overflow-hidden shadow-inner border-4 border-white`}>
                  <img src={item.flavor.image} alt={item.flavor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-chocolate truncate text-lg">{item.flavor.name}</h4>
                  <div className="text-warm-pink font-semibold">{item.flavor.price}</div>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-4 bg-cream/50 rounded-full p-1 border border-chocolate/5">
                      <button
                        onClick={() => updateQuantity(item.flavor.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-chocolate hover:text-white hover:bg-warm-pink transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center text-chocolate">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.flavor.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-chocolate hover:text-white hover:bg-warm-pink transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.flavor.id)}
                  className="absolute top-4 right-4 p-2 text-chocolate/20 hover:text-strawberry hover:bg-strawberry/10 rounded-full transition-all"
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
