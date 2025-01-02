"use client";
import React, { useEffect, useState } from "react";
import { backendendpoint } from "@/hooks/endpoint";
import ChartOne from "@/components/Charts/ChartOne";
import TotalSF from "@/components/DataStats/TotalSF";

type ProformaTableProps = {
  projectid: string;
};
const ProformaTable: React.FC<ProformaTableProps> = ({ projectid }) => {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `${backendendpoint}/getprojects/${projectid}`,
        );
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (projectid) {
      fetchProject();
    }
  }, [projectid]);

  if (loading) {
    return <p>Loading project details...</p>;
  }

  if (!project) {
    return <p>No project data found.</p>;
  }
  const totalvalueSF =
    parseFloat(project.unitSize) * parseFloat(project.totalUnits);

  const formattedValuetotalvalueSF = totalvalueSF.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const grosrentmontant = parseFloat(project.grossRent) * totalvalueSF;

  const grosrentanualant = grosrentmontant * 12;
  const grossunitperyear = grosrentanualant / parseFloat(project.totalUnits);

  const assumed_vaacancymontant =
    grosrentmontant * (project.assumedVacancy / 100);
  const assumed_vaacancyanualant = assumed_vaacancymontant * 12;
  const assumed_vaacancyperyear =
    assumed_vaacancyanualant / parseFloat(project.totalUnits);

  //
  const net_effective_rent =
    parseFloat(project.grossRent) *
    (1 - parseFloat(project.assumedVacancy) / 100);
  const net_effective_rentmontant = grosrentmontant + assumed_vaacancymontant;

  const operatingExpenses =
    assumed_vaacancymontant * (parseFloat(project.operatingExpense) / 100);
  const operatingExpensesAnualAnt = operatingExpenses * 12;
  const operatingExpensesPeryear =
    operatingExpenses / parseFloat(project.totalUnits);

  //
  const net_perating_income =
    net_effective_rent * (1 - parseFloat(project.operatingExpense) / 100);
  const net_perating_income_mntant =
    net_effective_rentmontant + operatingExpenses;
  const net_perating_income_anualant = net_effective_rentmontant * 12;
  const net_perating_income_peryear =
    net_perating_income_anualant / parseFloat(project.totalUnits);
  //

  return (
    <div>
      <div className="mb-8">
        <TotalSF value={formattedValuetotalvalueSF} />
      </div>
      <div className="grid grid-cols-2 gap-9 sm:grid-cols-2">
        <div className=" col-span-2 rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card ">
          <div className="px-4 py-6 md:px-6 xl:px-9">
            <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
              Stabilized Proforma Summary
            </h4>
          </div>

          <div className="">
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Label</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Monthly Per SF</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium">Monthly Amt</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium">Annual Amt</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium">Per Unit Per Year</p>
              </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-2 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Gross Rent
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $ {project.grossRent}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {grosrentmontant.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {grosrentanualant.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {grossunitperyear.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-2 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Assumed Vacancy/Rent Loss
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {project.assumedVacancy} %
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {assumed_vaacancymontant.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {assumed_vaacancyanualant.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {assumed_vaacancyperyear.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-2 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Net Effective Rent
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {net_effective_rent.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {net_effective_rentmontant.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {assumed_vaacancyanualant.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {assumed_vaacancyperyear.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-2 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Operating Expense
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {project.operatingExpense} %
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {operatingExpenses.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {operatingExpensesAnualAnt.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {operatingExpensesPeryear.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-2 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Operating Expense
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {net_perating_income.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {net_perating_income_mntant.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {operatingExpensesAnualAnt.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  {net_perating_income_peryear.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-1 rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card ">
          <div className="px-4 py-6 md:px-6 xl:px-9">
            <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
              Development Budget
            </h4>
          </div>

          <div className="">
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-4 flex items-center">
                <p className="font-medium">Label</p>
              </div>
              <div className="col-span-4 hidden items-center sm:flex">
                <p className="font-medium">Value</p>
              </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-4 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Land/Building Purchase
                  </p>
                </div>
              </div>
              <div className="col-span-4 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $15,216,500
                </p>
              </div>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-4 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Hard Costs
                  </p>
                </div>
              </div>
              <div className="col-span-4 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $126,967,500
                </p>
              </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-4 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Soft Costs
                  </p>
                </div>
              </div>
              <div className="col-span-4 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $19,045,125
                </p>
              </div>
            </div>
            <form action="">
              <div className="p-5">
                <div className="flex  gap-2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Land/Building Purchase (Assumption)
                  </label>
                </div>
                <input
                  type="text"
                  id="buildingName"
                  name="buildingName"
                  readOnly
                  value="25%"
                  placeholder="One City Center"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="p-5">
                <div className="flex  gap-2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Hard Costs (Assumption)
                  </label>
                </div>
                <input
                  type="text"
                  id="buildingName"
                  name="buildingName"
                  readOnly
                  value="$275.00 "
                  placeholder="One City Center"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="p-5">
                <div className="flex  gap-2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Spft Costs (Assumption)
                  </label>
                </div>
                <input
                  type="text"
                  id="buildingName"
                  name="buildingName"
                  readOnly
                  value="15%"
                  placeholder="One City Center"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
            </form>
          </div>
        </div>
        <div className=" col-span-1 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-medium text-dark dark:text-white">
              Building Assumption
            </h3>
          </div>

          <div className="flex  gap-5.5 p-6.5">
            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Gross SF
                </label>
                <span className=" cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                id="buildingName"
                name="buildingName"
                readOnly
                value={project.grossSquareFootage}
                placeholder="One City Center"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Floor Plate
                </label>
                <span className=" cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                id="buildingName"
                name="buildingName"
                readOnly
                value={project.floorPlate}
                placeholder="One City Center"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Efficiency
                </label>
                <span className=" cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                id="buildingName"
                name="buildingName"
                readOnly
                value={project.efficiency}
                placeholder="One City Center"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="p-3">
            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Net Floor Plate
                </label>
                <span className=" cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                id="buildingName"
                name="buildingName"
                readOnly
                value={project.netFloorPlate}
                placeholder="One City Center"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mt-4">
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Avg Unit Size
                </label>
                <span className=" cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                id="buildingName"
                name="buildingName"
                readOnly
                value={project.unitSize}
                placeholder="One City Center"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mt-4">
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Units Per Floor
                </label>
                <span className=" cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                id="buildingName"
                name="buildingName"
                readOnly
                value={project.unitsPerFloor}
                placeholder="One City Center"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="flex  gap-5.5 p-6.5">
            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Gross Floors
                </label>
                <span className=" cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                id="buildingName"
                name="buildingName"
                readOnly
                value={project.floors}
                placeholder="One City Center"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Unit Floor
                </label>
                <span className=" cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                id="buildingName"
                name="buildingName"
                readOnly
                value={project.unitFloors}
                placeholder="One City Center"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Total Units
                </label>
                <span className=" cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                id="buildingName"
                name="buildingName"
                readOnly
                value={project.totalUnits}
                placeholder="One City Center"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>
        <div className=" col-span-1 rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card ">
          <div className="px-4 py-6 md:px-6 xl:px-9">
            <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
              Development Budget
            </h4>
          </div>

          <div className="">
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-3 flex items-center">
                <p className="font-medium">Label</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Per Gross SF</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Per Rentable SF</p>
              </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-3 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Per Gross Building SF
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $25.00
                </p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $32.96
                </p>
              </div>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-3 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Per Rentable Building SF
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $208.60
                </p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $275.00
                </p>
              </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-3 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    % Hard Costs
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $31.29
                </p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $41.25
                </p>
              </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-3 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6"></p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $264.89
                </p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $349.21
                </p>
              </div>
            </div>
            {/* <form action="">
              <div className="p-5">
                <div className="flex  gap-2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Land/Building Purchase (Assumption)
                  </label>
                </div>
                <input
                  type="text"
                  id="buildingName"
                  name="buildingName"
                  readOnly
                  value="25%"
                  placeholder="One City Center"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="p-5">
                <div className="flex  gap-2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Hard Costs (Assumption)
                  </label>
                </div>
                <input
                  type="text"
                  id="buildingName"
                  name="buildingName"
                  readOnly
                  value="$275.00 "
                  placeholder="One City Center"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="p-5">
                <div className="flex  gap-2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Spft Costs (Assumption)
                  </label>
                </div>
                <input
                  type="text"
                  id="buildingName"
                  name="buildingName"
                  readOnly
                  value="15%"
                  placeholder="One City Center"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
            </form> */}
          </div>
        </div>
        <div className=" col-span-1 rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card ">
          <div className="px-4 py-6 md:px-6 xl:px-9">
            <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
              Capital Assumptions
            </h4>
          </div>

          <div className="">
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-4 flex items-center">
                <p className="font-medium">Label</p>
              </div>
              <div className="col-span-4 hidden items-center sm:flex">
                <p className="font-medium">Value</p>
              </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-4 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Hard Costs Debt
                  </p>
                </div>
              </div>
              <div className="col-span-4 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $69,832,125
                </p>
              </div>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-4 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Hard Costs Equity
                  </p>
                </div>
              </div>
              <div className="col-span-4 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green">
                  $57,135,375
                </p>
              </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-4 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Treasury Rate/Risk Free
                  </p>
                </div>
              </div>
              <div className="col-span-4 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green"></p>
              </div>
            </div>
            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-4 flex items-center">
                <div className="">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    Conservative Construction Rate
                  </p>
                </div>
              </div>
              <div className="col-span-4 hidden items-center sm:flex">
                <p className="text-body-sm font-medium text-dark dark:text-green"></p>
              </div>
            </div>
            <form action="">
              <div className="p-5">
                <div className="flex  gap-2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Hard Costs Debt (Assumption)
                  </label>
                </div>
                <input
                  type="text"
                  id="buildingName"
                  name="buildingName"
                  readOnly
                  value="55%"
                  placeholder="One City Center"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="p-5">
                <div className="flex  gap-2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Hard Costs Equity (Assumption)
                  </label>
                </div>
                <input
                  type="text"
                  id="buildingName"
                  name="buildingName"
                  readOnly
                  value="45%"
                  placeholder="One City Center"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="p-5">
                <div className="flex  gap-2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Treasury Rate/Risk Free (Assumption)
                  </label>
                </div>
                <input
                  type="text"
                  id="buildingName"
                  name="buildingName"
                  readOnly
                  value="6%"
                  placeholder="One City Center"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="p-5">
                <div className="flex  gap-2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Conservative Construction Rate (Assumption)
                  </label>
                </div>
                <input
                  type="text"
                  id="buildingName"
                  name="buildingName"
                  readOnly
                  value="10%"
                  placeholder="One City Center"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className=" p-8">
                <button
                  type="button"
                  onClick={() => {
                    alert("Data Updated");
                  }}
                  className="mt-4 w-full rounded bg-primary py-2 text-white"
                >
                  Add more unit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProformaTable;
