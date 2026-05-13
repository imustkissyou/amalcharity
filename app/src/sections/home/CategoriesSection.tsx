import { motion } from 'framer-motion';
import { Heart, GraduationCap, Droplets, Building2, Stethoscope, Utensils, HandHeart, Baby } from 'lucide-react';
import { Link } from 'react-router';

const categories = [
  { icon: Baby, label: 'كفالات', desc: 'كفالة الأيتام', color: 'bg-rose-50 text-rose-500' },
  { icon: Heart, label: 'صدقات', desc: 'صدقة جارية', color: 'bg-amber-50 text-amber-500' },
  { icon: GraduationCap, label: 'تعليم', desc: 'دعم التعليم', color: 'bg-sky-50 text-sky-500' },
  { icon: Droplets, label: 'مياه', desc: 'حفر آبار', color: 'bg-cyan-50 text-cyan-500' },
  { icon: Building2, label: 'مساجد', desc: 'بناء المساجد', color: 'bg-emerald-50 text-emerald-500' },
  { icon: Stethoscope, label: 'صحة', desc: 'الإغاثة الطبية', color: 'bg-red-50 text-red-500' },
  { icon: Utensils, label: 'إطعام', desc: 'إفطار صائم', color: 'bg-orange-50 text-orange-500' },
  { icon: HandHeart, label: 'إغاثة', desc: 'إغاثة عاجلة', color: 'bg-violet-50 text-violet-500' },
];

export default function CategoriesSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-oceanic">تبرع في مجال يهمك</h2>
          <p className="text-taupe mt-2 text-sm">اختر مجال التبرع الذي ي closest إلى قلبك</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to="/projects"
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-ivory hover:bg-oceanic/5 border border-transparent hover:border-oceanic/10 transition-all duration-200 group"
              >
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-oceanic">{cat.label}</span>
                <span className="text-xs text-taupe -mt-1">{cat.desc}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
