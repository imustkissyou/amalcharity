import { motion } from 'framer-motion';
import { Calendar, Heart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';

const plans = [
  { label: 'يومي', amount: 10, description: '10 ر.ق يوميًا = 300 ر.ق شهريًا', impact: 'تغذية أسرة كاملة' },
  { label: 'أسبوعي', amount: 50, description: '50 ر.ق أسبوعيًا = 200 ر.ق شهريًا', impact: 'مستلزمات تعليمية' },
  { label: 'شهري', amount: 200, description: '200 ر.ق شهريًا = 2,400 ر.ق سنويًا', impact: 'كفالة طفل يتيم' },
  { label: 'كل جمعة', amount: 100, description: '100 ر.ق كل جمعة = 400 ر.ق شهريًا', impact: 'دعم مشاريع دائمة' },
];

export default function RecurringSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-coral text-sm font-semibold">التبرع الدوري</span>
          <h2 className="text-2xl md:text-3xl font-bold text-oceanic mt-1 mb-3">سُئل النبي ﷺ: أي الأعمال أحب إلى الله؟</h2>
          <p className="text-charcoal/70 text-lg">
            قال: «أدومها وإن قل»
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-ivory hover:bg-white border border-transparent hover:border-oceanic/10 rounded-2xl p-6 transition-all duration-300 group hover:shadow-card"
            >
              <div className="w-10 h-10 bg-oceanic/10 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5 text-oceanic" />
              </div>
              <h3 className="font-bold text-oceanic text-lg mb-1">{plan.label}</h3>
              <p className="text-2xl font-bold text-coral mb-2">
                {plan.amount} <span className="text-sm text-taupe font-normal">ر.ق</span>
              </p>
              <p className="text-taupe text-sm mb-3">{plan.description}</p>
              <div className="flex items-center gap-1.5 text-sm text-oceanic">
                <TrendingUp className="w-4 h-4" />
                <span>{plan.impact}</span>
              </div>
              <Link
                to="/projects"
                className="mt-4 w-full flex items-center justify-center gap-2 bg-oceanic hover:bg-oceanic-light text-white text-sm font-semibold py-2.5 rounded-xl transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              >
                <Heart className="w-4 h-4" />
                اشترك
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
