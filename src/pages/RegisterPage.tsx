import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { UserPlus, Eye, EyeOff, Heart } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return;
    }
    if (!agreed) {
      setError('يجب الموافقة على الشروط والأحكام');
      return;
    }

    setLoading(true);
    try {
      const success = await register(name, email, phone, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('حدث خطأ أثناء التسجيل');
      }
    } catch {
      setError('حدث خطأ أثناء التسجيل');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Image side */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/images/hero-1.jpg"
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
            <h2 className="text-3xl font-bold mb-4">انضم إلينا</h2>
            <p className="text-white/70 leading-relaxed">
              أنشئ حسابك وكن جزءًا من مجتمع المتبرعين، وتابع تبرعاتك بسهولة.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md py-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-oceanic mb-2">إنشاء حساب جديد</h1>
            <p className="text-taupe text-sm">أنشئ حسابك وابدأ رحلة الخير</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-charcoal mb-1.5 block">الاسم الكامل</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="أدخل اسمك الكامل"
                className="w-full h-12 px-4 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-oceanic/20 focus:border-oceanic transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-charcoal mb-1.5 block">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                className="w-full h-12 px-4 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-oceanic/20 focus:border-oceanic transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-charcoal mb-1.5 block">رقم الهاتف</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                placeholder="0500000000"
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

            <div>
              <label className="text-sm font-medium text-charcoal mb-1.5 block">تأكيد كلمة المرور</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                placeholder="أعد إدخال كلمة المرور"
                className="w-full h-12 px-4 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-oceanic/20 focus:border-oceanic transition-all"
              />
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-border text-oceanic focus:ring-oceanic"
              />
              <span className="text-sm text-taupe">
                أوافق على <a href="#" className="text-oceanic hover:text-coral">شروط الخدمة</a> و <a href="#" className="text-oceanic hover:text-coral">سياسة الخصوصية</a>
              </span>
            </label>

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
                  <UserPlus className="w-5 h-5" />
                  إنشاء الحساب
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-taupe">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-oceanic hover:text-coral font-semibold transition-colors">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
