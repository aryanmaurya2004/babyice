import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IceCream2, Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartSidebar } from './CartSidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <CartSidebar />
      <Footer />
    </>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Home', href: isHomePage ? '#home' : '/' },
    { label: 'Flavors', href: isHomePage ? '#flavors' : '/#flavors' },
    { label: 'About', href: isHomePage ? '#about' : '/#about' },
    { label: 'Reviews', href: isHomePage ? '#reviews' : '/#reviews' },
    { label: 'Contact', href: isHomePage ? '#contact' : '/#contact' },
  ];

  // If not on homepage, nav starts with background
  const navBgClass = (scrolled || !isHomePage)
    ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-warm-pink/5'
    : 'bg-transparent';

  const textColorClass = (scrolled || !isHomePage) ? 'text-chocolate' : 'text-white';
  const logoIconClass = (scrolled || !isHomePage) ? 'text-warm-pink' : 'text-white';
  const linkColorClass = (scrolled || !isHomePage) ? 'text-chocolate/70' : 'text-white/90';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <IceCream2
            className={`w-8 h-8 transition-colors duration-300 ${logoIconClass} group-hover:rotate-12 transition-transform`}
          />
          <span className={`font-display text-2xl font-bold transition-colors duration-300 ${textColorClass}`}>
            babyice
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-warm-pink ${linkColorClass}`}
            >
              {link.label}
            </a>
          ))}
          
          <button
            onClick={() => setIsCartOpen(true)}
            className={`relative p-2 transition-colors duration-300 hover:text-warm-pink ${textColorClass}`}
          >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-warm-pink text-white rounded-full text-xs font-bold flex items-center justify-center animate-bounce-gentle">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className={`relative p-2 transition-colors duration-300 ${textColorClass}`}
          >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-warm-pink text-white rounded-full text-xs font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`transition-colors ${textColorClass}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-warm-pink/10 animate-fade-in">
          <div className="px-6 py-4 space-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-chocolate/70 hover:text-warm-pink font-medium py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-chocolate text-white/70">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IceCream2 className="w-7 h-7 text-warm-pink" />
              <span className="font-display text-xl font-bold text-white">
                babyice
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Handcrafted artisan ice cream made with love, passion, and the
              finest ingredients from around the world.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              {['Home', 'Flavors', 'About', 'Reviews', 'Contact'].map(
                (link) => (
                  <Link
                    key={link}
                    to={`/#${link.toLowerCase()}`}
                    className="block hover:text-warm-pink transition-colors"
                  >
                    {link}
                  </Link>
                )
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Popular Flavors</h4>
            <div className="space-y-2 text-sm">
              {[
                { name: 'Belgian Chocolate', id: 'belgian-chocolate' },
                { name: 'Strawberry Bliss', id: 'strawberry-bliss' },
                { name: 'Salted Caramel', id: 'salted-caramel' },
                { name: 'Mango Sorbet', id: 'mango-sorbet' },
                { name: 'Pistachio Royale', id: 'pistachio-royale' },
              ].map((flavor) => (
                <Link
                  key={flavor.id}
                  to={`/flavor/${flavor.id}`}
                  className="block hover:text-warm-pink transition-colors"
                >
                  {flavor.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm mb-4">
              Get the scoop on new flavors and special deals.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 focus:border-warm-pink outline-none text-sm text-white placeholder:text-white/40"
              />
              <button className="bg-warm-pink px-4 py-2.5 rounded-xl text-white text-sm font-medium hover:bg-strawberry transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
