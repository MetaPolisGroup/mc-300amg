import React from "react";

import Dex from "@/components/dex";

const DexPage: React.FC = () => {
  return (
    <section className="p-4 min-h-[70vh] md:min-h-[65vh] flex justify-center items-center">
      <Dex />
    </section>
  );
};

export default DexPage;
