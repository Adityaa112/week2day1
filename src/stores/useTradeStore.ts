import { create } from 'zustand';
import type { Trade } from '../types/stock.types';
import { trades } from '../data/stockData';

type NewTradeInput = Omit<Trade, 'id' | 'date'>;

interface TradeStore {
  tradeHistory: Trade[];
  addTrade: (newTrade: NewTradeInput) => void;
}

export const useTradeStore = create<TradeStore>((set) => ({
  tradeHistory: trades,

  addTrade: (input) => {
    const newTrade: Trade = {
      ...input,
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
    };

    set((prev) => ({
      tradeHistory: [newTrade, ...prev.tradeHistory],
    }));
  },
}));