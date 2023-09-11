import React from "react";
import DashboardLayoutHeader from "./DashboardLayoutHeader";

const DashboardLayout = () => {
  return (
    <div className="md:shrink-0 md:w-[400px] bg-[#333]">
      <DashboardLayoutHeader />
    </div>
  );
};

export default DashboardLayout;
