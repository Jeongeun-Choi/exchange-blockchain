import { create } from "zustand";
import { Coin } from "../types/wallet";

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
}));
