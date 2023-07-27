import { create } from "zustand";
import { Coin } from "../types/coin";

interface WalletStore {
  walletList: Coin[];
  editWallet: (fromCoin: Coin, toCoin: Coin) => void;
}

const walletList = [
  { coinName: "BnB", id: 1, coinImg: "/icons/bnb-logo.svg", coinCount: 1000 },
  {
    coinName: "Solana",
    id: 2,
    coinImg: "/icons/solana-logo.svg",
    coinCount: 1000,
  },
  {
    coinName: "Ethereum",
    id: 3,
    coinImg: "/icons/eth-logo.svg",
    coinCount: 1000,
  },
];

export const useWalletStore = create<WalletStore>((set) => ({
  walletList,
  editWallet: (fromCoin, toCoin: Coin) =>
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
