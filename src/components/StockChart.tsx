"use client";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 示例数据，可扩展成props
const monthlyData = [
  { month: "2025/01", revenue: 293288038, yoy: 35.92 },
  { month: "2025/02", revenue: 260008796, yoy: 43.14 },
  { month: "2025/03", revenue: 285956830, yoy: 46.49 },
  { month: "2025/04", revenue: 349566940, yoy: 48.11 },
  { month: "2025/05", revenue: 320515951, yoy: 39.59 },
];

export default function StockChart({ tab = "monthly" }: { tab?: string }) {
  // 你可以扩展不同tab的数据和折线内容
  const data = tab === "monthly" ? monthlyData : [];
  return (
    <div className="h-[340px] w-full px-3 py-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ left: 10, right: 10, top: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            yAxisId="left"
            tickFormatter={(v: number) => `${Math.round(v / 1e6)}M`}
            domain={["auto", "auto"]}
            axisLine={false}
            tickLine={false}
            width={68}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={["auto", "auto"]}
            tickFormatter={(v: number) => `${v}%`}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === "revenue")
                return [`${Number(value).toLocaleString()} 元`, "營收"];
              if (name === "yoy") return [`${value}%`, "年增率"];
              return [value, name];
            }}
            labelFormatter={(label: string) => `${label}`}
          />
          <Legend />
          {/* 主Y轴（左）：每月營收 */}
          <Line
            type="monotone"
            dataKey="revenue"
            yAxisId="left"
            name="每月營收"
            stroke="#1976d2"
            dot={{ r: 3 }}
            strokeWidth={2}
            activeDot={{ r: 5 }}
          />
          {/* 副Y轴（右）：年增率 */}
          <Line
            type="monotone"
            dataKey="yoy"
            yAxisId="right"
            name="年增率(%)"
            stroke="#f59e42"
            dot={{ r: 3 }}
            strokeWidth={2}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
