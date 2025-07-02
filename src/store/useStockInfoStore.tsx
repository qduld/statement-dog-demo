import { create } from "zustand";

export interface IStockInterface {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
}

interface IStockStoreState {
  stockInfo: IStockInterface;
  stockId: string;
  setStockInfo: (user: IStockInterface) => void;
}

export const useStockInfoStore = create<IStockStoreState>()((set) => ({
  stockInfo: {} as IStockInterface,
  stockId: "2330",
  setStockInfo: (stockInfo: IStockInterface) => {
    if (stockInfo) {
      set({ stockInfo });
      return;
    }
    set({ stockInfo: {} as IStockInterface });
  },
}));
