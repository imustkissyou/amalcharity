import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Coins, Gem, CircleDollarSign, TrendingUp, Beef,
  Calculator, RotateCcw, Info
} from 'lucide-react';

const zakatTabs = [
  { id: 'money', label: 'زكاة المال', icon: Coins, description: 'حساب زكاة المال والمدخرات' },
  { id: 'gold', label: 'زكاة الذهب', icon: Gem, description: 'حساب زكاة الذهب والمجوهرات' },
  { id: 'silver', label: 'زكاة الفضة', icon: CircleDollarSign, description: 'حساب زكاة الفضة' },
  { id: 'stocks', label: 'زكاة الأسهم', icon: TrendingUp, description: 'حساب زكاة الأسهم والاستثمارات' },
  { id: 'fitr', label: 'زكاة الفطر', icon: Beef, description: 'حساب زكاة الفطر' },
];

export default function ZakatCalculatorPage() {
  const [activeTab, setActiveTab] = useState('money');
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const handleInput = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const getVal = (field: string) => parseFloat(inputs[field] || '0') || 0;

  const calculateZakat = (): number => {
    switch (activeTab) {
      case 'money':
        return (getVal('cash') + getVal('bank') + getVal('savings') + getVal('investments') + getVal('debts_owed') - getVal('debts_on')) * 0.025;
      case 'gold':
        return getVal('gold_grams') * getVal('gold_price') * 0.025;
      case 'silver':
        return getVal('silver_grams') * getVal('silver_price') * 0.025;
      case 'stocks':
        return getVal('stocks_value') * 0.025;
      case 'fitr':
        return getVal('family_count') * 25;
      default:
        return 0;
    }
  };

  const zakatAmount = calculateZakat();

  const renderFields = () => {
    const fields: Record<string, { label: string; field: string; hint?: string }[]> = {
      money: [
        { label: 'النقدية في اليد', field: 'cash' },
        { label: 'رصيد البنوك', field: 'bank' },
        { label: 'حسابات التوفير', field: 'savings' },
        { label: 'الاستثمارات', field: 'investments' },
        { label: 'الديون المستحقة لك', field: 'debts_owed', hint: 'أموال يدين بها لك الآخرون' },
        { label: 'الديون عليك', field: 'debts_on', hint: 'خصم' },
      ],
      gold: [
        { label: 'وزن الذهب (جرام)', field: 'gold_grams' },
        { label: 'سعر الذهب لكل جرام (ر.ق)', field: 'gold_price', hint: 'متوسط السعر الحالي' },
      ],
      silver: [
        { label: 'وزن الفضة (جرام)', field: 'silver_grams' },
        { label: 'سعر الفضة لكل جرام (ر.ق)', field: 'silver_price', hint: 'متوسط السعر الحالي' },
      ],
      stocks: [
        { label: 'القيمة السوقية للأسهم (ر.ق)', field: 'stocks_value', hint: 'القيمة الإجمالية' },
      ],
      fitr: [
        { label: 'عدد أفراد الأسرة', field: 'family_count', hint: 'يشمل الزوج والأطفال والمستخدمين' },
      ],
    };

    return fields[activeTab] || [];
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="bg-gradient-to-br from-oceanic to-oceanic-light py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <Calculator className="w-12 h-12 text-coral mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">حاسبة الزكاة</h1>
          <p className="text-white/70 max-w-lg mx-auto">
            احسب زكاتك بسهولة ودقة وفق المعايير الشرعية المعتمدة
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {zakatTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setInputs({}); }}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-oceanic text-white shadow-lg shadow-oceanic/20'
                  : 'bg-white text-oceanic hover:bg-oceanic/5 border border-oceanic/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-oceanic text-lg">
                  {zakatTabs.find(t => t.id === activeTab)?.label}
                </h2>
                <button
                  onClick={() => setInputs({})}
                  className="flex items-center gap-1 text-sm text-taupe hover:text-oceanic transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  إعادة
                </button>
              </div>

              <div className="space-y-4">
                {renderFields().map(field => (
                  <div key={field.field}>
                    <label className="text-sm font-medium text-charcoal mb-1.5 block">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={inputs[field.field] || ''}
                      onChange={e => handleInput(field.field, e.target.value)}
                      placeholder="0"
                      className="w-full h-12 px-4 bg-oceanic/5 border border-oceanic/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-oceanic/20 focus:border-oceanic transition-all"
                    />
                    {field.hint && (
                      <p className="text-xs text-taupe mt-1 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        {field.hint}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Result */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-card sticky top-28">
              <h3 className="font-bold text-oceanic mb-4">مبلغ الزكاة الواجب</h3>
              <div className="bg-gradient-to-br from-oceanic to-oceanic-light rounded-xl p-6 text-center mb-4">
                <p className="text-white/70 text-sm mb-1">المبلغ الإجمالي</p>
                <p className="text-3xl font-bold text-white">
                  {zakatAmount > 0 ? zakatAmount.toLocaleString('ar-SA', { maximumFractionDigits: 2 }) : '0'}
                </p>
                <p className="text-white/60 text-sm">ر.ق</p>
              </div>

              {zakatAmount > 0 && (
                <>
                  <div className="bg-beige rounded-xl p-4 mb-4">
                    <p className="text-sm text-charcoal/70 text-center">
                      نسبة الزكاة: <span className="font-bold text-oceanic">2.5%</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // Navigate to projects with zakat filter
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold py-3 rounded-xl shadow-coral transition-all"
                  >
                    <Coins className="w-5 h-5" />
                    ادفع زكاتك
                  </button>
                </>
              )}

              <div className="mt-4 bg-oceanic/5 rounded-xl p-4">
                <p className="text-xs text-oceanic text-center leading-relaxed">
                  يُسنُّ إخراج زكاة المال فوراً عند بلوغ النصاب. تأكد من استشعار أهل العلم للحالات الخاصة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
