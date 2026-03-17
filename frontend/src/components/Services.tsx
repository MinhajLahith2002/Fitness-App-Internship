import { Weight, Flame, UserCheck, Apple, ArrowRight, Search, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const services = [
    {
      icon: <Weight className="w-8 h-8 text-primary" />,
      title: "Weight Training",
      description: "Build foundational strength and muscle mass with our curated powerlifting and bodybuilding protocols.",
      category: "Strength",
      tags: ["strength", "muscle", "powerlifting", "bodybuilding"]
    },
    {
      icon: <Flame className="w-8 h-8 text-primary" />,
      title: "Fat Burning",
      description: "High-intensity interval training (HIIT) specifically designed to maximize caloric expenditure and metabolism.",
      category: "Cardio",
      tags: ["hiit", "cardio", "fat loss", "metabolism"]
    },
    {
      icon: <UserCheck className="w-8 h-8 text-primary" />,
      title: "Personal Training",
      description: "One-on-one coaching with weekly body composition analysis and form correction.",
      category: "Coaching",
      tags: ["personal", "coaching", "one-on-one", "guidance"]
    },
    {
      icon: <Apple className="w-8 h-8 text-primary" />,
      title: "Nutrition",
      description: "Customized meal plans focused on macro-nutrient balance and sustainable lifestyle habits.",
      category: "Wellness",
      tags: ["nutrition", "diet", "meal plan", "wellness"]
    },
    {
      icon: <Weight className="w-8 h-8 text-primary" />,
      title: "Yoga & Flexibility",
      description: "Improve your flexibility, balance, and mental wellbeing with our expert-led yoga sessions.",
      category: "Wellness",
      tags: ["yoga", "flexibility", "mindfulness", "stretching"]
    },
    {
      icon: <Flame className="w-8 h-8 text-primary" />,
      title: "CrossFit",
      description: "High-intensity functional training that combines weightlifting, cardio, and gymnastics.",
      category: "Strength",
      tags: ["crossfit", "functional", "intense", "workout"]
    }
  ];

  // Get unique categories
  const categories = ['All', ...new Set(services.map(service => service.category))];

  // Filter services based on search term and category
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      // Category filter
      if (selectedCategory !== 'All' && service.category !== selectedCategory) {
        return false;
      }
      
      // Search filter (if search term exists)
      if (searchTerm.trim() !== '') {
        const searchLower = searchTerm.toLowerCase();
        return (
          service.title.toLowerCase().includes(searchLower) ||
          service.description.toLowerCase().includes(searchLower) ||
          service.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    });
  }, [searchTerm, selectedCategory]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <section id="services" className="section-padding bg-dark-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">
              Our <span className="text-primary">Premium Services</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Tailored programs designed to hit your specific goals, no matter where you are in your journey.
            </p>
          </motion.div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-dark border border-white/10 rounded-xl py-3 px-4 text-white flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Filters & Search
              </span>
              <span>{showFilters ? '▼' : '▶'}</span>
            </button>
          </div>

          {/* Search and Filters Container */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-dark/50 rounded-2xl p-6 border border-white/10">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search services by name, description, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-dark border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/30 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-white/50 text-sm uppercase tracking-wider mr-2">Filter by:</span>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-black'
                        : 'bg-dark border border-white/10 text-white/70 hover:border-primary/30 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
                
                {/* Clear Filters Button (shown when filters are active) */}
                {(searchTerm || selectedCategory !== 'All') && (
                  <button
                    onClick={clearFilters}
                    className="ml-auto flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Results Count */}
              <div className="mt-4 text-white/30 text-sm">
                Showing {filteredServices.length} of {services.length} services
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group"
                >
                  <div className="mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    {service.icon}
                  </div>
                  
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full mb-4">
                    {service.category}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/50 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/5 text-white/30 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <a href="#" className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          // No Results State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="bg-dark/50 rounded-2xl p-12 max-w-md mx-auto">
              <Search className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No services found</h3>
              <p className="text-white/50 mb-6">
                We couldn't find any services matching your search criteria.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary inline-flex items-center gap-2"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}