// components/UnifiedNav.tsx
import React from "react";
import clsx from "clsx";

export interface NavItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export interface UnifiedNavProps {
  items: NavItem[];
  selectedKey: string;
  onSelect: (key: string) => void;
  iconMode?: boolean; // true: icon+label, false: label only
  className?: string;
}

const UnifiedNav: React.FC<UnifiedNavProps> = ({
  items,
  selectedKey,
  onSelect,
  iconMode = false,
  className = "",
}) => (
  <div className={clsx("flex flex-col py-2", className)}>
    {items.map((item) => (
      <button
        key={item.key}
        className={clsx(
          "flex items-center w-full px-4 py-2 rounded-l transition mb-1 text-left",
          iconMode ? "space-x-2" : "",
          item.key === selectedKey
            ? "font-bold text-blue-600 bg-white border-l-4 border-blue-600"
            : "text-gray-700 hover:bg-blue-50"
        )}
        onClick={() => onSelect(item.key)}
      >
        {iconMode && item.icon && (
          <span className="w-5 h-5 flex mr-2 text-lg">{item.icon}</span>
        )}
        <span>{item.label}</span>
      </button>
    ))}
  </div>
);

export default UnifiedNav;
