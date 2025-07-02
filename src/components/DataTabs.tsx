// components/DataTabs.tsx
export default function DataTabs({
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
          value === "detail"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        onClick={() => onChange("detail")}
      >
        詳細數據
      </button>
      <button
        className={`px-4 py-2 rounded font-semibold ${
          value === "analysis"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        onClick={() => onChange("analysis")}
      >
        指標解釋
      </button>
    </div>
  );
}
