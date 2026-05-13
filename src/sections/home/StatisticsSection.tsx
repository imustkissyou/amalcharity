import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Wallet, Heart, Globe } from 'lucide-react';

const statsData = [
  { icon: Users, value: 150000, suffix: '+', label: 'متبرع نشط' },
  { icon: Wallet, value: 250000000, suffix: ' ر.ق', label: 'إجمالي التبرعات' },
  { icon: Heart, value: 5200, suffix: '+', label: 'مشروع منفذ' },
  { icon: Globe, value: 50, suffix: '+', label: 'دولة نشطة' },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  const formatted = value >= 1000000
    ? `${(display / 1000000).toFixed(0)}M`
    : value >= 1000
    ? display.toLocaleString()
    : display;

  return (
    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-oceanic tabular-nums">
      {formatted}{suffix}
    </span>
  );
}

export default function StatisticsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 bg-oceanic relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-coral text-sm font-semibold">إنجازاتنا</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">أرقام تتحدث عن تأثيرنا</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-coral/30 transition-colors"
            >
              <div className="w-12 h-12 bg-coral/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-coral" />
              </div>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
              <p className="text-white/70 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
