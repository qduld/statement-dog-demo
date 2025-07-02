// components/StockTable.tsx
export default function StockTable() {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-[700px] w-full border">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="py-2 px-3 border">年度/月</th>
            <th className="py-2 px-3 border">2025/01</th>
            <th className="py-2 px-3 border">2025/02</th>
            <th className="py-2 px-3 border">2025/03</th>
            <th className="py-2 px-3 border">2025/04</th>
            <th className="py-2 px-3 border">2025/05</th>
          </tr>
        </thead>
        <tbody className="text-right">
          <tr>
            <td className="py-2 px-3 border font-bold text-left">每月營收</td>
            <td className="py-2 px-3 border">293,288,038</td>
            <td className="py-2 px-3 border">260,008,796</td>
            <td className="py-2 px-3 border">285,956,830</td>
            <td className="py-2 px-3 border">349,566,940</td>
            <td className="py-2 px-3 border">320,515,951</td>
          </tr>
          <tr>
            <td className="py-2 px-3 border font-bold text-left text-blue-600">
              單月營收年增率 (%)
            </td>
            <td className="py-2 px-3 border">35.92</td>
            <td className="py-2 px-3 border">43.14</td>
            <td className="py-2 px-3 border">46.49</td>
            <td className="py-2 px-3 border">48.11</td>
            <td className="py-2 px-3 border">39.59</td>
          </tr>
        </tbody>
      </table>
      <div className="text-xs text-gray-400 mt-2">
        表格單位：千元，數據來自公開資訊觀測站
        <br />
        網頁頁表歡迎雙貼引用，請註明出處為財報狗
      </div>
    </div>
  );
}
