import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import {
  Heart, Users, Home, Calculator, User, LogIn,
  Menu, X, ShoppingCart, ChevronDown, LayoutDashboard, LogOut
} from 'lucide-react';

const navLinks = [
  { label: 'الرئيسية', href: '/', icon: Home },
  { label: 'من نحن', href: '/about', icon: Users },
  { label: 'المشاريع', href: '/projects', icon: Heart },
  { label: 'حاسبة الزكاة', href: '/zakat', icon: Calculator },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white shadow-sm'
        }`}
      >
        {/* Top bar */}
        <div className="bg-oceanic text-white py-1.5 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <Link to="/zakat" className="hover:text-coral transition-colors flex items-center gap-1">
                <Calculator className="w-3 h-3" />
                حاسبة الزكاة
              </Link>
              <Link to="/projects" className="hover:text-coral transition-colors flex items-center gap-1">
                <Heart className="w-3 h-3" />
                تطوع معنا
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span>ر.ق - ريال قطري</span>
              <span className="text-oceanic-light/70">|</span>
              <span>En</span>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-oceanic to-oceanic-light rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-oceanic font-bold text-lg leading-tight">أمل الخيرية</span>
                <span className="text-[10px] text-taupe -mt-0.5">منصة الأمل الخيرية</span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-oceanic bg-oceanic/10'
                      : 'text-charcoal/70 hover:text-oceanic hover:bg-oceanic/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 rounded-lg hover:bg-oceanic/5 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-oceanic" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              {/* Profile */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-oceanic/5 transition-colors"
                  >
                    <div className="w-8 h-8 bg-oceanic rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden md:block text-sm text-oceanic font-medium">{user?.name}</span>
                    <ChevronDown className="w-4 h-4 text-oceanic" />
                  </button>
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-card border border-border overflow-hidden"
                      >
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-4 py-3 hover:bg-oceanic/5 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-oceanic" />
                          <span className="text-sm">لوحة التحكم</span>
                        </Link>
                        <button
                          onClick={() => { logout(); setProfileOpen(false); }}
                          className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-500 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm">تسجيل الخروج</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-oceanic hover:bg-oceanic/5 rounded-lg transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  تسجيل الدخول
                </Link>
              )}

              {/* Donate button */}
              <Link
                to="/projects"
                className="hidden sm:flex items-center gap-1.5 bg-coral hover:bg-coral-dark text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-coral transition-all duration-200 hover:shadow-lg"
              >
                <Heart className="w-4 h-4" />
                تبرع الآن
              </Link>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-oceanic/5 transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-border overflow-hidden"
            >
              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? 'bg-oceanic/10 text-oceanic'
                        : 'text-charcoal/70 hover:bg-oceanic/5 hover:text-oceanic'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-border my-2" />
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-charcoal/70 hover:bg-oceanic/5">
                      <LayoutDashboard className="w-4 h-4" />
                      لوحة التحكم
                    </Link>
                    <button onClick={logout} className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-red-500 hover:bg-red-50">
                      <LogOut className="w-4 h-4" />
                      تسجيل الخروج
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-oceanic hover:bg-oceanic/5">
                    <LogIn className="w-4 h-4" />
                    تسجيل الدخول
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer */}
      <div className="h-[72px] md:h-[108px]" />
    </>
  );
}
