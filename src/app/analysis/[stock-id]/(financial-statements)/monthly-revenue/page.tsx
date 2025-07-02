"use client";

// app/page.tsx

import Card from "@/components/Card";
import StockHeader from "@/components/StockHeader";
import ChartTabs from "@/components/ChartTabs";
import StockChart from "@/components/StockChart";
import DataTabs from "@/components/DataTabs";
import StockTable from "@/components/StockTable";
import { useState } from "react";
import { useStockInfoStore } from "@/store/useStockInfoStore";
import { useStockInfo } from "@/hooks/useStockInfoHook";
import type { IStockInterface } from "@/store/useStockInfoStore";

export default function Page() {
  const stockId = useStockInfoStore((state) => state.stockId);
  const stockInfo: IStockInterface = useStockInfoStore(
    (state) => state.stockInfo
  );
  useStockInfo(stockId);
  const [chartTab, setChartTab] = useState("monthly");
  const [dataTab, setDataTab] = useState("detail");

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      {/* 头部 卡片 */}
      <Card>
        <StockHeader {...stockInfo} />
      </Card>
      {/* 图表 卡片 */}
      <Card>
        <ChartTabs value={chartTab} onChange={setChartTab} />
        <StockChart />
      </Card>
      {/* 表格 卡片 */}
      <Card>
        <DataTabs value={dataTab} onChange={setDataTab} />
        {dataTab === "detail" ? (
          <StockTable />
        ) : (
          <div className="p-4">[指標解釋區塊]</div>
        )}
      </Card>
    </div>
  );
}
