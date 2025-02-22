"use client";
import React from "react";
import ChartTwo from "../Charts/ChartTwo";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";

const ECommerce: React.FC = () => {
  return (
    <>
      <DataStatsOne />
      <div className="mt-10">
        <TableOne />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />

        <MapOne />
        <div className="col-span-12 xl:col-span-8"> {/* <ChartThree /> */}</div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default ECommerce;
