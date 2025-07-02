// components/VerticalDualNav.tsx

import React from "react";

export interface NavItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export interface VerticalDualNavProps {
  leftNav: NavItem[];
  rightNavMap: Record<string, NavItem[]>;
  selectedLeftKey: string;
  selectedRightKey: string;
  onLeftNavChange: (key: string) => void;
  onRightNavChange: (key: string) => void;
}

export const VerticalDualNav: React.FC<VerticalDualNavProps> = ({
  leftNav,
  rightNavMap,
  selectedLeftKey,
  selectedRightKey,
  onLeftNavChange,
  onRightNavChange,
}) => (
  <div className="flex bg-gray-50 border rounded shadow w-fit">
    {/* 左侧导航 */}
    <div className="flex flex-col py-4 min-w-[150px] border-r">
      {leftNav.map((item) => (
        <button
          key={item.key}
          className={`flex items-center px-4 py-2 text-sm mb-1 rounded-l transition
            hover:bg-blue-50
            ${
              item.key === selectedLeftKey
                ? "font-bold text-blue-600 bg-white border-l-4 border-blue-600"
                : "text-gray-700 bg-gray-50"
            }
          `}
          onClick={() => onLeftNavChange(item.key)}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
    {/* 右侧导航 */}
    <div className="flex flex-col py-4 px-4 min-w-[150px]">
      {(rightNavMap[selectedLeftKey] || []).map((item) => (
        <button
          key={item.key}
          className={`text-left px-2 py-2 text-sm mb-1 rounded transition 
            hover:bg-blue-50
            ${
              item.key === selectedRightKey
                ? "font-bold text-blue-600 bg-white"
                : "text-gray-700"
            }
          `}
          onClick={() => onRightNavChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
);
