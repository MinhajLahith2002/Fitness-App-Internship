import { Users, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import aboutImg from '../assets/images/about_image.jpg';

export default function About() {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-black" />,
      title: "Professional Trainers",
      description: "Certified experts with backgrounds in kinesiology and sports science."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-black" />,
      title: "Modern Equipment",
      description: "Premium machines and tools for hypertrophy, strength, and conditioning."
    },
    {
      icon: <Zap className="w-6 h-6 text-black" />,
      title: "Friendly Community",
      description: "A supportive ecosystem of athletes and beginners alike."
    }
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Image with Badge */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={aboutImg}
              alt="Trainer and Client"
              className="w-full h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          {/* Experience Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute -bottom-8 -right-8 md:right-8 bg-primary p-8 rounded-2xl shadow-xl text-center min-w-[180px]"
          >
            <span className="block text-4xl font-black text-black">10+</span>
            <span className="text-black/80 font-bold text-sm uppercase tracking-wider">Years Experience</span>
          </motion.div>
        </div>

        {/* Right: Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">About Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6 leading-tight uppercase">
              Expertise In <br />
              <span className="text-primary">Human Performance</span>
            </h2>
            <p className="text-dark/60 text-lg mb-10 leading-relaxed">
              At Fitness Sports Center, we believe in a scientific approach to fitness. Our facility is designed to provide the ultimate environment for physical transformation.
            </p>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark mb-1">{feature.title}</h3>
                    <p className="text-dark/50">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
