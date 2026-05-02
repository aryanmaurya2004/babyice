import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { flavors } from '../data/flavors';
import { useCart } from '../context/CartContext';

export function FlavorDetails() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const flavor = flavors.find(f => f.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!flavor) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-cream text-center px-6">
        <h1 className="font-display text-4xl font-bold text-chocolate mb-4">Flavor Not Found</h1>
        <p className="text-chocolate/60 mb-8">We couldn't find the flavor you're looking for.</p>
        <Link to="/" className="bg-warm-pink text-white px-8 py-3 rounded-full font-semibold hover:bg-strawberry transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(flavor, quantity);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <Link to="/" className="inline-flex items-center gap-2 text-chocolate/60 hover:text-warm-pink transition-colors font-medium mb-10">
          <ArrowLeft className="w-5 h-5" />
          Back to Flavors
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className={`${flavor.bg} rounded-[3rem] p-12 aspect-square flex items-center justify-center relative overflow-hidden animate-slide-up shadow-xl shadow-black/5 border border-white/50`}>
            <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${flavor.color}`} />
            <div className="relative z-10 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] hover:scale-110 transition-transform duration-500">
              <img src={flavor.image} alt={flavor.name} className="w-full h-full object-cover rounded-[2rem] shadow-2xl border-8 border-white/50" />
            </div>
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/30 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/20 rounded-full blur-3xl" />
          </div>

          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white text-warm-pink text-sm font-bold tracking-wider uppercase mb-4 shadow-sm border border-warm-pink/10">
                Premium Flavor
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-chocolate mb-4 leading-tight">
                {flavor.name}
              </h1>
              <p className="text-xl text-chocolate/70 leading-relaxed">
                {flavor.description}
              </p>
            </div>

            <div className="flex items-end gap-4">
              <span className="text-4xl font-bold text-warm-pink">{flavor.price}</span>
              <span className="text-chocolate/50 font-medium uppercase tracking-widest mb-1">Per Scoop</span>
            </div>

            <div className="pt-8 border-t border-chocolate/10 space-y-6">
              <div>
                <span className="block text-sm font-medium text-chocolate/60 mb-3">Quantity</span>
                <div className="flex items-center gap-4 inline-flex bg-white p-2 rounded-full shadow-sm border border-chocolate/5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-chocolate hover:bg-warm-pink hover:text-white transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-8 text-center font-bold text-xl text-chocolate">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-chocolate hover:bg-warm-pink hover:text-white transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-warm-pink text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-strawberry transition-all duration-300 shadow-xl shadow-warm-pink/30 hover:shadow-2xl hover:shadow-warm-pink/40 hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="w-6 h-6" />
                  Add to Cart
                </button>
              </div>
            </div>
            
            <div className="mt-8 bg-white/60 p-6 rounded-2xl border border-chocolate/5 text-sm text-chocolate/70 flex gap-4">
              <div className="text-2xl">🌱</div>
              <p>Made with 100% natural ingredients. No artificial colors or preservatives. Best consumed within 2 weeks of purchase.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
