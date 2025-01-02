import DefaultLayout from "@/components/Layouts/DefaultLaout";

import React from "react";
import ProjectForm from "./form";
import { Metadata } from "next";
// Project Metadata
export const metadata: Metadata = {
  title: "Create Project",
  description: "Building Analysis Project List",
};
const CreateProjects = () => {
  return (
    <DefaultLayout>
      <ProjectForm />
    </DefaultLayout>
  );
};

export default CreateProjects;
