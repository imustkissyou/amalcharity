import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
  {
    image: '/images/hero-1.jpg',
    title: 'ساهم في بناء مستقبل أفضل',
    subtitle: 'تبرعك اليوم يصل إلى من يستحق غدًا',
    description: 'انضم إلى آلاف المتبرعين الذين يحدثون فرقًا حقيقيًا في حياة المحتاجين حول العالم',
    cta: 'تبرع الآن',
    ctaLink: '/projects',
  },
  {
    image: '/images/hero-2.jpg',
    title: 'بناء المساجد في القرى النائية',
    subtitle: 'منح المسلمين مكانًا قريبًا للصلاة',
    description: 'بمساهمتك، تمنحهم نورًا يرافقهم كل يوم... وصدقة جارية لا ينتهي أثرها',
    cta: 'تبرع لمشروع مسجد',
    ctaLink: '/projects',
  },
  {
    image: '/images/hero-3.jpg',
    title: 'إغاثة عاجلة للمناطق المتضررة',
    subtitle: 'كن سببًا في إنقاذ حياة إنسان',
    description: 'نصل إلى المحتاجين في أسرع وقت، ونوفر لهم الغذاء والمأوى والعلاج',
    cta: 'تبرع للإغاثة',
    ctaLink: '/projects',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-oceanic/90 via-oceanic/40 to-oceanic/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-coral text-white text-xs font-semibold px-3 py-1 rounded-full mb-4"
              >
                {slides[current].subtitle}
              </motion.span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                {slides[current].title}
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                {slides[current].description}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to={slides[current].ctaLink}
                  className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold px-6 py-3 rounded-xl shadow-coral transition-all duration-200 hover:shadow-lg"
                >
                  <Heart className="w-5 h-5" />
                  {slides[current].cta}
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-200"
                >
                  تعرف علينا
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-4 right-4 flex justify-between z-20 pointer-events-none">
        <button
          onClick={nextSlide}
          className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-coral' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
