import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    goal: 'Weight Loss',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (formState.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (formState.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Updated URL to connect to backend
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors from backend
        if (data.errors) {
          setErrors(data.errors);
        } else {
          throw new Error(data.message || 'Failed to send message');
        }
        return;
      }

      // Success!
      setIsSubmitted(true);
      setFormState({ name: '', email: '', goal: 'Weight Loss', message: '' });
    } catch (error) {
      console.error("Error sending email:", error);
      setErrors({ submit: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row">
          {/* Left: Form */}
          <div className="lg:w-1/2 p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-4 uppercase tracking-tighter">
                Ready to <span className="text-primary">Start?</span>
              </h2>
              <p className="text-dark/50 mb-10 text-lg">
                Your transformation begins with a single conversation. Fill out the form and we'll reach out within 24 hours.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-100 p-8 rounded-2xl text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">Thank you for reaching out. Our team will contact you shortly.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-green-600 font-bold underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-dark/40 uppercase tracking-widest mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl py-4 px-6 focus:outline-none focus:border-primary transition-colors`}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark/40 uppercase tracking-widest mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl py-4 px-6 focus:outline-none focus:border-primary transition-colors`}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark/40 uppercase tracking-widest mb-2">Select Goal</label>
                    <select
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-6 focus:outline-none focus:border-primary transition-colors appearance-none"
                      value={formState.goal}
                      onChange={(e) => setFormState({ ...formState, goal: e.target.value })}
                    >
                      <option>Weight Loss</option>
                      <option>Muscle Gain</option>
                      <option>Endurance</option>
                      <option>General Fitness</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark/40 uppercase tracking-widest mb-2">Message</label>
                    <textarea
                      placeholder="Tell us about your fitness goals..."
                      rows={4}
                      className={`w-full bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-xl py-4 px-6 focus:outline-none focus:border-primary transition-colors resize-none`}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
                  </div>
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-600 text-sm font-medium">
                      {errors.submit}
                    </div>
                  )}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`btn-primary w-full py-5 text-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send className="w-5 h-5" />}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right: Image */}
          <div className="lg:w-1/2 relative min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
              alt="Gym Interior"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </section>
  );
}