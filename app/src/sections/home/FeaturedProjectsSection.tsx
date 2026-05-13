import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { Heart, MapPin, Users, ArrowLeft } from 'lucide-react';

const featured = projects.slice(2, 6);

export default function FeaturedProjectsSection() {
  return (
    <section className="py-16 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-coral text-sm font-semibold">المشاريع المميزة</span>
            <h2 className="text-2xl md:text-3xl font-bold text-oceanic mt-1">فرص تبرع مميزة</h2>
          </div>
          <Link to="/projects" className="hidden md:flex items-center gap-1 text-oceanic hover:text-coral text-sm font-medium transition-colors">
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col sm:flex-row"
            >
              <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {project.acceptsZakat && (
                  <div className="absolute top-3 right-3 bg-oceanic/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    يقبل الزكاة
                  </div>
                )}
              </div>
              <div className="flex-1 p-5 flex flex-col">
                <h3 className="font-bold text-oceanic mb-2 line-clamp-2">{project.title}</h3>
                <p className="text-taupe text-sm leading-relaxed line-clamp-2 mb-3">{project.description}</p>
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
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-coral font-semibold">
                      {Math.round((project.raisedAmount / project.targetAmount) * 100)}%
                    </span>
                    <span className="text-taupe">
                      {project.raisedAmount.toLocaleString()} / {project.targetAmount.toLocaleString()} ر.ق
                    </span>
                  </div>
                  <div className="h-2 bg-beige rounded-full overflow-hidden mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(project.raisedAmount / project.targetAmount) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-l from-coral to-coral-dark rounded-full"
                    />
                  </div>
                  <Link
                    to={`/projects/${project.id}`}
                    className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white text-sm font-semibold py-2.5 rounded-xl shadow-coral transition-all duration-200"
                  >
                    <Heart className="w-4 h-4" />
                    تبرع الآن
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
