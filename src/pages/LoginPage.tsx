import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { LogIn, Eye, EyeOff, Heart } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('بيانات الدخول غير صحيحة');
      }
    } catch {
      setError('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Image side */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/images/hero-3.jpg"
          alt="خيرية"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-oceanic/70" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-md"
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-coral fill-coral" />
            </div>
            <h2 className="text-3xl font-bold mb-4">منصة أمل الخيرية</h2>
            <p className="text-white/70 leading-relaxed">
              انضم إلى مجتمع المتبرعين وكن جزءًا من التغيير الإيجابي في حياة المحتاجين حول العالم.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-oceanic mb-2">تسجيل الدخول</h1>
            <p className="text-taupe text-sm">مرحبًا بعودتك، أدخل بيانات الدخول الخاصة بك</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-charcoal mb-1.5 block">
                البريد الإلكتروني أو رقم الهاتف
              </label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="أدخل بريدك الإلكتروني"
                className="w-full h-12 px-4 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-oceanic/20 focus:border-oceanic transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-charcoal mb-1.5 block">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="أدخل كلمة المرور"
                  className="w-full h-12 px-4 pl-12 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-oceanic/20 focus:border-oceanic transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-taupe hover:text-oceanic"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold h-12 rounded-xl shadow-coral transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  تسجيل الدخول
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-taupe">
              ليس لديك حساب؟{' '}
              <Link to="/register" className="text-oceanic hover:text-coral font-semibold transition-colors">
                أنشئ حساب جديد
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
