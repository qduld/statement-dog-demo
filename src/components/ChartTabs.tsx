// components/ChartTabs.tsx

import { getDateRange } from "@/utils/utils";
export default function ChartTabs({
  value,
  onRevenueTypeChange,
  onDateChange,
}: {
  value: string;
  onRevenueTypeChange: (tab: string) => void;
  onDateChange: (date: [string, string]) => void;
}) {
  return (
    <div className="flex items-center p-4 gap-2">
      <button
        className={`px-4 py-2 rounded font-semibold ${
          value === "monthly"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        onClick={() => onRevenueTypeChange("monthly")}
      >
        每月營收
      </button>
      <button
        className={`px-4 py-2 rounded font-semibold ${
          value === "eps"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        onClick={() => onRevenueTypeChange("eps")}
      >
        月每股營收
      </button>
      <div className="flex-1" />
      <select
        className="ml-2 bg-white border px-2 py-1 rounded text-sm"
        onChange={(e) => onDateChange(getDateRange(Number(e.target.value)))}
      >
        {/* 为了取月均值要多取一年数据 单月营收年增率 = （单月营收/去年单月营收-1）*100% */}
        <option value={4}>近 3 年</option>
        <option value={6}>近 5 年</option>
        <option value={9}>近 8 年</option>
        <option>自訂</option>
      </select>
    </div>
  );
}
