import React from "react";

interface ITooltipProps {
  children: React.ReactNode;
  tooltipTitle: string;
}

const Tooltip: React.FC<ITooltipProps> = ({ children, tooltipTitle }) => {
  return (
    <div className="relative w-full group">
      {children}
      <span className="invisible group-hover:visible absolute -top-12 z-40 left-4 bg-[--colors-contrast] p-2 rounded-2xl before:absolute before:-bottom-1 before:left-[50%] before:w-0 before:h-0 before:border-x-[5px] before:border-transparent before:border-t-[5px] before:border-t-[--colors-contrast]">
        {tooltipTitle}
      </span>
    </div>
  );
};

export default Tooltip;
