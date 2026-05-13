import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import {
  LayoutDashboard, Heart, Wallet, Calendar, Settings, LogOut,
  TrendingUp, Users, ArrowLeft
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const chartData = [
  { month: 'يناير', amount: 450 },
  { month: 'فبراير', amount: 720 },
  { month: 'مارس', amount: 380 },
  { month: 'أبريل', amount: 900 },
  { month: 'مايو', amount: 650 },
  { month: 'يونيو', amount: 1100 },
];

const recentDonations = [
  { id: '1', project: 'كفالة الأيتام - برنامج الرعاية الشاملة', amount: 500, date: '2025-05-01', status: 'completed' as const },
  { id: '2', project: 'حفر آبار المياه العميقة', amount: 200, date: '2025-04-15', status: 'completed' as const },
  { id: '3', project: 'الإغاثة الطبية العاجلة', amount: 1000, date: '2025-04-02', status: 'completed' as const },
  { id: '4', project: 'دعم التعليم للأطفال الفقراء', amount: 300, date: '2025-03-20', status: 'completed' as const },
  { id: '5', project: 'بناء مسجد في قرية نائية', amount: 1500, date: '2025-03-05', status: 'completed' as const },
];

const COLORS = ['#083C5A', '#0A4D6D', '#E8734A', '#4ECDC4', '#8C8C8C', '#083C5A'];

export default function DonorDashboardPage() {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  const totalDonated = recentDonations.reduce((s, d) => s + d.amount, 0);
  const projectsCount = recentDonations.length;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="bg-oceanic py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">لوحة التحكم</h1>
          <p className="text-white/70">مرحبًا {user.name}، إليك ملخص نشاطك</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="p-6 text-center border-b border-border">
                <div className="w-16 h-16 bg-oceanic rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-oceanic">{user.name}</h3>
                <p className="text-taupe text-sm">{user.email}</p>
              </div>
              <nav className="p-3">
                {[
                  { icon: LayoutDashboard, label: 'الرئيسية', active: true },
                  { icon: Heart, label: 'تبرعاتي', active: false },
                  { icon: Wallet, label: 'المدفوعات', active: false },
                  { icon: Settings, label: 'الإعدادات', active: false },
                ].map(item => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1 ${
                      item.active
                        ? 'bg-oceanic/10 text-oceanic'
                        : 'text-charcoal/70 hover:bg-oceanic/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-border mt-2 pt-2">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    تسجيل الخروج
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Wallet, label: 'إجمالي التبرعات', value: `${totalDonated.toLocaleString()} ر.ق`, color: 'bg-oceanic' },
                { icon: Heart, label: 'المشاريع المدعومة', value: `${projectsCount} مشروع`, color: 'bg-coral' },
                { icon: TrendingUp, label: 'السلة الحالية', value: `${itemCount} عنصر`, color: 'bg-emerald-500' },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-card"
                >
                  <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-3`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-oceanic">{card.value}</p>
                  <p className="text-sm text-taupe">{card.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h3 className="font-bold text-oceanic mb-4">توزيع التبرعات الشهري</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8C8C8C' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#8C8C8C' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value: number) => [`${value} ر.ق`, 'المبلغ']}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Donations table */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-oceanic">سجل التبرعات</h3>
                <Link to="/projects" className="text-sm text-oceanic hover:text-coral flex items-center gap-1">
                  تبرع جديد
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-ivory">
                    <tr>
                      <th className="text-right text-sm font-semibold text-charcoal/70 py-3 px-4">المشروع</th>
                      <th className="text-right text-sm font-semibold text-charcoal/70 py-3 px-4">المبلغ</th>
                      <th className="text-right text-sm font-semibold text-charcoal/70 py-3 px-4">التاريخ</th>
                      <th className="text-right text-sm font-semibold text-charcoal/70 py-3 px-4">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDonations.map((d, i) => (
                      <tr key={d.id} className={`border-t border-border hover:bg-oceanic/5 transition-colors ${i >= 4 ? 'hidden md:table-row' : ''}`}>
                        <td className="py-3 px-4 text-sm text-oceanic font-medium">{d.project}</td>
                        <td className="py-3 px-4 text-sm font-semibold text-coral">{d.amount.toLocaleString()} ر.ق</td>
                        <td className="py-3 px-4 text-sm text-taupe">
                          <Calendar className="w-3 h-3 inline ml-1" />
                          {d.date}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
                            مكتمل
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
