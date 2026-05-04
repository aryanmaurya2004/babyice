import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Star, MapPin, Phone, Mail, Clock, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { flavors, testimonials, features } from '../data/flavors';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

export function Home() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <Flavors />
      <About />
      <Reviews />
      <Contact />
    </div>
  );
}

function Hero() {
  const sliderImages = [flavors[2].image, flavors[0].image, flavors[7].image];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-warm-pink via-soft-coral to-strawberry" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />

      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-lemon/20 rounded-full blur-3xl animate-float-delay" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-mint/15 rounded-full blur-3xl animate-float-slow" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="text-white space-y-8 relative z-10">
            {/* Child eating ice cream image */}
            <div className="hidden md:block absolute bottom-0 top-20 lg:-bottom-8 -left-12 lg:-left-56 w-52 h-80 lg:w-[300px] lg:h-[460px] rounded-[2.5rem] overflow-hidden border-[6px] border-white/20 shadow-2xl shadow-warm-pink/20 animate-float-slow z-[-1] transition-all duration-500 hover:scale-105 hover:-rotate-2 -rotate-6">
              <img
                src="https://i.pinimg.com/736x/d2/bd/ad/d2bdadd60ed5a5602a9250b17e7b90bf.jpg"
                alt="Kid enjoying ice cream"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Handcrafted with Love Since 2018
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight animate-slide-up">
              Life is Better
              <br />
              <span className="text-lemon">with Ice Cream</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed animate-slide-up">
              “Hamari ice cream sirf dessert nahi, ek experience hai.
              Har flavor carefully select kiya gaya hai — taaki har bite me mile rich taste, creamy texture aur pure happiness.”.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up">
              <a
                href="#flavors"
                className="bg-white text-warm-pink px-8 py-4 rounded-full font-semibold hover:bg-lemon hover:text-chocolate transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-2xl hover:scale-105"
              >
                Explore Flavors
              </a>
              <a
                href="#about"
                className="border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Our Story
              </a>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-white/70">Flavors</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-white/70">Happy Customers</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-3xl font-bold">7</div>
                <div className="text-sm text-white/70">Years of Joy</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative">
              <div className="w-[450px] h-[450px] bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center animate-float overflow-hidden border-8 border-white/20 shadow-2xl relative">
                {sliderImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Ice Cream"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                {sliderImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-white scale-125 shadow-lg' : 'bg-white/50 hover:bg-white/80'}`}
                  />
                ))}
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-lemon/30 rounded-full backdrop-blur-sm flex items-center justify-center animate-bounce-gentle overflow-hidden border-4 border-white/30 shadow-xl">
                <img src={flavors[1].image} alt="Strawberry" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-10 w-28 h-28 bg-mint/30 rounded-full backdrop-blur-sm flex items-center justify-center animate-float-delay overflow-hidden border-4 border-white/30 shadow-xl">
                <img src={flavors[3].image} alt="Mint" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-1/2 -right-20 w-24 h-24 bg-peach/30 rounded-full backdrop-blur-sm flex items-center justify-center animate-float-slow overflow-hidden border-4 border-white/30 shadow-lg">
                <img src={flavors[4].image} alt="Blueberry" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#flavors"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}

