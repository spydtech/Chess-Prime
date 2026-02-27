import React from 'react';
import { Check, ChevronRight, Calendar, Users, BookOpen, Award, Target, Clock, Sparkles, Shield, Star, Gift } from 'lucide-react';

const PricingSection = () => {
  const courses = [
    {
      level: "Beginner",
      plan: "3 Months Plan",
      price: "7,000",
      originalPrice: "9,000",
      savings: "2,000",
      features: [
        "Weekly 2 interactive sessions",
        "Weekly practice tournaments",
        "Access to class recordings & resources",
        "2 Compensation classes & 1 tournament Preparation session"
      ],
      popular: false,
      color: "from-blue-500 to-blue-600"
    },
    {
      level: "Beginner",
      plan: "6 Months Plan",
      price: "12,000",
      originalPrice: "18,000",
      savings: "6,000",
      features: [
        "Weekly 2 interactive sessions",
        "Weekly practice tournaments",
        "Access to class recordings & resources",
        "5 Compensation classes & 2 tournament Preparation sessions"
      ],
      popular: true,
      color: "from-yellow-500 to-yellow-600"
    },
    {
      level: "Individual / 1-1 Classes",
      plan: "14 sessions",
      price: "13,000",
      originalPrice: "16,000",
      savings: "3,000",
      features: [
        "Classes at your convenience",
        "Weekly practice tournaments",
        "Access to class recordings & resources",
        "Access to Chess resources"
      ],
      popular: false,
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#150F0B] text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2 mb-6">
            <Award size={18} className="text-yellow-500" />
            <span className="text-yellow-500 font-medium">Affordable Excellence</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our <span className="text-yellow-500">Prices</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan that suits your learning journey
          </p>

          {/* Decorative Line */}
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-transparent mx-auto mt-6"></div>
        </div>

        {/* Explore Courses Title */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="h-px w-12 bg-gradient-to-l from-yellow-500 to-transparent"></div>
          <h3 className="text-2xl md:text-3xl font-semibold text-white flex items-center gap-2">
            <Target className="text-yellow-500" size={28} />
            Explore Courses
          </h3>
          <div className="h-px w-12 bg-gradient-to-r from-yellow-500 to-transparent"></div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`relative group ${course.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {/* Popular Badge */}
              {course.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-yellow-500/25">
                    <Sparkles size={16} />
                    Most Popular
                    <Sparkles size={16} />
                  </div>
                </div>
              )}

              {/* Card Background with Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${course.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`}></div>
              
              {/* Main Card */}
              <div className="relative bg-[#1E1A16] rounded-2xl overflow-hidden border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 h-full flex flex-col">
                
                {/* Card Header with Gradient */}
                <div className={`bg-gradient-to-r ${course.color} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
                  
                  {/* Level Badge */}
                  <div className="inline-block bg-black/30 backdrop-blur-sm rounded-full px-4 py-1 mb-4">
                    <span className="text-white font-medium">{course.level}</span>
                  </div>
                  
                  {/* Plan Name */}
                  <h4 className="text-2xl font-bold text-white mb-2">{course.plan}</h4>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-white">₹{course.price}</span>
                    <span className="text-white/60 line-through">₹{course.originalPrice}</span>
                  </div>
                  
                  {/* Savings */}
                  <div className="inline-block bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm text-white flex items-center gap-1">
                      <Gift size={14} />
                      You Save ₹{course.savings}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="p-6 flex-1">
                  <div className="space-y-4">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-yellow-500" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 space-y-3">
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 rounded-xl transition transform hover:scale-[1.02] flex items-center justify-center gap-2">
                    <BookOpen size={18} />
                    Book Demo
                  </button>
                  <button className="w-full border border-yellow-500/30 hover:border-yellow-500 text-white font-semibold py-3 rounded-xl transition backdrop-blur-sm flex items-center justify-center gap-2">
                    <Users size={18} />
                    Enroll Now
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-yellow-500/5 to-transparent rounded-tl-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features/Trust Badges */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 bg-[#1E1A16] rounded-xl p-4 border border-yellow-500/10">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Calendar className="text-yellow-500" size={20} />
            </div>
            <div>
              <h5 className="text-white font-semibold">Flexible Schedule</h5>
              <p className="text-xs text-gray-400">Learn at your pace</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1E1A16] rounded-xl p-4 border border-yellow-500/10">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Shield className="text-yellow-500" size={20} />
            </div>
            <div>
              <h5 className="text-white font-semibold">Money-back Guarantee</h5>
              <p className="text-xs text-gray-400">7-day trial</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1E1A16] rounded-xl p-4 border border-yellow-500/10">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Users className="text-yellow-500" size={20} />
            </div>
            <div>
              <h5 className="text-white font-semibold">Expert Coaches</h5>
              <p className="text-xs text-gray-400">Grandmaster trained</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1E1A16] rounded-xl p-4 border border-yellow-500/10">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Star className="text-yellow-500" size={20} />
            </div>
            <div>
              <h5 className="text-white font-semibold">Certified Course</h5>
              <p className="text-xs text-gray-400">Industry recognized</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Not sure which plan suits you best?</p>
          <button className="bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-3 rounded-lg font-semibold transition inline-flex items-center gap-2">
            <Clock size={18} />
            Talk to our counselor
          </button>
        </div>

        {/* Bottom Support Bar (if needed) */}
        <div className="mt-16 border-t border-yellow-500/20 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">🏆 5000+ Students Enrolled</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400">⭐ 4.9 Rating (2.5k reviews)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-500 text-sm">Limited time offer:</span>
              <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm font-semibold">
                Save up to ₹6000
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;