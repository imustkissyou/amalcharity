import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { useCart } from '@/context/CartContext';
import {
  Heart, MapPin, Users, Clock, FileText, ArrowLeft,
  Shield, Target, CalendarDays, UserCircle
} from 'lucide-react';
import { useState } from 'react';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-charcoal/60">المشروع غير موجود</p>
          <Link to="/projects" className="text-oceanic hover:text-coral mt-2 inline-block">العودة للمشاريع</Link>
        </div>
      </div>
    );
  }

  const presetAmounts = [50, 100, 250, 500, 1000, 2000];
  const progress = Math.round((project.raisedAmount / project.targetAmount) * 100);
  const remaining = project.targetAmount - project.raisedAmount;

  const handleDonate = () => {
    const amount = customAmount ? parseInt(customAmount) : selectedAmount;
    if (amount > 0) {
      addItem({
        projectId: project.id,
        projectTitle: project.title,
        amount,
        image: project.image,
      });
    }
  };

  const currentAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero image */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-oceanic/80 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-6">
          <div className="max-w-7xl mx-auto">
            <Link to="/projects" className="text-white/80 hover:text-white text-sm mb-3 inline-flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              العودة للمشاريع
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold text-white">{project.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Info cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { icon: Users, label: 'المستفيدين', value: project.beneficiaries.toLocaleString() },
                { icon: Clock, label: 'المدة', value: project.duration || 'مستمر' },
                { icon: MapPin, label: 'الموقع', value: project.location.split('،')[0] },
                { icon: Shield, label: 'الترخيص', value: project.license || 'مفعّل' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-4 text-center shadow-card"
                >
                  <item.icon className="w-5 h-5 text-oceanic mx-auto mb-2" />
                  <p className="text-lg font-bold text-oceanic">{item.value}</p>
                  <p className="text-xs text-taupe">{item.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-oceanic">{progress}%</span>
                <div className="text-left">
                  <p className="text-sm text-taupe">
                    {project.raisedAmount.toLocaleString()} / {project.targetAmount.toLocaleString()} ر.ق
                  </p>
                  <p className="text-xs text-coral">{remaining.toLocaleString()} ر.ق متبقي</p>
                </div>
              </div>
              <div className="h-3 bg-beige rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-l from-coral to-coral-dark rounded-full"
                />
              </div>
              <div className="flex items-center justify-between mt-3 text-sm text-taupe">
                <span className="flex items-center gap-1">
                  <UserCircle className="w-4 h-4" />
                  {project.donorCount || 0} متبرع
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  ترخيص: {project.license?.split('/').pop() || '2025'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
              <h2 className="text-lg font-bold text-oceanic mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                عن المشروع
              </h2>
              <p className="text-charcoal/70 leading-relaxed">{project.description}</p>
              {project.acceptsZakat && (
                <div className="mt-4 bg-oceanic/5 rounded-xl p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-oceanic shrink-0 mt-0.5" />
                  <p className="text-sm text-oceanic">
                    هذا المشروع يقبل الزكاة. تم التحقق منه من قبل هيئة الرقابة الشرعية.
                  </p>
                </div>
              )}
            </div>

            {/* Related projects */}
            <div>
              <h2 className="text-lg font-bold text-oceanic mb-4">مشاريع مشابهة</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.filter(p => p.category === project.category && p.id !== project.id).slice(0, 2).map(p => (
                  <Link
                    key={p.id}
                    to={`/projects/${p.id}`}
                    className="flex gap-3 bg-white rounded-xl p-3 shadow-card hover:shadow-card-hover transition-all"
                  >
                    <img src={p.image} alt={p.title} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-oceanic line-clamp-2">{p.title}</h4>
                      <p className="text-xs text-taupe mt-1">{p.location.split('،')[0]}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Donation sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-card sticky top-28">
              <h3 className="font-bold text-oceanic text-lg mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                تبرع للمشروع
              </h3>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {presetAmounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      selectedAmount === amount && !customAmount
                        ? 'bg-oceanic text-white'
                        : 'bg-oceanic/5 text-oceanic hover:bg-oceanic/10'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              <div className="relative mb-4">
                <input
                  type="number"
                  placeholder="مبلغ آخر"
                  value={customAmount}
                  onChange={e => setCustomAmount(e.target.value)}
                  className="w-full h-12 pr-12 pl-4 bg-oceanic/5 border border-oceanic/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-oceanic/20 focus:border-oceanic transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-taupe">ر.ق</span>
              </div>

              <div className="bg-beige rounded-xl p-4 mb-4">
                <p className="text-sm text-charcoal/70 text-center">
                  مبلغ التبرع: <span className="font-bold text-oceanic text-lg">{currentAmount.toLocaleString()}</span> ر.ق
                </p>
              </div>

              <button
                onClick={handleDonate}
                className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold py-3 rounded-xl shadow-coral transition-all duration-200"
              >
                <Heart className="w-5 h-5" />
                أضف للسلة
              </button>

              <p className="text-center text-xs text-taupe mt-3">
                يمكنك إضافة عدة مشاريع ثم إتمام التبرع
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
