import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingBag, ChevronRight, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const EssentialStore = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Store location coordinates
  const storeLocation = {
    lat: 9.9674178,
    lng: 76.2811434
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { id: 1, name: 'Nebula Jacket', price: '$299', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', category: 'Outerwear' },
    { id: 2, name: 'Void Hoodie', price: '$149', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', category: 'Streetwear' },
    { id: 3, name: 'Quantum Tee', price: '$79', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', category: 'Basics' },
    { id: 4, name: 'Eclipse Pants', price: '$189', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', category: 'Bottoms' },
    { id: 5, name: 'Cosmic Sneakers', price: '$219', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', category: 'Footwear' },
    { id: 6, name: 'Stellar Bag', price: '$159', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', category: 'Accessories' },
  ];

  const collections = [
    { name: 'FUTURE NOIR', desc: 'Dark aesthetics meet tomorrow', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80' },
    { name: 'CYBER STREET', desc: 'Urban tech revolution', img: 'https://images.unsplash.com/photo-1558769132-cb1aea1c8dd5?w=800&q=80' },
    { name: 'ZERO GRAVITY', desc: 'Weightless minimalism', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80' },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      // Using Web3Forms - FREE, no signup needed
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Get from https://web3forms.com
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: 'New Contact Form - ESSENTIAL Store',
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const getDirectionsToStore = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          // Opens Google Maps with directions from user's location to store
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${storeLocation.lat},${storeLocation.lng}&travelmode=driving`;
          window.open(directionsUrl, '_blank');
        },
        (error) => {
          // If user denies location, just open store location
          window.open(`https://maps.app.goo.gl/r4pQXVi55UjUt6Bn6`, '_blank');
        }
      );
    } else {
      // Fallback if geolocation not supported
      window.open(`https://maps.app.goo.gl/r4pQXVi55UjUt6Bn6`, '_blank');
    }
  };

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* <div className="h-8">
              <img src="/logo.png" alt="ESSENTIAL" className="h-full w-auto brightness-0 invert" />
            </div> */}
            <div className="hidden md:flex gap-8 text-sm font-light tracking-wide">
              <a href="#collections" className="hover:text-gray-400 transition-colors">COLLECTIONS</a>
              <a href="#shop" className="hover:text-gray-400 transition-colors">SHOP</a>
              <a href="#about" className="hover:text-gray-400 transition-colors">ABOUT</a>
              <a href="#contact" className="hover:text-gray-400 transition-colors">CONTACT</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
            <ShoppingBag 
              className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" 
              onClick={() => setShowCartMessage(true)}
            />
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Message Modal */}
      {showCartMessage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCartMessage(false)}
        >
          <div 
            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg p-8 md:p-12 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tight">COMING SOON</h3>
              <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-2">
                Online shopping is launching soon.
              </p>
              <p className="text-white text-lg md:text-xl font-semibold mb-6">
                Visit our flagship store to experience ESSENTIAL in person.
              </p>
              <div className="bg-white/5 border border-white/10 rounded px-4 py-3 mb-6">
                <p className="text-sm text-gray-400 mb-1">📍 FLAGSHIP STORE</p>
                <p className="text-white font-light">Kanayannur, Kerala, India</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={getDirectionsToStore}
                className="px-6 py-3 bg-white text-black font-bold tracking-wide hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                GET DIRECTIONS
              </button>
              <button 
                className="px-6 py-3 border border-white/20 hover:bg-white/10 transition-all font-semibold tracking-wide"
                onClick={() => setShowCartMessage(false)}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0">
        <div className="absolute inset-0 bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full opacity-40 md:object-cover object-cover"
          >
            <source src="/essential.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        
        {/* <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl w-full">
          <div className="mb-4 md:mb-6 inline-block">
            <div className="border border-white/20 rounded-full px-4 md:px-6 py-1.5 md:py-2 backdrop-blur-sm">
              <span className="text-[10px] md:text-xs tracking-[0.3em] font-light">SPRING/SUMMER 2025</span>
            </div>
          </div>
          
          <div className="mb-4 md:mb-6">
            <img 
              src="/logo.png" 
              alt="ESSENTIAL" 
              className="w-auto h-24 md:h-32 lg:h-48 mx-auto brightness-0 invert"
            />
          </div>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-400 mb-8 md:mb-12 font-light tracking-wide max-w-2xl mx-auto px-4">
            Where minimalism meets innovation. Redefining fashion for the next generation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <a href="#collections" className="group relative px-6 md:px-8 py-3 md:py-4 bg-white text-black font-semibold tracking-wide overflow-hidden text-sm md:text-base">
              <span className="relative z-10 flex items-center justify-center gap-2">
                EXPLORE COLLECTION
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </a>
            <a href="#contact" className="px-6 md:px-8 py-3 md:py-4 border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all font-semibold tracking-wide text-sm md:text-base">
              CONTACT US
            </a>
          </div>
        </div> */}

        {/* <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div> */}
      </section>

      {/* Featured Collections */}
      <section id="collections" className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">COLLECTIONS</h2>
            <p className="text-gray-400 text-lg font-light tracking-wide">Curated for the fearless</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {collections.map((col, idx) => (
              <div key={idx} className="group relative h-[600px] overflow-hidden cursor-pointer">
                <img src={col.img} alt={col.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-3xl font-black mb-2 tracking-tight">{col.name}</h3>
                  <p className="text-gray-400 mb-4 font-light">{col.desc}</p>
                  <button className="flex items-center gap-2 text-sm font-semibold tracking-wider group-hover:gap-4 transition-all">
                    DISCOVER <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="shop" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">NEW ARRIVALS</h2>
            <button className="hidden md:flex items-center gap-2 text-sm font-semibold tracking-wider hover:gap-4 transition-all">
              VIEW ALL <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onMouseEnter={() => setActiveProduct(product.id)}
                onMouseLeave={() => setActiveProduct(null)}
              >
                <div className="relative h-[500px] mb-4 overflow-hidden bg-gray-900">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${activeProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                    <button className="px-8 py-3 bg-white text-black font-bold tracking-wide transform -translate-y-4 group-hover:translate-y-0 transition-transform">
                      QUICK VIEW
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold px-3 py-1 tracking-wider">
                    NEW
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 tracking-widest">{product.category}</p>
                  <h3 className="text-xl font-bold tracking-tight">{product.name}</h3>
                  <p className="text-gray-400 font-light">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-none">
              CRAFTING<br />THE FUTURE
            </h2>
            <p className="text-gray-400 text-lg mb-6 font-light leading-relaxed">
              ESSENTIAL represents more than fashion—it's a philosophy. We blend cutting-edge design with 
              timeless minimalism to create pieces that transcend trends.
            </p>
            <p className="text-gray-400 text-lg mb-8 font-light leading-relaxed">
              Every collection is a statement. Every piece is intentional. Join us in redefining what 
              essential truly means.
            </p>
            <a href="#contact" className="flex items-center gap-2 text-sm font-semibold tracking-wider hover:gap-4 transition-all">
              CONTACT US <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="relative h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" 
              alt="About" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-32 px-6 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">GET IN TOUCH</h2>
            <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
              Have questions? Want to collaborate? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black mb-6 tracking-tight">VISIT US</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold mb-1">Flagship Store</p>
                      <p className="text-gray-400 font-light">Kanayannur, Kerala, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold mb-1">Email</p>
                      <p className="text-gray-400 font-light">hello@essential.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold mb-1">Phone</p>
                      <p className="text-gray-400 font-light">+91 XXX XXX XXXX</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={getDirectionsToStore}
                className="w-full px-6 py-4 border border-white/20 hover:bg-white/10 transition-all font-semibold tracking-wide flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                GET DIRECTIONS
              </button>
            </div>

            {/* Contact Form */}
            <div>
              {formSubmitted ? (
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400">We'll get back to you within 24-48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name *" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors font-light text-white"
                  />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your Email *" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors font-light text-white"
                  />
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Phone Number (Optional)" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors font-light text-white"
                  />
                  <textarea 
                    name="message"
                    placeholder="Your Message *" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors font-light text-white resize-none"
                  />
                  <button 
                    type="submit"
                    disabled={formLoading}
                    className="w-full px-8 py-4 bg-white text-black font-bold tracking-wide hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formLoading ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-black mb-6 tracking-wider">ESSENTIAL</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Redefining modern fashion through innovation and minimalism.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4 tracking-widest">SHOP</h4>
              <ul className="space-y-3 text-gray-400 text-sm font-light">
                <li><a href="#collections" className="hover:text-white transition-colors">Collections</a></li>
                <li><a href="#shop" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4 tracking-widest">COMPANY</h4>
              <ul className="space-y-3 text-gray-400 text-sm font-light">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4 tracking-widest">FOLLOW US</h4>

                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/itsgivingessentialcore?igsh=eDF1cTZqcWpsM25r"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
                  </a>

                  <a
                    href="https://facebook.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
                  </a>

                  <a
                    href="https://twitter.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
                  </a>
                </div>
              </div>

            </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-light">
            <p>© 2025 ESSENTIAL. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EssentialStore;