// components/ChartTabs.tsx
export default function ChartTabs({
  value,
  onChange,
}: {
  value: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="flex items-center p-4 border-b gap-2">
      <button
        className={`px-4 py-2 rounded font-semibold ${
          value === "monthly"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        onClick={() => onChange("monthly")}
      >
        每月營收
      </button>
      <button
        className={`px-4 py-2 rounded font-semibold ${
          value === "eps"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        onClick={() => onChange("eps")}
      >
        月每股營收
      </button>
      <div className="flex-1" />
      <select className="ml-2 bg-white border px-2 py-1 rounded text-sm">
        <option>近 5 年</option>
        <option>近 1 年</option>
        <option>全部</option>
      </select>
    </div>
  );
}
