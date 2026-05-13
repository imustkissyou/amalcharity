import { Link } from 'react-router';
import { Heart, Phone, Mail, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const quickLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/about' },
  { label: 'المشاريع', href: '/projects' },
  { label: 'حاسبة الزكاة', href: '/zakat' },
];

const policyLinks = [
  { label: 'سياسة الخصوصية', href: '#' },
  { label: 'شروط الاستخدام', href: '#' },
  { label: 'الحوكمة', href: '#' },
  { label: 'الأسئلة الشائعة', href: '#' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

export default function Footer() {
  return (
    <footer className="bg-oceanic text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-coral fill-coral" />
              </div>
              <div>
                <span className="font-bold text-lg block">أمل الخيرية</span>
                <span className="text-white/60 text-xs">منصة الأمل الخيرية</span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              منصة خيرية رقمية متكاملة، تهدف إلى نقل تجربة التبرع التقليدية إلى فضاء رقمي يتسم بالاتساق والوضوح.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-coral transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="text-white/70 hover:text-coral text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold text-base mb-4">سياسات المنصة</h4>
            <ul className="space-y-2.5">
              {policyLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/70 hover:text-coral text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-base mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Phone className="w-4 h-4 text-coral shrink-0" />
                <span dir="ltr">+974 4444 4444</span>
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Mail className="w-4 h-4 text-coral shrink-0" />
                info@amalcharity.org
              </li>
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                شارع الخليج، الدوحة، قطر
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs text-center sm:text-right">
            جميع الحقوق محفوظة &copy; منصة أمل الخيرية {new Date().getFullYear()}
          </p>
          <p className="text-white/40 text-xs">
            منظمة خيرية مسجلة - جمعية الأمل الخيرية
          </p>
        </div>
      </div>
    </footer>
  );
}
