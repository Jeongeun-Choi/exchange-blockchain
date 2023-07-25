import { create } from "zustand";

interface CoinDropdownStore {
  disabledCoinId: number;
  changeDisabledCoinId: (id: number) => void;
}
export const useCoinDropdownStore = create<CoinDropdownStore>((set) => ({
  disabledCoinId: 0,
  changeDisabledCoinId: (id) => set(() => ({ disabledCoinId: id })),
}));
