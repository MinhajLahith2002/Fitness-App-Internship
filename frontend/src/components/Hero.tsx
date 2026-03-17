import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import heroImg from '../assets/images/hero image.jpg';

export default function Hero() {
  return (
    <section
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-dark"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-black/40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-block bg-primary/20 border border-primary/30 px-4 py-1 rounded-full mb-6">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Established 2023</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-4 tracking-tighter uppercase">
            Build Your <br />
            <span className="text-primary">Dream Body</span>
          </h1>
          
          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
            Transform your life through elite training, state-of-the-art facilities, and a community that pushes you to be your best.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary group">
              Join Membership
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary">
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full -mr-20 -mb-20"></div>
    </section>
  );
}
