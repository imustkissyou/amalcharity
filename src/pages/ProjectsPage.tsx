import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { useCart } from '@/context/CartContext';
import {
  Heart, MapPin, Users, Search, Filter, Baby, GraduationCap,
  Droplets, Building2, Stethoscope, Utensils, HandHeart, Clock,
  ArrowLeft, X
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'الكل', icon: Filter },
  { id: 'kafala', label: 'كفالات', icon: Baby },
  { id: 'education', label: 'تعليم', icon: GraduationCap },
  { id: 'water', label: 'مياه', icon: Droplets },
  { id: 'mosque', label: 'مساجد', icon: Building2 },
  { id: 'health', label: 'صحة', icon: Stethoscope },
  { id: 'sadaqah', label: 'صدقات', icon: Utensils },
  { id: 'relief', label: 'إغاثة', icon: HandHeart },
];

const filters = [
  { id: 'all', label: 'الكل' },
  { id: 'urgent', label: 'عاجل' },
  { id: 'zakat', label: 'يقبل الزكاة' },
  { id: 'almost', label: 'أقرب للإنجاز' },
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCart();

  const filtered = useMemo(() => {
    let result = [...projects];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedFilter === 'urgent') {
      result = result.filter(p => p.urgency === 'high');
    } else if (selectedFilter === 'zakat') {
      result = result.filter(p => p.acceptsZakat);
    } else if (selectedFilter === 'almost') {
      result = result.filter(p => (p.raisedAmount / p.targetAmount) >= 0.7);
    }

    if (searchQuery) {
      result = result.filter(p =>
        p.title.includes(searchQuery) ||
        p.description.includes(searchQuery) ||
        p.location.includes(searchQuery)
      );
    }

    return result;
  }, [selectedCategory, selectedFilter, searchQuery]);

  const handleQuickDonate = (project: typeof projects[0]) => {
    addItem({
      projectId: project.id,
      projectTitle: project.title,
      amount: 100,
      image: project.image,
    });
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Page header */}
      <div className="bg-oceanic py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">المشاريع الخيرية</h1>
          <p className="text-white/70">اختر مشروعك وساهم في تغيير حياة المحتاجين</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-taupe" />
          <input
            type="text"
            placeholder="ابحث في المشاريع..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full h-12 pr-12 pl-4 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-oceanic/20 focus:border-oceanic transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute left-4 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-taupe" />
            </button>
          )}
        </div>

        {/* Filters - desktop */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <h3 className="font-bold text-oceanic mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                تصفية النتائج
              </h3>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-charcoal mb-3">التصنيفات</h4>
                <div className="space-y-1.5">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-oceanic/10 text-oceanic font-semibold'
                          : 'text-charcoal/70 hover:bg-oceanic/5'
                      }`}
                    >
                      <cat.icon className="w-4 h-4" />
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-charcoal mb-3">الفلاتر</h4>
                <div className="space-y-1.5">
                  {filters.map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`w-full px-3 py-2 rounded-lg text-sm transition-colors text-right ${
                        selectedFilter === filter.id
                          ? 'bg-coral/10 text-coral font-semibold'
                          : 'text-charcoal/70 hover:bg-coral/5'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Projects grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-taupe text-sm">
                {filtered.length} مشروع
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl">
                <Heart className="w-12 h-12 text-oceanic/20 mx-auto mb-4" />
                <p className="text-charcoal/60 font-medium">لا توجد مشاريع مطابقة للبحث</p>
                <p className="text-taupe text-sm mt-1">جرب تغيير الفلاتر أو البحث</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    <div className="relative">
                      <Link to={`/projects/${project.id}`}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      {project.urgency === 'high' && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          عاجل
                        </div>
                      )}
                      {project.acceptsZakat && (
                        <div className="absolute top-3 left-3 bg-oceanic/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          يقبل الزكاة
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <Link to={`/projects/${project.id}`}>
                        <h3 className="font-bold text-oceanic text-sm leading-relaxed line-clamp-2 mb-2 group-hover:text-coral transition-colors">
                          {project.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-3 text-xs text-taupe mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {project.location.split('،')[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {project.beneficiaries.toLocaleString()}
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-coral font-semibold">
                            {Math.round((project.raisedAmount / project.targetAmount) * 100)}%
                          </span>
                          <span className="text-taupe">
                            {project.raisedAmount.toLocaleString()} / {project.targetAmount.toLocaleString()} ر.ق
                          </span>
                        </div>
                        <div className="h-2 bg-beige rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-l from-coral to-coral-dark rounded-full transition-all duration-500"
                            style={{ width: `${(project.raisedAmount / project.targetAmount) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/projects/${project.id}`}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-oceanic hover:bg-oceanic-light text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                        >
                          التفاصيل
                          <ArrowLeft className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => handleQuickDonate(project)}
                          className="flex items-center justify-center gap-1.5 bg-coral hover:bg-coral-dark text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-coral transition-all"
                        >
                          <Heart className="w-3 h-3" />
                          100 ر.ق
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
