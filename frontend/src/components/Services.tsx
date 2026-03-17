import { Weight, Flame, UserCheck, Apple, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Services() {
  const services = [
    {
      icon: <Weight className="w-8 h-8 text-primary" />,
      title: "Weight Training",
      description: "Build foundational strength and muscle mass with our curated powerlifting and bodybuilding protocols.",
    },
    {
      icon: <Flame className="w-8 h-8 text-primary" />,
      title: "Fat Burning",
      description: "High-intensity interval training (HIIT) specifically designed to maximize caloric expenditure and metabolism.",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-primary" />,
      title: "Personal Training",
      description: "One-on-one coaching with weekly body composition analysis and form correction.",
    },
    {
      icon: <Apple className="w-8 h-8 text-primary" />,
      title: "Nutrition",
      description: "Customized meal plans focused on macro-nutrient balance and sustainable lifestyle habits.",
    }
  ];

  return (
    <section id="services" className="section-padding bg-dark-accent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group"
            >
              <div className="mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-white/50 mb-8 leading-relaxed">
                {service.description}
              </p>
              <a href="#" className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
