import NavigationBar from "@/components/admin/aside/NavigationBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-w-[1200px] w-full border-2 border-point rounded-lg">
      <NavigationBar />
      {children}
    </div>
  );
};

export default layout;
