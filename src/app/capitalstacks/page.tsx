import CapitalStacks from "@/components/Charts/CapitalStacks";
import CapitalStacks2 from "@/components/Charts/CapitalStacks2";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { DefaultDeserializer } from "node:v8";
import React from "react";

const CapitalStack = () => {
  return (
    <DefaultLayout>
      <div className="grid-flow-col-2 grid gap-2">
        <CapitalStacks />
        <CapitalStacks2 />
      </div>
    </DefaultLayout>
  );
};

export default CapitalStack;
