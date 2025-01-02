import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";
import React from "react";
import HelpCenterForm from "./helpcenterform";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Building Analysis Project List",
};
const HelpCenter = () => {
  return (
    <DefaultLayout>
      <HelpCenterForm />
    </DefaultLayout>
  );
};

export default HelpCenter;
