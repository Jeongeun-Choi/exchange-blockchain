import { create } from "zustand";
import { Coin } from "../types/coin";

interface ExchangedHistory {
  time: Date;
  to: Coin;
  from: Coin;
}

interface ExchangedHistoryStore {
  exchangedHistoryList: ExchangedHistory[];
  lastExchangedHistory: ExchangedHistory | null;
  setLastExchangedHistory: (newHistory: ExchangedHistory) => void;
  addExchangedHistory: (newHistory: ExchangedHistory) => void;
  sortExchangedHistory: () => void;
}
export const useExchangedHistory = create<ExchangedHistoryStore>((set) => ({
  exchangedHistoryList: [],
  lastExchangedHistory: null,
  setLastExchangedHistory: (newHistory) =>
    set(() => ({ lastExchangedHistory: newHistory })),
  addExchangedHistory: (newHistory) =>
    set((state) => ({
      exchangedHistoryList: [newHistory].concat(state.exchangedHistoryList),
    })),
  sortExchangedHistory: () =>
    set((state) => ({
      exchangedHistoryList: [...state.exchangedHistoryList].reverse(),
    })),
}));
