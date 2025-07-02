"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import "@/styles/nav.css";

type NavDropdownMenuProps = {
  title: React.ReactNode;
  isSelect?: boolean;
  showTopBar?: boolean;
  topBarText?: string;
  columns: string[][];
};

export const NavDropdownMenu = ({
  title,
  isSelect = true,
  showTopBar = false,
  topBarText = "",
  columns,
}: NavDropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative h-full" ref={menuRef} onClick={toggleMenu}>
      {/* 主按钮 */}
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative h-full px-4 py-2 text-gray-800 hover:text-blue-600 flex items-center gap-1 
          ${isOpen ? "text-blue-600" : ""}`}
      >
        {/* 支持 ReactNode 的 title */}
        <span className="flex items-center gap-1">{title}</span>

        {isSelect ? (
          isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )
        ) : (
          ""
        )}

        {/* 底部蓝色横线 */}
        {(isHovered || isOpen) && (
          <span
            className={`absolute bottom-0 left-0 w-full h-0.5  ${
              !isOpen ? "bg-blue-600" : "bg-white"
            }`}
          ></span>
        )}
      </button>

      {/* 下拉菜单内容 */}
      {isOpen && (
        <div className="absolute rectangle-with-triangle left-0 top-full bg-white border z-40 mt-1 min-w-[200px] shadow-[0_0_3px_rgba(0,0,0,0.1)] border-[#dfdfdf] rounded-[3px] px-0 py-[9px]">
          {/* 横向子导航 */}
          {showTopBar && (
            <div className="w-full leading-[36px] px-[15px] py-0 block rounded-[3px] hover:text-white hover:bg-blue-400 mb-2 box-border text-left text-[15px] font-bold">
              {topBarText}
            </div>
          )}

          {/* 多列纵向导航 */}
          <div
            className="grid gap-x-4 p-4 px-4 text-sm text-gray-700 border-t border-[#e9e9e9]"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
            }}
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="space-y-2">
                {col.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href="#"
                    className="block hover:text-blue-600"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
