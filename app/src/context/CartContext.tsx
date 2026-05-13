import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  totalAmount: number;
  itemCount: number;
  addItem: (item: Omit<CartItem, 'amount'> & { amount: number }) => void;
  removeItem: (projectId: string) => void;
  updateAmount: (projectId: string, amount: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const itemCount = items.length;

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.projectId === item.projectId);
      if (existing) {
        return prev.map(i =>
          i.projectId === item.projectId ? { ...i, amount: i.amount + item.amount } : i
        );
      }
      return [...prev, item];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((projectId: string) => {
    setItems(prev => prev.filter(i => i.projectId !== projectId));
  }, []);

  const updateAmount = useCallback((projectId: string, amount: number) => {
    setItems(prev =>
      prev.map(i => (i.projectId === projectId ? { ...i, amount } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{ items, totalAmount, itemCount, addItem, removeItem, updateAmount, clearCart, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
