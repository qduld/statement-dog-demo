"use client";

// app/page.tsx

import Card from "@/components/Card";
import StockHeader from "@/components/StockHeader";
import ChartTabs from "@/components/ChartTabs";
import StockChart from "@/components/StockChart";
import DataTabs from "@/components/DataTabs";
import StockTable from "@/components/StockTable";
import { useEffect, useState } from "react";
import { useStockInfoStore } from "@/store/useStockInfoStore";
import { useStockInfoHook } from "@/hooks/useStockInfoHook";
import type { IStockInterface } from "@/store/useStockInfoStore";
import { httpRequest, HttpResponse } from "@/utils/http";
import type { IStockMonthRevenueResponse } from "@/types/revenue";
import { getDateRange } from "@/utils/utils";

export default function Page() {
  const stockId = useStockInfoStore((state) => state.stockId);
  const stockInfo: IStockInterface = useStockInfoStore(
    (state) => state.stockInfo
  );
  useStockInfoHook(stockId);
  const [chartTab, setChartTab] = useState("monthly");
  const [dateRange, setDateRange] = useState(getDateRange(4));
  const [dataTab, setDataTab] = useState("detail");
  const [chartData, setChartData] = useState<IStockMonthRevenueResponse[]>([]);

  useEffect(() => {
    httpRequest(
      "/api/v4/data",
      {
        method: "GET",
      },
      {
        dataset: "TaiwanStockMonthRevenue",
        data_id: stockId,
        start_date: dateRange[0],
        end_date: dateRange[1],
      }
    ).then((response: HttpResponse) => {
      const chartData = response.data.data as IStockMonthRevenueResponse[];
      if (chartData && chartData.length > 0) {
        setChartData(chartData);
      }
    });
  }, [stockId, dateRange]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      {/* 头部 卡片 */}
      <Card>
        <StockHeader {...stockInfo} />
      </Card>
      {/* 图表 卡片 */}
      <Card>
        <ChartTabs
          value={chartTab}
          onRevenueTypeChange={setChartTab}
          onDateChange={setDateRange}
        />
        <StockChart value={chartData} />
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
