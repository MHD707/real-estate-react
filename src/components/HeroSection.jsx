import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaHome, FaBuilding } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Logos des partenaires
import AirbnbLogo from '../assets/airbnb.png';
import CiscoLogo from '../assets/cisco.png';
import EbayLogo from '../assets/ebay.png';
import MicrosoftLogo from '../assets/microsoft.png';

// Image de propriété exemple
import PropertyImage from '../assets/property.jpg';

const HeroSection = () => {
  const [propertyType, setPropertyType] = useState('Show all');
  const [priceRange, setPriceRange] = useState('Any price');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Effets d'arrière-plan */}
      <div className="absolute inset-0">
        {/* Orbes gradients flottants */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -30, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 15,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 40, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-blue-500/15 blur-3xl"
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 20, 0],
            scale: [1, 1.15, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 18,
            ease: "easeInOut" 
          }}
        />
        
        {/* Motif géométrique */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Barre de navigation */}
      <nav className="relative z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">My</span>
          </div>
          <span className="text-white font-medium ml-2">Estate</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white border-b-2 border-pink-500 pb-1">Home</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Properties</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Members</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Pages</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Blogs</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all">
            Log In
          </button>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-lg hover:bg-white/20 transition-all">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Contenu principal - Mise en page split-screen */}
      <div className="relative z-10 container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Côté gauche */}
        <motion.div 
          className="flex flex-col space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/icône */}
          <div className="w-36 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          
          {/* Titre principal */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Your</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">Best Happy Land</span>
          </h1>
          
          {/* Sous-titre */}
          <p className="text-gray-300 text-xl">
            Real Estate & Properties For Sale Or Rent<br />In 12+ Country
          </p>
          
          {/* Formulaire de recherche */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="text-gray-300 text-sm block mb-2">Property type</label>
                <div className="relative">
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option>Show all</option>
                    <option>Houses</option>
                    <option>Apartments</option>
                    <option>Villas</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FaHome className="text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="col-span-1">
                <label className="text-gray-300 text-sm block mb-2">Price range</label>
                <div className="relative">
                  <select 
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option>Any price</option>
                    <option>$100k - $200k</option>
                    <option>$200k - $500k</option>
                    <option>$500k - $1M</option>
                    <option>$1M+</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FaBuilding className="text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="col-span-1">
                <label className="text-transparent text-sm block mb-2">Search</label>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg px-4 py-3 text-white font-medium hover:opacity-90 transition-opacity">
                  Search
                </button>
              </div>
            </div>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all">
              <span>Buy a home</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <FaArrowRight className="text-white text-xs" />
              </div>
            </button>
            
            <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all">
              <span>Rent a home</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <FaArrowRight className="text-white text-xs" />
              </div>
            </button>
          </div>
        </motion.div>
        
        {/* Côté droit */}
        <div className="relative h-full">
          {/* Carte de service spécial */}
          <motion.div 
            className="absolute top-0 left-0 md:left-12 w-64 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl p-6 shadow-xl z-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white text-xl font-semibold mb-2">Our Special</h3>
            <p className="text-white text-lg">Service</p>
          </motion.div>
          
          {/* Carte "Comfortable" */}
          <motion.div 
            className="absolute top-32 left-0 md:left-24 w-72 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-green-400 text-xl">📢</span>
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">Comfortable</h3>
            <p className="text-gray-400 text-sm">
              Facebook Ads, Google Ads,<br />
              LinkedIn Ads,
            </p>
          </motion.div>
          
          {/* Carte "Luxury" */}
          <motion.div 
            className="absolute top-32 right-0 md:right-12 w-72 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-400 text-xl">🏆</span>
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">Luxury</h3>
            <p className="text-gray-400 text-sm">
              Instagram,<br />
              Instagram,
            </p>
          </motion.div>
          
          {/* Carte de propriété avec carousel */}
          <motion.div 
            className="absolute bottom-24 left-0 w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              className="w-full"
            >
              <SwiperSlide>
                <img src={PropertyImage} alt="Property" className="w-full h-40 object-cover" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={PropertyImage} alt="Property" className="w-full h-40 object-cover" />
              </SwiperSlide>
            </Swiper>
            
            <div className="p-4">
              <div className="flex items-center text-gray-300 text-sm mb-2">
                <span className="mr-1">📍</span>
                <span>Jakarta Barat, Indonesia</span>
              </div>
              
              <div className="flex justify-between mb-3">
                <div className="flex items-center text-gray-300 text-sm">
                  <span className="mr-1">🛏️</span>
                  <span>4 bed</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <span className="mr-1">📏</span>
                  <span>10x10 m</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-white font-semibold">$5,200,000</div>
                <button className="bg-green-500 text-xs text-white px-3 py-1 rounded-md">Book Now</button>
              </div>
            </div>
          </motion.div>
          
          {/* Logos des partenaires */}
          <motion.div 
            className="absolute bottom-0 right-0 w-full md:w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="grid grid-cols-4 gap-4">
              <img src={AirbnbLogo} alt="Airbnb" className="h-8 object-contain filter brightness-0 invert opacity-70" />
              <img src={CiscoLogo} alt="Cisco" className="h-8 object-contain filter brightness-0 invert opacity-70" />
              <img src={EbayLogo} alt="Ebay" className="h-8 object-contain filter brightness-0 invert opacity-70" />
              <img src={MicrosoftLogo} alt="Microsoft" className="h-8 object-contain filter brightness-0 invert opacity-70" />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Information de contact */}
      <div className="absolute bottom-6 right-6 text-gray-300 text-sm">
        <p>Give us a Call 1-888-498-9240 and we'll set you up, or <span className="text-green-400 underline">check our pricing</span></p>
      </div>
    </div>
  );
};

export default HeroSection; 