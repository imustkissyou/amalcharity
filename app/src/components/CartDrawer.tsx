import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { X, Trash2, Heart, Minus, Plus } from 'lucide-react';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, totalAmount, removeItem, updateAmount, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-50"
          />
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-bold text-lg text-oceanic">سلة التبرع</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-oceanic/5 transition-colors"
              >
                <X className="w-5 h-5 text-oceanic" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-oceanic/5 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-oceanic/30" />
                  </div>
                  <p className="text-charcoal/60 font-medium">سلة التبرع فارغة</p>
                  <p className="text-taupe text-sm mt-1">أضف مشاريع للتبرع</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map(item => (
                    <motion.div
                      key={item.projectId}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="bg-white border border-border rounded-xl p-3 shadow-xs"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={item.image}
                          alt={item.projectTitle}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-oceanic truncate">
                            {item.projectTitle}
                          </h4>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateAmount(item.projectId, Math.max(10, item.amount - 10))}
                              className="w-7 h-7 rounded-md bg-oceanic/5 flex items-center justify-center hover:bg-oceanic/10"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold text-oceanic min-w-[60px] text-center">
                              {item.amount.toLocaleString()} ر.ق
                            </span>
                            <button
                              onClick={() => updateAmount(item.projectId, item.amount + 10)}
                              className="w-7 h-7 rounded-md bg-oceanic/5 flex items-center justify-center hover:bg-oceanic/10"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.projectId)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-4 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-charcoal/70">المجموع</span>
                  <span className="text-xl font-bold text-oceanic">
                    {totalAmount.toLocaleString()} ر.ق
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full bg-coral hover:bg-coral-dark text-white font-semibold py-3 rounded-xl shadow-coral transition-all duration-200"
                >
                  إتمام التبرع
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-sm text-red-400 hover:text-red-500 py-2 transition-colors"
                >
                  إفراغ السلة
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
