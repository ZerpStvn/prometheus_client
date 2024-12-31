import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TableOne from "@/components/Tables/TableOne";
import { Metadata } from "next";
import React from "react";

// Project Metadata
export const metadata: Metadata = {
  title: "Pojects List",
  description: "Building Analysis Project List",
};
const Projectslist = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Projects" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default Projectslist;
