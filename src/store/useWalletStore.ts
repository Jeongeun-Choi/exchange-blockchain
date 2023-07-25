import { create } from "zustand";
import { Coin } from "../types/wallet";

interface WalletStore {
  walletList: Coin[];
  editWallet: (fromCoin: Coin, toCoin: Coin) => void;
}

const walletList = [
  { coinName: "BnB", id: 1, coinImg: "", coinCount: 1000 },
  { coinName: "Solana", id: 2, coinImg: "", coinCount: 1000 },
  { coinName: "Ethereum", id: 3, coinImg: "", coinCount: 1000 },
];

export const useWalletStore = create<WalletStore>((set) => ({
  walletList,
  editWallet: (fromCoin: Coin, toCoin: Coin) =>
    set((state) => {
      const newWalletList = state.walletList.map((wallet: Coin) => {
        if (wallet.id === fromCoin.id) {
          wallet.coinCount -= fromCoin.coinCount;
        }

        if (wallet.id === toCoin.id) {
          wallet.coinCount += toCoin.coinCount;
        }
        return wallet;
      });

      return {
        walletList: newWalletList,
      };
    }),
}));
