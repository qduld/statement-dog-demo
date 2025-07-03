"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { IStockMonthRevenueResponse } from "@/types/revenue";

export default function StockChart({
  value,
}: {
  value: IStockMonthRevenueResponse[];
}) {
  // 单位：亿元
  const chartData = value.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let showData = [] as IStockMonthRevenueResponse[];
  if (chartData.length) {
    showData = removeEarliestYearData(chartData);
  }
  const months = showData.map((d) => d.date.slice(0, 7));
  const revenue = showData.map((d) => d.revenue);
  const close = calculateGrowthRates(chartData);

  function removeEarliestYearData(
    data: IStockMonthRevenueResponse[]
  ): IStockMonthRevenueResponse[] {
    // 按年份和月份排序数据（从小到大）
    const sortedData = [...data].sort(
      (a, b) =>
        a.revenue_year - b.revenue_year || a.revenue_month - b.revenue_month
    );

    // 找到最早的年份和月份
    const earliestYear = sortedData[0].revenue_year;
    const earliestMonth = sortedData[0].revenue_month;

    // 计算目标时间范围：最早日期到一年后
    const targetStartYear = earliestYear;
    const targetStartMonth = earliestMonth;
    const targetEndYear = earliestYear + 1;
    const targetEndMonth = earliestMonth;

    // 过滤掉目标时间范围内的数据
    const filteredData = data.filter((item) => {
      if (
        item.revenue_year === targetStartYear &&
        item.revenue_month >= targetStartMonth
      ) {
        return false; // 属于目标时间范围，过滤掉
      }
      if (
        item.revenue_year === targetEndYear &&
        item.revenue_month <= targetEndMonth
      ) {
        return false; // 属于目标时间范围，过滤掉
      }
      return true; // 不属于目标时间范围，保留
    });

    return filteredData;
  }

  function calculateGrowthRates(data: IStockMonthRevenueResponse[]): number[] {
    // 按年份和月份排序数据
    data.sort(
      (a, b) =>
        a.revenue_year - b.revenue_year || a.revenue_month - b.revenue_month
    );

    // 创建一个映射表，方便通过年份和月份快速查找数据
    const revenueMap: Map<string, number> = new Map();
    data.forEach((item) => {
      const key = `${item.revenue_year}-${item.revenue_month}`;
      revenueMap.set(key, item.revenue);
    });

    // 计算同比增长率
    const growthRates: number[] = [];
    data.forEach((item) => {
      const previousYear = item.revenue_year - 1;
      const key = `${previousYear}-${item.revenue_month}`;

      if (revenueMap.has(key)) {
        const previousRevenue = revenueMap.get(key)!;
        const growthRate = item.revenue / previousRevenue - 1;
        growthRates.push(growthRate * 100);
      }
    });

    return growthRates;
  }

  const maxRevenue = Math.max(...revenue);

  // 这里你可以用自动间隔，也可以写死
  const interval = getRecommendedInterval(maxRevenue);
  // const interval = 500; // 或你喜欢的值
  const yMax = getYAxisMax(maxRevenue, interval);

  function getYAxisMax(maxValue: number, interval: number) {
    return Math.ceil(maxValue / interval) * interval;
  }
  function getRecommendedInterval(maxValue: number) {
    if (maxValue > 3000) return 500;
    if (maxValue > 2000) return 400;
    if (maxValue > 1000) return 200;
    return 100;
  }

  const option = {
    grid: { left: 60, right: 70, top: 46, bottom: 70 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#fff",
      borderColor: "#ddd",
      textStyle: { color: "#333", fontWeight: "bold" },
      formatter(params: Array<{ axisValue: string; data: number }>) {
        const [bar, line] = params;
        return `${bar.axisValue}<br/>
        <span style="color:#FFD600;">■</span> 每月營收: ${bar.data} (億元)<br/>
        <span style="color:#B22222;">●</span> 月均價: ${line.data} 元`;
      },
    },
    legend: {
      data: [
        { name: "每月營收", icon: "rect" },
        { name: "月均價", icon: "circle" },
      ],
      bottom: 10,
      left: "center",
      itemWidth: 14,
      itemHeight: 8,
      textStyle: { fontSize: 13 },
    },
    xAxis: [
      {
        type: "category",
        data: months,
        axisTick: { alignWithLabel: true },
        splitLine: { lineStyle: { type: "solid", color: "#DFDFDF" } },
        axisLabel: { fontSize: 13, color: "#333", margin: 16 },
        axisLine: { lineStyle: { color: "#888" } },
      },
    ],
    yAxis: [
      {
        type: "value",
        min: 0,
        max: yMax,
        interval: interval,
        position: "left",
        splitLine: { lineStyle: { type: "solid", color: "#DFDFDF" } },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          show: true,
          fontSize: 13,
          color: "#888",
          formatter: (v: number) => (v === 0 ? "0" : `${v}億`),
        },
      },
      {
        type: "value",
        name: "股價",
        min: Math.min(...close),
        max: Math.max(...close),
        position: "right",
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          fontSize: 13,
          color: "#888",
          formatter: (v: number) => `${v}`,
          margin: 14,
          show: true,
        },
      },
    ],
    series: [
      {
        name: "每月營收",
        type: "bar",
        data: revenue,
        yAxisIndex: 0,
        barWidth: 8,
        z: 1,
        itemStyle: {
          color: "#FFD600",
          borderRadius: [6, 6, 0, 0],
          borderColor: "#FFEF8E",
          borderWidth: 1,
        },
        label: {
          show: false,
          position: "top",
          formatter: ({ value }: { value: number }) =>
            value ? value.toFixed(2) : "",
          color: "#444",
          fontWeight: 700,
          backgroundColor: "#ECECEC",
          borderRadius: 4,
          fontSize: 12,
        },
      },
      {
        name: "月均價",
        type: "line",
        data: close,
        yAxisIndex: 1,
        symbol: "circle",
        showSymbol: false,
        symbolSize: 9,
        lineStyle: { color: "#B22222", width: 3 },
        itemStyle: { color: "#B22222", borderWidth: 2, borderColor: "#fff" },
        smooth: false,
        z: 3,
        label: { show: false },
      },
    ],
  };

  return (
    <div className="h-[450px] w-full">
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