function Flavors() {
  const { ref, isVisible } = useInView();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Chocolate', 'Fruity', 'Classic', 'Nutty'];

  const filteredFlavors = activeCategory === 'All'
    ? flavors
    : flavors.filter(f => f.category === activeCategory);

  return (
    <section id="flavors" className="section-padding bg-cream">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-warm-pink font-medium text-sm tracking-widest uppercase">
            Our Collection
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-chocolate mt-3">
            Irresistible Flavors
          </h2>
          <p className="text-chocolate/60 mt-4 max-w-2xl mx-auto text-lg mb-8">
            Each flavor is a masterpiece, crafted with premium ingredients and
            endless passion. Find your perfect scoop.
          </p>

          <div className={`flex flex-wrap justify-center gap-3 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === category
                  ? 'bg-warm-pink text-white shadow-lg shadow-warm-pink/25'
                  : 'bg-white text-chocolate/70 hover:bg-warm-pink/10 hover:text-warm-pink border border-chocolate/5'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFlavors.map((flavor, index) => (
            <div
              key={`${activeCategory}-${flavor.id}`}
              className={`group ${flavor.bg} rounded-3xl p-6 card-hover block border border-black/5 relative ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/flavor/${flavor.id}`}>
                <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl shadow-md border-4 border-white/60 relative">
                  <img src={flavor.image} alt={flavor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-chocolate mb-2 group-hover:text-warm-pink transition-colors">
                  {flavor.name}
                </h3>
                <p className="text-chocolate/60 text-sm leading-relaxed mb-4">
                  {flavor.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-warm-pink font-bold text-lg">
                    {flavor.price}
                  </span>
                  <span className="text-xs text-chocolate/40 font-medium uppercase tracking-wider">
                    Per Scoop
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-3 mt-4">
                <div
                  className={`flex-1 h-1 rounded-full bg-gradient-to-r ${flavor.color} opacity-60 group-hover:opacity-100 transition-opacity`}
                />
                <a
                  href={`https://wa.me/918303319119?text=Hello! I want to book ${flavor.name} (${flavor.price}) from Baby Ice Cream.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full text-xs font-bold hover:scale-105 transition-all shadow-md shadow-green-500/20"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, isVisible } = useInView();

  return (
    <section id="about" className="section-padding bg-white">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-warm-pink/10 to-mint/10 rounded-3xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg shadow-warm-pink/5">
                    <span className="text-5xl block mb-3">🍨</span>
                    <div className="text-2xl font-bold text-chocolate">50+</div>
                    <div className="text-sm text-chocolate/50">
                      Unique Flavors
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg shadow-warm-pink/5 mt-8">
                    <span className="text-5xl block mb-3">🌍</span>
                    <div className="text-2xl font-bold text-chocolate">12</div>
                    <div className="text-sm text-chocolate/50">
                      Countries Sourced
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg shadow-warm-pink/5">
                    <span className="text-5xl block mb-3">👨‍🍳</span>
                    <div className="text-2xl font-bold text-chocolate">15</div>
                    <div className="text-sm text-chocolate/50">
                      Master Chefs
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg shadow-warm-pink/5 mt-8">
                    <span className="text-5xl block mb-3">🏆</span>
                    <div className="text-2xl font-bold text-chocolate">25</div>
                    <div className="text-sm text-chocolate/50">Awards Won</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
            style={{ animationDelay: '200ms' }}
          >
            <span className="text-warm-pink font-medium text-sm tracking-widest uppercase">
              Our Story
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-chocolate mt-3 leading-tight">
              Crafting Happiness,
              <br />
              <span className="gradient-text">One Scoop at a Time</span>
            </h2>
            <p className="text-chocolate/60 mt-6 text-lg leading-relaxed">
              Hamari kahani shuru hui ek simple si soch se —

              Bachpan me jab bhi ice cream milti thi, ek chhoti si smile automatically aa jati thi.
              Wahi feeling hum har customer tak pahunchana chahte hain.

              Isliye humne decide kiya ki sirf ice cream nahi, balki ek perfect experience banayenge —
              jahan har scoop me mile freshness, rich taste aur asli happiness.
            </p>
            <p className="text-chocolate/60 mt-4 text-lg leading-relaxed">
              Har flavor ko carefully create kiya jata hai —
              fresh ingredients ke saath, bina kisi compromise ke.

              Aaj hum sirf ice cream nahi bana rahe,
              hum logon ke special moments ko aur bhi sweet bana rahe hain ❤️
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-warm-pink/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-warm-pink" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-chocolate text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-chocolate/50 text-xs mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="reviews"
      className="section-padding bg-gradient-to-br from-warm-pink/5 via-cream to-mint/5"
    >
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-warm-pink font-medium text-sm tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-chocolate mt-3">
            What People Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((review, index) => (
            <div
              key={review.name}
              className={`bg-white rounded-3xl p-8 shadow-lg shadow-warm-pink/5 border border-warm-pink/5 hover:shadow-xl hover:shadow-warm-pink/10 transition-all duration-500 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
                }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-caramel text-caramel"
                  />
                ))}
              </div>
              <p className="text-chocolate/70 leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warm-pink to-soft-coral flex items-center justify-center text-white text-sm font-bold">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-chocolate text-sm">
                    {review.name}
                  </div>
                  <div className="text-chocolate/40 text-xs">
                    Verified Customer
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, isVisible } = useInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-padding bg-cream">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-warm-pink font-medium text-sm tracking-widest uppercase">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-chocolate mt-3">
            Visit Our Scoop Shop
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div
            className={`${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg shadow-warm-pink/5 border border-warm-pink/5">
              <h3 className="font-display text-2xl font-bold text-chocolate mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-chocolate/70 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-warm-pink/15 focus:border-warm-pink focus:ring-2 focus:ring-warm-pink/20 outline-none transition-all text-chocolate bg-cream/50"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-chocolate/70 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-warm-pink/15 focus:border-warm-pink focus:ring-2 focus:ring-warm-pink/20 outline-none transition-all text-chocolate bg-cream/50"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-chocolate/70 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-warm-pink/15 focus:border-warm-pink focus:ring-2 focus:ring-warm-pink/20 outline-none transition-all text-chocolate bg-cream/50 resize-none"
                    placeholder="Tell us what's on your mind..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-warm-pink text-white py-3.5 rounded-xl font-semibold hover:bg-strawberry transition-all duration-300 shadow-lg shadow-warm-pink/25 hover:shadow-xl hover:shadow-warm-pink/30"
                >
                  {submitted ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          <div
            className={`space-y-6 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg shadow-warm-pink/5 border border-warm-pink/5">
              <h3 className="font-display text-2xl font-bold text-chocolate mb-6">
                Visit Us
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-warm-pink/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-warm-pink" />
                  </div>
                  <div>
                    <div className="font-semibold text-chocolate text-sm">
                      Address
                    </div>
                    <div className="text-chocolate/60 text-sm mt-1">
                      Inflection.ORG,khamaria,221306
                      <br />
                      Bhadohi, Utter Predesh
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-warm-pink/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-warm-pink" />
                  </div>
                  <div>
                    <div className="font-semibold text-chocolate text-sm">
                      Phone
                    </div>
                    <div className="text-chocolate/60 text-sm mt-1">
                      +91 8303319119
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-warm-pink/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-warm-pink" />
                  </div>
                  <div>
                    <div className="font-semibold text-chocolate text-sm">
                      Email
                    </div>
                    <div className="text-chocolate/60 text-sm mt-1">
                      hello@babyice.com
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-warm-pink/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-warm-pink" />
                  </div>
                  <div>
                    <div className="font-semibold text-chocolate text-sm">
                      Hours
                    </div>
                    <div className="text-chocolate/60 text-sm mt-1">
                      Mon - Fri: 10am - 10pm
                      <br />
                      Sat - Sun: 9am - 11pm
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-warm-pink to-soft-coral rounded-3xl p-8 text-white">
              <h3 className="font-display text-2xl font-bold mb-3">
                Special Offer!
              </h3>
              <p className="text-white/80 mb-4">
                Get 20% off on your first order. Use code{' '}
                <span className="font-bold text-lemon">SCOOP20</span> at
                checkout.
              </p>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Heart className="w-4 h-4 fill-white/70" />
                Valid on all flavors
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
