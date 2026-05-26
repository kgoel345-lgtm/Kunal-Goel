/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin, 
  ChevronDown, 
  Star, 
  MessageCircle, 
  Send, 
  Menu, 
  X,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROGRAMS, REVIEWS, GALLERY_IMAGES, SLIDER_IMAGES, TEACHER_IMAGES } from './constants';

const WHATSAPP_URL = "https://wa.me/918018098094";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [teacherImageIndex, setTeacherImageIndex] = useState(0);

  // Auto-slide for hero/image slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate teacher images
  useEffect(() => {
    const timer = setInterval(() => {
      setTeacherImageIndex((prev) => (prev + 1) % TEACHER_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header Bar */}
      <div className="bg-sage text-white py-2 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-2">
        <div className="flex items-center gap-4">
          <a href="tel:+918018098094" className="flex items-center gap-1 hover:text-beige transition-colors">
            <Phone size={14} /> +91 80180 98094
          </a>
          <a href="mailto:Anandamyogayoga.office@gmail.com" className="flex items-center gap-1 hover:text-beige transition-colors">
            <Mail size={14} /> Anandamyogayoga.office@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://www.facebook.com/share/1CBa8KbBaU/" target="_blank" rel="noopener noreferrer" className="hover:text-beige transition-colors"><Facebook size={16} /></a>
          <a href="https://www.instagram.com/anandamyogawith_pragati?igsh=cXJ1dGdnNWxxOGRs" target="_blank" rel="noopener noreferrer" className="hover:text-beige transition-colors"><Instagram size={16} /></a>
          <a href="https://youtube.com/@anandamyogawithpragati?si=H4jYxMpWNEmSSe_I" target="_blank" rel="noopener noreferrer" className="hover:text-beige transition-colors"><Youtube size={16} /></a>
          <a href="https://www.linkedin.com/in/pragati-gupta-909751399?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hover:text-beige transition-colors"><Linkedin size={16} /></a>
        </div>
      </div>

      {/* Logo Section */}
      <div className="bg-white py-8 text-center">
        <h1 className="text-3xl md:text-5xl font-serif tracking-widest text-sage uppercase">
          Anandam Yoga <span className="text-gold block md:inline text-xl md:text-2xl mt-2 md:mt-0 md:ml-4 font-normal italic">by Pragati</span>
        </h1>
      </div>

      {/* Navigation Bar */}
      <nav className="glass-nav">
        <div className="max-w-7xl mx-auto px-6 flex justify-center items-center h-16 relative">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-stone-600 font-medium">
            <button onClick={() => scrollToSection('home')} className="hover:text-sage transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-sage transition-colors">About Us</button>
            
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('programs')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-sage transition-colors">
                Program <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'programs' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-64 bg-white dropdown-shadow rounded-lg py-4 mt-2"
                  >
                    {PROGRAMS.map((p) => (
                      <button 
                        key={p.id}
                        onClick={() => scrollToSection('programs')}
                        className="w-full text-left px-6 py-2 hover:bg-beige hover:text-sage transition-colors text-sm"
                      >
                        {p.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('fees')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-sage transition-colors">
                Fees <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'fees' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-48 bg-white dropdown-shadow rounded-lg py-4 mt-2"
                  >
                    <button onClick={() => scrollToSection('fees')} className="w-full text-left px-6 py-2 hover:bg-beige hover:text-sage transition-colors text-sm">Fees for Adults</button>
                    <button onClick={() => scrollToSection('fees')} className="w-full text-left px-6 py-2 hover:bg-beige hover:text-sage transition-colors text-sm">Fees for Kids</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => scrollToSection('contact')} className="hover:text-sage transition-colors">Contact Us</button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden absolute right-6 text-stone-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-stone-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4 text-stone-600 font-medium">
                <button onClick={() => scrollToSection('home')} className="text-left">Home</button>
                <button onClick={() => scrollToSection('about')} className="text-left">About Us</button>
                <div className="flex flex-col gap-2 pl-4 border-l-2 border-beige">
                  <span className="text-xs uppercase tracking-widest text-stone-400">Programs</span>
                  {PROGRAMS.map(p => (
                    <button key={p.id} onClick={() => scrollToSection('programs')} className="text-left text-sm">{p.title}</button>
                  ))}
                </div>
                <div className="flex flex-col gap-2 pl-4 border-l-2 border-beige">
                  <span className="text-xs uppercase tracking-widest text-stone-400">Fees</span>
                  <button onClick={() => scrollToSection('fees')} className="text-left text-sm">Fees for Adults</button>
                  <button onClick={() => scrollToSection('fees')} className="text-left text-sm">Fees for Kids</button>
                </div>
                <button onClick={() => scrollToSection('contact')} className="text-left">Contact Us</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative lg:min-h-[85vh] flex items-center bg-beige py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Text */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-gold font-medium tracking-widest uppercase text-sm mb-4 block"
            >
              Anandam Yoga by Pragati
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 text-stone-900 leading-tight"
            >
              Find Your <span className="text-sage italic">Inner Peace</span> with Anandam Yoga
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-stone-600 mb-10 font-light leading-relaxed max-w-xl"
            >
              Transform your body, mind, and soul with customized, interactive yoga practices and expert guidance from Pragati Gupta.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a 
                href="https://forms.gle/m62FyBAAm1rofneq5"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium text-lg px-8 py-3 text-center inline-block cursor-pointer"
              >
                Enquire Now
              </a>
              <button 
                onClick={() => scrollToSection('programs')}
                className="px-8 py-3 border-2 border-sage/30 text-sage hover:border-sage hover:bg-sage/5 font-medium rounded-full transition-all duration-300 text-lg text-center cursor-pointer"
              >
                Explore Programs
              </button>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Background design elements */}
            <div className="absolute -inset-4 bg-gold/10 rounded-3xl blur-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-gold/40" />
            <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-sage/40" />
            
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img 
                src="https://drive.google.com/thumbnail?id=1T_McFCUuno5aq-1nHwJQJ5PP1EyNVkqH&sz=w1200" 
                alt="Pragati Gupta performing Yoga on a hill" 
                className="w-full h-auto object-cover max-h-[550px] hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-sage mb-4">Our Specialized Programs</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6" />
            <p className="text-stone-500 max-w-2xl mx-auto">
              We offer a diverse range of yoga practices tailored to meet your unique health goals and lifestyle needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMS.map((program, index) => (
              <motion.div 
                key={program.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ 
                  duration: 0.6, 
                  delay: (index % 3) * 0.12,
                  ease: [0.25, 1, 0.5, 1]
                }}
                whileHover={{ y: -10 }}
                className="bg-beige/50 p-8 rounded-2xl border border-stone-100 flex flex-col"
              >
                <h3 className="text-2xl text-sage mb-4">{program.title}</h3>
                <p className="text-stone-600 mb-6 flex-grow leading-relaxed">
                  {program.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {program.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-stone-500">
                      <CheckCircle2 size={16} className="text-gold" /> {benefit}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center gap-2 text-sage font-semibold hover:text-gold transition-colors group"
                >
                  Learn More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us / Teacher Section */}
      <section id="about" className="section-padding bg-beige">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-semibold">The Instructor</span>
            <h2 className="text-4xl md:text-5xl text-sage">Meet Pragati Gupta</h2>
            <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed space-y-4">
              <p className="text-lg italic text-sage-light">"Yoga is not just a practice, it's a journey back to yourself."</p>
              <p>
                With over 10 years of dedicated experience in the field of yoga and wellness, Pragati Gupta has established herself as a beacon of health and mindfulness in Gurgaon. Her journey began with a deep desire to understand the connection between movement and mental peace, leading her to master various forms of Hatha and Vinyasa yoga.
              </p>
              <p>
                Pragati is widely recognized as a top yoga instructor, known for her empathetic and personalized approach. She has provided private coaching for high-profile clients, tailoring sessions to their demanding lifestyles while ensuring profound physical and mental benefits.
              </p>
              <p>
                Her expertise extends to specialized therapeutic yoga. She has successfully helped numerous women navigate the beautiful journey of motherhood through pregnancy yoga, and has been instrumental in helping clients manage complex conditions like Thyroid, PCOS, and PCOD through targeted yogic interventions.
              </p>
              <p>
                Whether it's a weight loss journey or a quest for spiritual grounding, Pragati's guidance is emotional, inspiring, and deeply trustworthy. Currently teaching in Gurgaon, she continues to transform lives, one breath at a time.
              </p>
            </div>
            <button onClick={() => scrollToSection('contact')} className="btn-premium">Connect with Pragati</button>
          </motion.div>

          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img 
                key={teacherImageIndex}
                src={TEACHER_IMAGES[teacherImageIndex]}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white">
              <p className="text-sm uppercase tracking-widest mb-1">Experience</p>
              <p className="text-2xl font-serif">10+ Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fees Section */}
      <section id="fees" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-sage mb-4">Membership Plans</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6" />
            <p className="text-stone-500">Invest in your health with our transparent and flexible pricing.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Adults Table */}
            <div className="bg-beige/30 p-8 rounded-3xl border border-stone-100">
              <h3 className="text-2xl text-sage mb-6 flex items-center gap-2">
                Fees for Adults <span className="text-sm font-sans text-stone-400 font-normal">(Ages 18+)</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="py-4 font-serif text-stone-500">Time Period</th>
                      <th className="py-4 font-serif text-stone-500">Classes</th>
                      <th className="py-4 font-serif text-stone-500">Amount (INR)</th>
                      <th className="py-4 font-serif text-stone-500">Amount (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-stone-100 hover:bg-white/50 transition-colors">
                      <td className="py-6 font-medium">Monthly</td>
                      <td className="py-6">24 Classes</td>
                      <td className="py-6 text-sage font-bold">₹15,000</td>
                      <td className="py-6 text-gold font-medium">~$180</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-sm text-stone-400 italic">* Personalized coaching and diet consultation included.</p>
            </div>

            {/* Kids Table */}
            <div className="bg-beige/30 p-8 rounded-3xl border border-stone-100">
              <h3 className="text-2xl text-sage mb-6 flex items-center gap-2">
                Fees for Kids <span className="text-sm font-sans text-stone-400 font-normal">(Ages 5-15)</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="py-4 font-serif text-stone-500">Time Period</th>
                      <th className="py-4 font-serif text-stone-500">Classes</th>
                      <th className="py-4 font-serif text-stone-500">Amount (INR)</th>
                      <th className="py-4 font-serif text-stone-500">Amount (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-stone-100 hover:bg-white/50 transition-colors">
                      <td className="py-6 font-medium">Monthly</td>
                      <td className="py-6">24 Classes</td>
                      <td className="py-6 text-sage font-bold">₹12,000</td>
                      <td className="py-6 text-gold font-medium">~$145</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-sm text-stone-400 italic">* Interactive sessions designed specifically for young minds.</p>
            </div>
          </div>
        </div>
      </section>



      {/* Photo Gallery */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-sage mb-4">Our Gallery</h2>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-2xl overflow-hidden group">
                <img 
                  src={img} 
                  alt={`Gallery ${idx}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="section-padding bg-beige">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-sage mb-4">Client Testimonials</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6" />
            <p className="text-stone-500">Hear from those who have transformed their lives with us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100"
              >
                <div className="flex gap-1 text-gold mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-stone-600 mb-8 italic leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-stone-800">{review.name}</h4>
                    <p className="text-xs text-stone-400 uppercase tracking-widest">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl text-sage mb-6">Start Your Journey</h2>
            <p className="text-stone-600 mb-10 text-lg">
              Have questions or ready to book your first session? Fill out the form or reach out directly via WhatsApp.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-beige rounded-full flex items-center justify-center text-sage">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-stone-400 uppercase tracking-widest">Call Us</p>
                  <p className="text-lg font-medium text-stone-800">+91 80180 98094</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-beige rounded-full flex items-center justify-center text-sage">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-stone-400 uppercase tracking-widest">Email Us</p>
                  <p className="text-lg font-medium text-stone-800">Anandamyogayoga.office@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-beige rounded-full flex items-center justify-center text-sage">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-sm text-stone-400 uppercase tracking-widest">WhatsApp</p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-sage hover:text-gold transition-colors underline underline-offset-4">Chat with us now</a>
                </div>
              </div>
            </div>
          </div>

          <form className="bg-beige/30 p-8 md:p-12 rounded-3xl border border-stone-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-600">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-600">Phone Number</label>
                <input type="tel" placeholder="+91 80180 98094" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-600">Message</label>
              <textarea rows={4} placeholder="Tell us about your health goals..." className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all resize-none"></textarea>
            </div>
            <button type="submit" className="w-full btn-premium flex items-center justify-center gap-2">
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif text-white uppercase tracking-widest">Anandam Yoga</h3>
            <p className="text-sm leading-relaxed">
              Premium wellness and yoga coaching by Pragati Gupta. Dedicated to helping you find balance, strength, and inner peace through the ancient science of yoga.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1CBa8KbBaU/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/anandamyogawith_pragati?igsh=cXJ1dGdnNWxxOGRs" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Instagram size={20} /></a>
              <a href="https://youtube.com/@anandamyogawithpragati?si=H4jYxMpWNEmSSe_I" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Youtube size={20} /></a>
              <a href="https://www.linkedin.com/in/pragati-gupta-909751399?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-gold transition-colors">Home</button></li>
              <li><button onClick={() => scrollToSection('programs')} className="hover:text-gold transition-colors">Programs</button></li>
              <li><button onClick={() => scrollToSection('fees')} className="hover:text-gold transition-colors">Fees</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-gold transition-colors">About Us</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-gold transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Programs</h4>
            <ul className="space-y-4 text-sm">
              {PROGRAMS.map(p => (
                <li key={p.id}><button onClick={() => scrollToSection('programs')} className="hover:text-gold transition-colors">{p.title}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><Phone size={16} className="text-gold" /> +91 80180 98094</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-gold" /> Anandamyogayoga.office@gmail.com</li>
              <li className="flex items-start gap-3">
                <div className="mt-1"><ArrowRight size={16} className="text-gold" /></div>
                Gurgaon, Haryana, India
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Anandam Yoga by Pragati. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://forms.gle/m62FyBAAm1rofneq5"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-white px-6 py-3 rounded-full shadow-2xl font-semibold flex items-center justify-center gap-2"
        >
          Enquire Now <ArrowRight size={18} />
        </motion.a>
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
        >
          <MessageCircle size={28} fill="currentColor" />
        </motion.a>
      </div>
    </div>
  );
}
