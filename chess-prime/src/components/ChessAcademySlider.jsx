import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Users, Trophy, Clock, Shield, Phone, Mail, MessageCircle } from 'lucide-react';
import slide1 from '../assets/landing-images/slider/abdallah-muhammad-kj0uSH2XFrM-unsplash.jpg';
import slide2 from '../assets/landing-images/slider/hassan-pasha-WTZZomyqaoA-unsplash.jpg';
import slide3 from '../assets/landing-images/slider/piotr-makowski-27LH_0jXKYI-unsplash.jpg';
import BrandAmbassador from './BrandAmbassador';
import PricingSection from './PricingSection';

const ChessAcademySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "India's best Online Chess Academy",
      badge: "As seen on Shark Tank India",
      stats: "8:8:8",
      description: "We make Kids Smarter and Sharper through Chess",
      image: slide1,
      overlay: "from-purple-900/90 to-indigo-900/90"
    },
    {
      title: "Master Chess with Grandmasters",
      badge: "Elite Coaching",
      stats: "5000+ Students",
      description: "Learn from India's top chess Grandmasters",
      image: slide2,
      overlay: "from-blue-900/90 to-purple-900/90"
    },
    {
      title: "Join the Chess Revolution",
      badge: "Trusted by Parents",
      stats: "50+ Cities",
      description: "Making children smarter through strategic thinking",
      image: slide3,
      overlay: "from-indigo-900/90 to-blue-900/90"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-[#150F0B] text-white">
      {/* Main Slider Section - Full Width with Background Images */}
      <div className="relative h-screen overflow-hidden">
        {/* Slider Container */}
        <div 
          className="flex transition-transform duration-700 ease-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 relative h-full">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                {/* Dark Overlay with Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.overlay}`}>
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-yellow-500/30 rounded-full px-4 py-2">
                        <Award size={16} className="text-yellow-500" />
                        <span className="text-yellow-500 text-sm font-medium">{slide.badge}</span>
                      </div>

                      {/* Main Title */}
                      <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                        {slide.title}
                      </h1>

                      {/* Stats Display */}
                      <div className="flex items-center gap-4">
                        <div className="text-4xl md:text-5xl font-bold text-yellow-500">
                          {slide.stats}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xl text-gray-200">
                        {slide.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105">
                          Learn More
                        </button>
                        <button className="border-2 border-white/30 hover:border-yellow-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition backdrop-blur-sm">
                          Watch Demo
                        </button>
                      </div>

                      {/* Trust Badges */}
                      <div className="flex items-center gap-6 pt-6">
                        <div className="flex items-center gap-2">
                          <Users className="text-yellow-500" size={20} />
                          <span className="text-gray-200">10K+ Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="text-yellow-500" size={20} />
                          <span className="text-gray-200">50+ Grandmasters</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="text-yellow-500" size={20} fill="currentColor" />
                          <span className="text-gray-200">4.9 Rating</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Empty or additional content can go here */}
                    <div className="relative hidden md:block">
                      {/* Optional: Add chess piece overlay or leave empty for clean design */}
                      <div className="text-9xl text-white/10 font-bold transform rotate-12">
                        ♞
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-4 rounded-full transition z-20 border border-white/20"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-4 rounded-full transition z-20 border border-white/20"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-10 bg-yellow-500' 
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-8 z-20 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
          <span className="text-white">
            {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10 hover:border-yellow-500/30 transition">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="text-yellow-500" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2">Grandmaster Coaching</h3>
            <p className="text-gray-400 text-sm">Learn from India's best chess players</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10 hover:border-yellow-500/30 transition">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
              <Clock className="text-yellow-500" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2">Flexible Timings</h3>
            <p className="text-gray-400 text-sm">Schedule classes at your convenience</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10 hover:border-yellow-500/30 transition">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-yellow-500" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2">Certified Curriculum</h3>
            <p className="text-gray-400 text-sm">Structured learning path for all levels</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10 hover:border-yellow-500/30 transition">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-yellow-500" size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2">1-on-1 Training</h3>
            <p className="text-gray-400 text-sm">Personalized attention for faster growth</p>
          </div>
        </div>
      </div>

      {/* Season and Support Bar */}
      
      <BrandAmbassador />
      <PricingSection />


      <div className="border-t border-yellow-500/20 bg-[#150F0B]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 font-semibold">SEASON 5</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-300">Now Enrolling</span>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <button className="text-gray-300 hover:text-yellow-500 transition flex items-center gap-2">
                  <Phone size={16} />
                  <span>Customer Support</span>
                </button>
                <button className="text-gray-300 hover:text-yellow-500 transition flex items-center gap-2">
                  <Mail size={16} />
                  <span>Free Demo</span>
                </button>
                <button className="text-gray-300 hover:text-yellow-500 transition flex items-center gap-2">
                  <MessageCircle size={16} />
                  <span>New Enquiry</span>
                </button>
              </div>
            </div>
            
            {/* CTA Banner */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:from-yellow-600 hover:to-yellow-700 transition cursor-pointer">
              <span>🎯</span>
              <span>Limited seats available for Season 5 - Enroll Now!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessAcademySlider;