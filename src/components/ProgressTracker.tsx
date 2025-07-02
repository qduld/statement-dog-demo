// components/ProgressBar.tsx
import React from "react";

export interface TaskStep {
  title: string;
  status: "done" | "doing" | "todo";
  subtitle?: string;
  linkText?: string;
  linkUrl?: string;
  desc?: string;
}

interface ProgressBarProps {
  title: string;
  percent: number; // 0-100
  steps: TaskStep[];
  width: number;
}

const statusIcon = {
  done: (
    <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
      <svg
        fill="none"
        stroke="gray"
        strokeWidth="3"
        viewBox="0 0 24 24"
        className="w-4 h-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  ),
  doing: (
    <span className="inline-block w-6 h-6 bg-blue-500 rounded-full"></span>
  ),
  todo: <span className="inline-block w-6 h-6 bg-gray-200 rounded-full"></span>,
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  title,
  percent,
  steps,
  width,
}) => {
  return (
    <div className="bg-white py-4" style={{ width: width }}>
      <div className="text-center mb-2">
        <span className="text-gray-500">{title} </span>
        <span className="font-bold text-lg">{percent}%</span>
      </div>
      <div className="mx-5">
        <div className="h-1 bg-gray-200 rounded relative mb-5">
          <div
            className="h-1 bg-blue-500 rounded transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex justify-between text-center">
          {steps.map((step) => (
            <div key={step.title} className="flex-1">
              <div className="flex flex-col items-center">
                {statusIcon[step.status]}
                {step.linkText && step.linkUrl ? (
                  <a
                    href={step.linkUrl}
                    className={`mt-1 text-blue-600 font-medium hover:underline ${
                      step.status === "todo" ? "text-blue-500" : ""
                    }`}
                  >
                    {step.linkText}
                  </a>
                ) : (
                  <div
                    className={`mt-1 ${
                      step.status === "doing"
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {step.title}
                  </div>
                )}
                {step.subtitle && (
                  <div className="text-sm text-gray-400 mt-1">
                    {step.subtitle}
                  </div>
                )}
                {step.desc && (
                  <div className="text-xs text-gray-700 mt-0.5">
                    {step.desc}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
