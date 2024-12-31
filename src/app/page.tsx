import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import SigninForm from "./signin/SigninForm";

export const metadata: Metadata = {
  title: "Prometheus",
  description: "This is Building Analysis Platform",
};

export default function Home() {
  return (
    <>
      {/* <DefaultLayout></DefaultLayout> */}
      <SigninForm />
    </>
  );
}
