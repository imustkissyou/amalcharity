import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { Heart, Clock, MapPin, Users } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const urgentProjects = projects.filter(p => p.urgency === 'high').slice(0, 4);

export default function UrgentProjectsSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-16 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-coral text-sm font-semibold">حالات عاجلة</span>
            <h2 className="text-2xl md:text-3xl font-bold text-oceanic mt-1">تحتاج إلى تبرع عاجل</h2>
          </div>
          <Link to="/projects" className="hidden md:flex items-center gap-1 text-oceanic hover:text-coral text-sm font-medium transition-colors">
            عرض الكل
            <span>&larr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {urgentProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  عاجل
                </div>
                {project.acceptsZakat && (
                  <div className="absolute top-3 left-3 bg-oceanic/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    يقبل الزكاة
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-oceanic text-sm leading-relaxed line-clamp-2 mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 text-taupe text-xs mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {project.location.split('،')[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {project.beneficiaries.toLocaleString()} مستفيد
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
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(project.raisedAmount / project.targetAmount) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-l from-coral to-coral-dark rounded-full"
                    />
                  </div>
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="w-full flex items-center justify-center gap-2 bg-oceanic hover:bg-oceanic-light text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  تبرع الآن
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
