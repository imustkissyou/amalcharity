import { motion } from 'framer-motion';
import { Heart, Target, Eye, HandHeart, Shield, Globe, Award, Users } from 'lucide-react';

const values = [
  { icon: Shield, label: 'الشفافية', desc: 'نلتزم بالكشف الكامل عن مصادر ووجهات التبرعات' },
  { icon: HandHeart, label: 'الإنسانية', desc: 'نضع الإنسان في صلب كل مشاريعنا وبرامجنا' },
  { icon: Globe, label: 'الشمول', desc: 'نصل إلى المحتاجين في أكثر من 50 دولة حول العالم' },
  { icon: Award, label: 'الجودة', desc: 'نلتزم بأعلى معايير الجودة في تنفيذ مشاريعنا' },
];

const partners = [
  'UN ECOSOC', 'IOM', 'START NETWORK', 'CHS Alliance', 'OCHA', 'UNICEF'
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-oceanic via-oceanic to-oceanic-light py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Heart className="w-12 h-12 text-coral mx-auto mb-4" />
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">من نحن</h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
              منصة أمل الخيرية هي منصة خيرية رقمية متكاملة، تهدف إلى نقل تجربة التبرع التقليدية إلى فضاء رقمي يتسم بالاتساق والوضوح والشفافية.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-card"
          >
            <div className="w-12 h-12 bg-oceanic/10 rounded-xl flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-oceanic" />
            </div>
            <h2 className="text-xl font-bold text-oceanic mb-3">رؤيتنا</h2>
            <p className="text-charcoal/70 leading-relaxed">
              أن نكون المنصة الرائدة عالميًا في تسهيل العمل الخيري والإنساني، وأن نكون الوسيلة الأكثر موثوقية وشفافية لربط المتبرعين بالمحتاجين في جميع أنحاء العالم.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-card"
          >
            <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-coral" />
            </div>
            <h2 className="text-xl font-bold text-oceanic mb-3">رسالتنا</h2>
            <p className="text-charcoal/70 leading-relaxed">
              تمكين الأفراد والمؤسسات من التبرع بسهولة وشفافية، وتنفيذ مشاريع إنسانية مستدامة تحسن حياة المحتاجين في المجتمعات الفقيرة والمنكوبة حول العالم.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="text-center mb-10">
          <span className="text-coral text-sm font-semibold">قيمنا</span>
          <h2 className="text-2xl md:text-3xl font-bold text-oceanic mt-1">مبادئنا الأساسية</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {values.map((val, i) => (
            <motion.div
              key={val.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card text-center hover:shadow-card-hover transition-all"
            >
              <div className="w-14 h-14 bg-oceanic/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <val.icon className="w-7 h-7 text-oceanic" />
              </div>
              <h3 className="font-bold text-oceanic mb-2">{val.label}</h3>
              <p className="text-taupe text-sm leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Partners */}
        <div className="bg-white rounded-2xl p-8 shadow-card">
          <h2 className="text-xl font-bold text-oceanic mb-6 text-center">شركاؤنا</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((partner, idx) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-ivory rounded-xl p-4 flex items-center justify-center text-center"
              >
                <div>
                  <Globe className="w-6 h-6 text-oceanic mx-auto mb-2" />
                  <span className="text-xs font-semibold text-oceanic">{partner}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-oceanic to-oceanic-light rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Users, value: '150,000+', label: 'متبرع' },
              { icon: Heart, value: '5,200+', label: 'مشروع' },
              { icon: Globe, value: '50+', label: 'دولة' },
              { icon: Target, value: '250M', label: 'ريال مجموع' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <item.icon className="w-6 h-6 text-coral mx-auto mb-2" />
                <p className="text-xl font-bold text-white">{item.value}</p>
                <p className="text-white/60 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
