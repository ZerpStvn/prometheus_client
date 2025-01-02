"use client";
import SubsidyChart from "@/components/Charts/Subsidy";
import React from "react";

const SubsityTableForm = () => {
  return (
    <div>
      {" "}
      <div className=" col-span-2 rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card ">
        <div className="px-4 py-6 md:px-6 xl:px-9">
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Subsidy
          </h4>
        </div>

        <div className="">
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <p className="font-medium">
                Equity Substitute (ES) Non Equity Substitute (NES)
              </p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Subsidy</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Amount</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Per Unit</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Per RSF</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Equity Substitute</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Non Equity Substitute</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Possible Equity % of Project Costs</p>
            </div>
          </div>
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <div className="">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  ES
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                Historic Tax Credit (Federal+State)
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $59,135,113
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $115,273.13
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $59,135,113.13
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $0.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                36.7%
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                0.0%
              </p>
            </div>
          </div>
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <div className="">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  ES
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                Business Improvement Loan Fund (BILF)- Atlanta
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $100,000
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $194.93
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $0.22
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $0.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                0.1%
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                0.0%
              </p>
            </div>
          </div>
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <div className="">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  ES
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                Community Loan Fund (CLF)- Atlanta
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $50,000
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $97.47
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $0.11
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $50,000.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                0.0%
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                0.0%
              </p>
            </div>
          </div>
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <div className="">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  ES
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                New Market Tax Credit
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $15,390,000
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $30,000.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $33.33
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $15,390,000.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                $0.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                9.5%
              </p>
            </div>
          </div>
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <div className="">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  NES
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                KEY (Local)
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $15,390,000
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $30,000.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $15,390,000.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $0.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                9.5%
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                0.0%
              </p>
            </div>
          </div>
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <div className="">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  NES
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                Cost Segregation Analysis
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $9,522,563
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $18,562.50
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $20.63
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $0.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $9,522,562.50
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                0.0%
              </p>
            </div>
          </div>
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <div className="">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  NES
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                2023 Inflation Reduction Act Calculation
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $5,608,300
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $10,932.36
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $12.15
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $0.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $5,608,300.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                0.0%
              </p>
            </div>
          </div>
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <div className="">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  NES
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                Interest Savings (221d4) Fed
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $5,027,913
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $9,801.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $10.89
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $0.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-green">
                $5,027,913.00
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                0.0%
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <SubsidyChart />
      </div>
    </div>
  );
};

export default SubsityTableForm;
