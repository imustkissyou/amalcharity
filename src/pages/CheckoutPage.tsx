import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import {
  Check, CreditCard, Smartphone, Landmark, ArrowLeft,
  Shield, Lock, Wallet
} from 'lucide-react';

const steps = ['تفاصيل التبرع', 'البيانات الشخصية', 'الدفع'];

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <Wallet className="w-16 h-16 text-oceanic/20 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-oceanic mb-2">سلة التبرع فارغة</h2>
          <p className="text-taupe mb-4">أضف بعض المشاريع للتبرع</p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-oceanic text-white px-6 py-3 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            تصفح المشاريع
          </Link>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-card max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-emerald-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-oceanic mb-2">تم التبرع بنجاح!</h2>
          <p className="text-taupe mb-6">
            شكراً لتبرعك! سيتم إرسال تأكيد على بريدك الإلكتروني.
          </p>
          <div className="flex gap-3">
            <Link
              to="/dashboard"
              className="flex-1 flex items-center justify-center gap-2 bg-oceanic text-white py-3 rounded-xl font-semibold"
            >
              لوحة التحكم
            </Link>
            <Link
              to="/projects"
              className="flex-1 flex items-center justify-center gap-2 bg-coral text-white py-3 rounded-xl font-semibold"
            >
              مشاريع جديدة
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="bg-oceanic py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl font-bold text-white mb-6">إتمام التبرع</h1>

          {/* Steps */}
          <div className="flex items-center gap-2">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i === currentStep ? 'bg-coral text-white' :
                  i < currentStep ? 'bg-emerald-500 text-white' :
                  'bg-white/20 text-white/60'
                }`}>
                  {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm hidden md:block ${i === currentStep ? 'text-white' : 'text-white/50'}`}>
                  {step}
                </span>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 ${i < currentStep ? 'bg-emerald-500' : 'bg-white/20'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-card"
            >
              {currentStep === 0 && (
                <div>
                  <h2 className="font-bold text-oceanic mb-4">تفاصيل التبرع</h2>
                  <div className="space-y-3 mb-6">
                    {items.map(item => (
                      <div key={item.projectId} className="flex items-center gap-3 bg-ivory rounded-xl p-3">
                        <img src={item.image} alt={item.projectTitle} className="w-14 h-14 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-oceanic line-clamp-1">{item.projectTitle}</p>
                          <p className="text-sm text-coral font-bold">{item.amount.toLocaleString()} ر.ق</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="w-full flex items-center justify-center gap-2 bg-oceanic hover:bg-oceanic-light text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    التالي
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              )}

              {currentStep === 1 && (
                <div>
                  <h2 className="font-bold text-oceanic mb-4">البيانات الشخصية</h2>
                  <div className="space-y-4">
                    {[
                      { label: 'الاسم الكامل', field: 'name', type: 'text', placeholder: 'أدخل اسمك' },
                      { label: 'البريد الإلكتروني', field: 'email', type: 'email', placeholder: 'example@email.com' },
                      { label: 'رقم الهاتف', field: 'phone', type: 'tel', placeholder: '0500000000' },
                    ].map(inp => (
                      <div key={inp.field}>
                        <label className="text-sm font-medium text-charcoal mb-1.5 block">{inp.label}</label>
                        <input
                          type={inp.type}
                          value={formData[inp.field as keyof typeof formData]}
                          onChange={e => setFormData(prev => ({ ...prev, [inp.field]: e.target.value }))}
                          placeholder={inp.placeholder}
                          className="w-full h-12 px-4 bg-oceanic/5 border border-oceanic/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-oceanic/20 focus:border-oceanic transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setCurrentStep(0)}
                      className="flex-1 py-3 rounded-xl border border-border text-charcoal font-semibold hover:bg-oceanic/5 transition-colors"
                    >
                      السابق
                    </button>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 flex items-center justify-center gap-2 bg-oceanic hover:bg-oceanic-light text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                      التالي
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="font-bold text-oceanic mb-4">طريقة الدفع</h2>

                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'card', label: 'بطاقة ائتمان/مدينة', icon: CreditCard },
                      { id: 'apple', label: 'Apple Pay', icon: Smartphone },
                      { id: 'bank', label: 'تحويل بنكي', icon: Landmark },
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === method.id
                            ? 'border-oceanic bg-oceanic/5'
                            : 'border-border hover:border-oceanic/20'
                        }`}
                      >
                        <method.icon className={`w-5 h-5 ${paymentMethod === method.id ? 'text-oceanic' : 'text-taupe'}`} />
                        <span className={`font-medium ${paymentMethod === method.id ? 'text-oceanic' : 'text-charcoal'}`}>
                          {method.label}
                        </span>
                        {paymentMethod === method.id && (
                          <Check className="w-5 h-5 text-oceanic mr-auto" />
                        )}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="text-sm font-medium text-charcoal mb-1.5 block">رقم البطاقة</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="4242 4242 4242 4242"
                            className="w-full h-12 px-4 pl-12 bg-oceanic/5 border border-oceanic/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-oceanic/20"
                          />
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-taupe" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-charcoal mb-1.5 block">تاريخ الانتهاء</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full h-12 px-4 bg-oceanic/5 border border-oceanic/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-oceanic/20"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-charcoal mb-1.5 block">CVC</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full h-12 px-4 bg-oceanic/5 border border-oceanic/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-oceanic/20"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-taupe mb-6">
                    <Shield className="w-4 h-4" />
                    <span>جميع المعاملات مشفرة وآمنة</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 py-3 rounded-xl border border-border text-charcoal font-semibold hover:bg-oceanic/5 transition-colors"
                    >
                      السابق
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold py-3 rounded-xl shadow-coral transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          تأكيد التبرع
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-card sticky top-28">
              <h3 className="font-bold text-oceanic mb-4">ملخص التبرع</h3>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.projectId} className="flex justify-between text-sm">
                    <span className="text-charcoal/70 line-clamp-1 flex-1">{item.projectTitle}</span>
                    <span className="font-semibold text-oceanic shrink-0 mr-2">
                      {item.amount.toLocaleString()} ر.ق
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-taupe">المجموع</span>
                  <span className="font-bold text-oceanic">{totalAmount.toLocaleString()} ر.ق</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
