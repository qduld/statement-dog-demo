import { IStockInterface } from "@/store/useStockInfoStore";

// components/StockHeader.tsx
export default function StockHeader(stockInfo: IStockInterface) {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <span className="font-bold text-lg">
          {stockInfo.stock_name} ({stockInfo.stock_id})
        </span>
        <span className="ml-2 text-gray-500 text-sm">台灣 07/02 收盤價</span>
        <span className="ml-2 text-lg font-bold text-black">1,085 元</span>
        <span className="ml-1 text-gray-400 text-sm">0 (0%)</span>
      </div>
      <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">
        <span className="mr-1 text-l font-bold">+</span> 追蹤
      </button>
    </div>
  );
}
