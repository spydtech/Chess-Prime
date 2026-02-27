import React from 'react';
import { Phone, Mail, MessageCircle, Award, ChevronRight, Star, Users, Trophy } from 'lucide-react';

const BrandAmbassador = () => {
  return (
    <div className="min-h-screen bg-[#150F0B] text-white">
      {/* Main Ambassador Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Proudly presenting
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image and Stats */}
          <div className="space-y-6">
            {/* Main Image Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-[#1E1A16] rounded-2xl overflow-hidden border border-yellow-500/20">
                <div className="aspect-[4/5] relative">
                  {/* Placeholder for GM S L Narayanan's image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent">
                    <div className="w-full h-full flex items-center justify-center bg-[#2A241E]">
                      <span className="text-8xl text-yellow-500/30">♞</span>
                    </div>
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-yellow-500/30 rounded-full px-4 py-2">
                    <span className="text-yellow-500 font-semibold">Grandmaster</span>
                  </div>
                  
                  {/* Rank Badge */}
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-full font-bold">
                    #42 World
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#1E1A16] rounded-xl p-4 border border-yellow-500/20 text-center">
                <Trophy className="text-yellow-500 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-white">#4</div>
                <div className="text-xs text-gray-400">Former India Rank</div>
              </div>
              <div className="bg-[#1E1A16] rounded-xl p-4 border border-yellow-500/20 text-center">
                <Award className="text-yellow-500 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-white">#42</div>
                <div className="text-xs text-gray-400">World Ranking</div>
              </div>
              <div className="bg-[#1E1A16] rounded-xl p-4 border border-yellow-500/20 text-center">
                <Star className="text-yellow-500 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-white">Silver</div>
                <div className="text-xs text-gray-400">Commonwealth</div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Name and Title */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Grandmaster{' '}
                <span className="text-yellow-500">S L Narayanan</span>
              </h3>
              <p className="text-xl text-yellow-500/80">Brand Ambassador</p>
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-lg">
                Meet our esteemed Chess Ambassador, Grand Master SL Narayanan, the brilliant mind behind 
                our meticulously curated chess syllabus. Formerly India's No. 4, currently ranked World 
                No.42, and a Commonwealth Silver Medalist, Narayanan brings unparalleled expertise.
              </p>
              
              <p className="text-lg">
                A pivotal team member alongside Viswanathan Anand in the World Chess Olympiad, his 
                strategic prowess and dedication embody the excellence we strive for at Eight Times 
                Eight Chess Academy. Learn from a true chess maestro and elevate your game under the 
                mentorship of a seasoned grandmaster, shaping the next generation of chess champions.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mt-1 group-hover:bg-yellow-500/30 transition">
                  <ChevronRight size={14} className="text-yellow-500" />
                </div>
                <span className="text-gray-200 text-lg">Elevating a beginner to a master.</span>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mt-1 group-hover:bg-yellow-500/30 transition">
                  <ChevronRight size={14} className="text-yellow-500" />
                </div>
                <span className="text-gray-200 text-lg">Boosting confidence and life skills.</span>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mt-1 group-hover:bg-yellow-500/30 transition">
                  <ChevronRight size={14} className="text-yellow-500" />
                </div>
                <span className="text-gray-200 text-lg">Creating smarter and sharper kids.</span>
              </div>
            </div>

            {/* Achievement Highlight */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-500 p-6 rounded-r-xl">
              <p className="text-white font-medium italic">
                "A pivotal team member alongside Viswanathan Anand in the World Chess Olympiad"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 flex items-center gap-2">
                <Users size={18} />
                Learn from Grandmaster
              </button>
              <button className="border border-yellow-500/30 hover:border-yellow-500 text-white px-6 py-3 rounded-lg font-semibold transition backdrop-blur-sm flex items-center gap-2">
                <Award size={18} />
                View Achievements
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Support Bar */}
      
    </div>
  );
};

export default BrandAmbassador;