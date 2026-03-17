import { Dumbbell, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2A1E17] text-white pt-20 pb-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-1.5 rounded-lg">
                <Dumbbell className="text-black w-6 h-6" />
              </div>
              <span className="text-white font-black text-xl tracking-tighter uppercase">
                Fitness <span className="text-primary">Sports Center</span>
              </span>
            </div>
            <p className="text-white/50 mb-8 leading-relaxed">
              Redefining the standards of fitness since 2023. We provide the tools, the space, and the guidance you need to become your best self.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-4 text-white/50">
              <li><a href="#" className="hover:text-primary transition-colors">Membership Plans</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Class Schedule</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Personal Training</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest">Contact Info</h4>
            <ul className="space-y-4 text-white/50">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary w-5 h-5 mt-1" />
                <span>123, Colombo 01</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary w-5 h-5" />
                <span>+94 12345678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary w-5 h-5" />
                <span>fitnesssportscenter.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter (Bonus) */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest">Newsletter</h4>
            <p className="text-white/50 mb-4 text-sm">Subscribe for tips and special offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-black p-2 rounded-lg hover:bg-yellow-500 transition-colors">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm">
          <p>© 2024 Fitness Sports Center. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
