import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Zap, Heart } from 'lucide-react';

const quickAmounts = [
  { amount: 50, label: 'وجبة إفطار' },
  { amount: 100, label: 'مستلزمات مدرسية' },
  { amount: 200, label: 'حقيبة غذائية' },
  { amount: 500, label: 'مساهمة في بئر ماء' },
  { amount: 1000, label: 'دعم كفالة يتيم' },
  { amount: 5000, label: 'مساهمة في بناء مسجد' },
];

export default function QuickDonateSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-oceanic to-oceanic-light relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-14 h-14 bg-coral/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Zap className="w-7 h-7 text-coral" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">تبرع سريع</h2>
          <p className="text-white/70 max-w-lg mx-auto">
            اختر مبلغ التبرع المناسب لك وساهم في دعم المحتاجين بشكل سريع ومباشر
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {quickAmounts.map((item, i) => (
            <motion.div
              key={item.amount}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to="/projects"
                className="block text-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:border-coral/50 rounded-2xl p-4 transition-all duration-200 group"
              >
                <span className="text-xl font-bold text-white group-hover:text-coral transition-colors">
                  {item.amount}
                </span>
                <span className="text-xs text-white/60 block">ر.ق</span>
                <span className="text-xs text-white/50 mt-2 block">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-3 rounded-xl shadow-coral transition-all duration-200 hover:shadow-lg"
          >
            <Heart className="w-5 h-5" />
            اختر مشروعك
          </Link>
        </div>
      </div>
    </section>
  );
}
