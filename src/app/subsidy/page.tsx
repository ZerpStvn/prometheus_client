import SubsidyTable from "@/components/DataStats/Subsidy";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import SubsityTableForm from "./subsidy";

const Subsidy = () => {
  return (
    <DefaultLayout>
      <div>
        <SubsidyTable value="123" />
      </div>
      <div className="mt-8">
        <SubsityTableForm />
      </div>
    </DefaultLayout>
  );
};

export default Subsidy;
