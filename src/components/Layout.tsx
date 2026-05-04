import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IceCream2, Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartSidebar } from './CartSidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <CartSidebar />
      <FloatingCallButton />
      <Footer />
    </>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { itemCount, setIsCartOpen } = useCart();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  const linksLeft = [
    { label: 'Home', href: isHomePage ? '#home' : '/' },
    { label: 'Flavors', href: isHomePage ? '#flavors' : '/#flavors' },
    { label: 'About', href: isHomePage ? '#about' : '/#about' },
  ];
  
  const linksRight = [
    { label: 'Reviews', href: isHomePage ? '#reviews' : '/#reviews' },
    { label: 'Contact', href: isHomePage ? '#contact' : '/#contact' },
  ];

  return (
    <nav className="fixed top-8 md:top-10 left-0 right-0 z-50 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-[#FFF8F0] rounded-full h-14 md:h-16 shadow-xl shadow-black/10 flex items-center justify-between px-6 md:px-12 border border-white/50">
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex-1">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#002855]">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left Links */}
          <div className="hidden md:flex flex-1 justify-center gap-8 pr-16 lg:pr-24">
            {linksLeft.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[#002855] font-display font-bold text-[15px] md:text-[17px] hover:text-warm-pink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Center Logo */}
          <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center group">
            <div className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] bg-[#FFF8F0] rounded-full flex items-center justify-center shadow-sm">
              <div className="w-[85px] h-[85px] md:w-[110px] md:h-[110px] bg-white rounded-full flex flex-col items-center justify-center shadow-lg border border-warm-pink/10 relative group-hover:scale-105 transition-transform duration-300">
                 <IceCream2 className="w-6 h-6 md:w-8 md:h-8 text-warm-pink fill-warm-pink/20 mb-0.5" />
                 <span className="font-display font-bold text-chocolate text-[11px] md:text-[15px] tracking-wide">babyice</span>
              </div>
            </div>
          </Link>

          {/* Right Links */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8 pl-16 lg:pl-24">
            {linksRight.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[#002855] font-display font-bold text-[15px] md:text-[17px] hover:text-warm-pink transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-[#002855] hover:text-warm-pink transition-colors"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-warm-pink text-white rounded-full text-xs font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Cart Button */}
          <div className="md:hidden flex-1 flex justify-end">
            <button onClick={() => setIsCartOpen(true)} className="relative text-[#002855]">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-warm-pink text-white rounded-full text-xs font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-[#FFF8F0] rounded-3xl p-6 shadow-xl border border-white/50 animate-fade-in relative z-40">
            <div className="flex flex-col gap-4 text-center">
              {[...linksLeft, ...linksRight].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setIsOpen(false);
                  }}
                  className="text-[#002855] font-display font-bold text-lg"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
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

function FloatingCallButton() {
  return (
    <a
      href="tel:+918303319119"
      className="fixed bottom-8 right-8 md:right-auto md:left-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-12 group translate-y-0 opacity-100"
      aria-label="Call us"
    >
      <div className="relative">
        <Phone className="w-6 h-6 fill-current" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
      </div>
      
      {/* Tooltip */}
      <span className="absolute right-16 md:right-auto md:left-16 top-1/2 -translate-y-1/2 bg-white text-chocolate px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-warm-pink/10">
        Call Now: +91 8303319119
      </span>
    </a>
  );
}
