"use client";

import UnifiedNav from "@/components/UnifiedNav"; // 用你前面写的统一组件
import { useState } from "react";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DescriptionIcon from "@mui/icons-material/Description";
import PaidIcon from "@mui/icons-material/Paid";
import ShieldIcon from "@mui/icons-material/Shield";
import BarChartIcon from "@mui/icons-material/BarChart";
import ScaleIcon from "@mui/icons-material/Scale";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupWorkIcon from "@mui/icons-material/GroupWork";

const leftItems = [
  {
    key: "news",
    label: "最新動態",
    icon: (
      <NotificationsActiveIcon fontSize="small" sx={{ color: "#5B5B5B" }} />
    ),
  },
  {
    key: "diagnose",
    label: "股票健診",
    icon: <AssignmentIcon fontSize="small" sx={{ color: "#616161" }} />,
  },
  {
    key: "report",
    label: "財務報表",
    icon: <DescriptionIcon fontSize="small" sx={{ color: "#1976d2" }} />,
  },
  {
    key: "profit",
    label: "獲利能力",
    icon: <PaidIcon fontSize="small" sx={{ color: "#D32F2F" }} />,
  },
  {
    key: "safety",
    label: "安全性分析",
    icon: <ShieldIcon fontSize="small" sx={{ color: "#388e3c" }} />,
  },
  {
    key: "growth",
    label: "成長力分析",
    icon: <BarChartIcon fontSize="small" sx={{ color: "#F57C00" }} />,
  },
  {
    key: "value",
    label: "價值評估",
    icon: <ScaleIcon fontSize="small" sx={{ color: "#1976d2" }} />,
  },
  {
    key: "supervisor",
    label: "董監與籌碼",
    icon: <SupervisorAccountIcon fontSize="small" sx={{ color: "#6D4C41" }} />,
  },
  {
    key: "relation",
    label: "關鍵情標",
    icon: <FavoriteIcon fontSize="small" sx={{ color: "#EC407A" }} />,
  },
  {
    key: "portfolio",
    label: "產品組合",
    icon: <GroupWorkIcon fontSize="small" sx={{ color: "#1976d2" }} />,
  },
];

const rightItems = [
  { key: "monthRev", label: "每月營收" },
  { key: "eps", label: "每股盈餘" },
  { key: "bvps", label: "每股淨值" },
  { key: "incomeStmt", label: "損益表" },
  { key: "totalAsset", label: "總資產" },
  { key: "liabilities", label: "負債和股東權益" },
  { key: "cashflow", label: "現金流量表" },
  { key: "divPolicy", label: "股利政策" },
  { key: "electronicBook", label: "電子書" },
];

export default function DoubleNavDemo() {
  const [leftKey, setLeftKey] = useState(leftItems[2].key);
  const [rightKey, setRightKey] = useState(rightItems[0].key);

  return (
    <div className="flex bg-gray-50 w-fit mt-8 mx-auto">
      {/* 左侧 */}
      <UnifiedNav
        items={leftItems}
        selectedKey={leftKey}
        onSelect={setLeftKey}
        iconMode={true}
        className="min-w-[170px] border-r border-[#dfdfdf] py-5"
      />
      {/* 右侧 */}
      <UnifiedNav
        items={rightItems}
        selectedKey={rightKey}
        onSelect={setRightKey}
        iconMode={false}
        className="min-w-[160px] py-5"
      />
    </div>
  );
}
