import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaHome, FaBuilding } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay as SwiperAutoplay } from 'swiper/modules';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

// Logos des partenaires
import AirbnbLogo from '../assets/airbnb.svg';
import CiscoLogo from '../assets/cisco.svg';
import EbayLogo from '../assets/ebay.svg';
import MicrosoftLogo from '../assets/microsoft.svg';

// Image de propriété exemple
import PropertyImage from '../assets/property.jpg';

// Composant de bouton de carrousel amélioré
const CarouselButton = ({ onClick, disabled, children, className }) => (
  <button
    className={`w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    {children}
  </button>
);

// Composant de carte pour le carrousel
const CarouselCard = ({ gradient, title, description }) => (
  <div className={`${gradient} rounded-xl p-6 transition-all duration-300 hover:scale-105 h-56 flex flex-col justify-between mr-4`}>
    <div className="mb-3">
      {/* Espace réservé pour une icône si nécessaire */}
    </div>
    <div>
      <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/90 text-base">
        {description}
      </p>
    </div>
  </div>
);

// Extraction des composants réutilisables
const BackgroundEffects = () => (
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
);

const NavigationBar = () => (
  <nav className="relative z-10 px-6 py-3 flex items-center justify-between">
    <div className="flex items-center">
      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">My</span>
      </div>
      <span className="text-white font-medium ml-2">Estate</span>
    </div>
    
    <div className="hidden md:flex items-center space-x-6">
      {/* Navigation items can be added here */}
    </div>
    
    <div className="flex items-center space-x-3">
      <button className="text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all text-sm">
        Log In
      </button>
      <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-lg hover:bg-white/20 transition-all text-sm">
        Sign Up
      </button>
    </div>
  </nav>
);

const SearchForm = ({ propertyType, setPropertyType, priceRange, setPriceRange }) => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 shadow-lg">
    <div className="grid md:grid-cols-3 gap-2">
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
);

const PropertyCard = () => (
  <motion.div 
    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden shadow-md flex flex-row max-w-xs"
  >
    <div className="flex items-center justify-center">
      <img src={PropertyImage} alt="Property" className="w-20 h-20 object-cover rounded-lg" />
    </div>
    
    <div className="p-2 flex-1">
      <div className="flex items-center text-gray-300 text-xs mb-1">
        <span className="mr-1">📍</span>
        <span>Jakarta Barat, Indonesia</span>
      </div>
      
      <div className="flex justify-between mb-1">
        <div className="flex items-center text-gray-300 text-xs">
          <span className="mr-1">🛏️</span>
          <span>4 bed</span>
        </div>
        <div className="flex items-center text-gray-300 text-xs">
          <span className="mr-1">📏</span>
          <span>10x10 m</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-white font-semibold text-xs">$5,200,000</div>
        <button className="bg-green-500 text-xs text-white px-2 py-0.5 rounded-md">Book Now</button>
      </div>
    </div>
  </motion.div>
);

const PartnerLogos = () => (
  <div className="flex flex-wrap items-center justify-between w-full gap-3">
    <motion.div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-md flex items-center justify-center h-16 w-32">
      <img src={AirbnbLogo} alt="Airbnb" className="h-8 object-contain filter brightness-0 invert opacity-70" />
    </motion.div>
    
    <motion.div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-md flex items-center justify-center h-16 w-32">
      <img src={CiscoLogo} alt="Cisco" className="h-8 object-contain filter brightness-0 invert opacity-70" />
    </motion.div>
    
    <motion.div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-md flex items-center justify-center h-16 w-32">
      <img src={EbayLogo} alt="Ebay" className="h-8 object-contain filter brightness-0 invert opacity-70" />
    </motion.div>
    
    <motion.div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-md flex items-center justify-center h-16 w-32">
      <img src={MicrosoftLogo} alt="Microsoft" className="h-8 object-contain filter brightness-0 invert opacity-70" />
    </motion.div>
  </div>
);

// Composant principal refactorisé
const HeroSection = () => {
  // États
  const [propertyType, setPropertyType] = useState('Show all');
  const [priceRange, setPriceRange] = useState('Any price');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [autoScrollPlugin, setAutoScrollPlugin] = useState(null);
  
  // Configuration du carrousel
  const autoScrollOptions = {
    speed: 1.2,
    direction: 'forward',
    stopOnInteraction: false,
    stopOnMouseEnter: false,
    startDelay: 0,
    playOnInit: true,
    loop: true
  };
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      containScroll: false,
      dragFree: true,
      inViewThreshold: 0,
    },
    [AutoScroll(autoScrollOptions)]
  );

  // Callbacks
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const handleButtonClick = useCallback(
    (action) => {
      if (!autoScrollPlugin || !emblaApi) return;
      
      action();
    },
    [emblaApi, autoScrollPlugin]
  );

  const toggleAutoplay = useCallback(() => {
    if (!autoScrollPlugin) return;

    if (isPlaying) {
      autoScrollPlugin.stop();
      setIsPlaying(false);
    } else {
      autoScrollPlugin.play();
      setIsPlaying(true);
    }
  }, [autoScrollPlugin, isPlaying]);

  // Effet pour initialiser le carrousel
  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    
    // Définir handlePointerDown en dehors de la condition
    const handlePointerDown = () => {
      const pluginInstance = emblaApi.plugins().autoScroll;
      setTimeout(() => {
        if (pluginInstance && !pluginInstance.isPlaying()) {
          pluginInstance.play();
        }
      }, 300);
    };
    
    const pluginInstance = emblaApi.plugins().autoScroll;
    if (pluginInstance) {
      setAutoScrollPlugin(pluginInstance);
      setIsPlaying(pluginInstance.isPlaying());
      
      // Utiliser la fonction définie plus haut
      emblaApi.on('pointerDown', handlePointerDown);
    }
    
    const updateButtonState = () => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('select', updateButtonState);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('reInit', updateButtonState);
    
    updateButtonState();
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('select', updateButtonState);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('reInit', updateButtonState);
      
      // Maintenant handlePointerDown est toujours défini ici
      emblaApi.off('pointerDown', handlePointerDown);
    };
  }, [emblaApi, onSelect]);

  // Données du carrousel
  const propertySlides = [1, 2, 3, 4, 5].map((index) => (
    <div className="embla__slide flex-[0_0_100%] min-w-0 relative mr-4" key={index}>
      <div className="embla__slide__inner h-[250px] bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-lg flex items-center justify-center p-6">
        <div className="text-center">
          <h3 className="text-white text-xl font-bold mb-2">Propriété {index}</h3>
          <p className="text-white/80 mb-3 text-sm">Une description captivante de cette magnifique propriété</p>
          <div className="flex justify-center gap-3 mb-3">
            <div className="bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-xs">
              4 chambres
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-xs">
              2 salles de bain
            </div>
          </div>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-lg hover:bg-white/20 transition-all text-sm">
            Voir détails
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex flex-col">
      {/* Effets d'arrière-plan */}
      <BackgroundEffects />

      {/* Barre de navigation */}
      <NavigationBar />

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-full md:max-w-[95%] lg:max-w-[90%] xl:max-w-[1400px] mx-auto px-4 py-2 flex-grow grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Côté gauche */}
        <motion.div 
          className="flex flex-col space-y-3 md:space-y-4 pl-0 md:pl-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/icône */}
          <div className="w-28 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mb-1">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
          
          {/* Titre principal */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Your</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">Best Happy Land</span>
          </h1>
          
          {/* Sous-titre */}
          <p className="text-gray-300 text-sm">
            Real Estate & Properties For Sale Or Rent<br />In 12+ Country
          </p>
          
          {/* Formulaire de recherche */}
          <SearchForm 
            propertyType={propertyType} 
            setPropertyType={setPropertyType}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
          
          {/* Boutons d'action */}
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white hover:bg-white/20 transition-all text-sm">
              <span>Buy a home</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <FaArrowRight className="text-white text-xs" />
              </div>
            </button>
            
            <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white hover:bg-white/20 transition-all text-sm">
              <span>Rent a home</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <FaArrowRight className="text-white text-xs" />
              </div>
            </button>
          </div>
        </motion.div>
        
        {/* Côté droit - Carrousel */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="embla overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-3 max-w-sm mx-auto">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container flex">
                {propertySlides}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Pied de page avec carte de propriété et logos */}
      <motion.div
        className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 pb-6 pt-4 w-full mt-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-12 md:col-span-5 flex justify-start pl-4">
            <PropertyCard />
          </div>
          <div className="col-span-12 md:col-span-7 flex justify-end">
            <PartnerLogos />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection; 