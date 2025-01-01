"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { backendendpoint } from "@/hooks/endpoint";
interface FormData {
  _id: string;
  buildingName: string;
  buildingAddress: string;
  yearBuilt: string;
  yearRenovated: string;
  grossSquareFootage: string;
  floorPlate: string;
  unitSize: string;
  unitFloors: string;
  grossRent: string;
  assumedVacancy: string;
  operatingExpense: string;
  entryCapRate: string;
  exitCapRate: string;
  unitPerFloor: string;
  totalNumberOfUnits: string;
}

const HelpCenterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    _id: "67757f4ab8258e4d2aeec74d",
    buildingName: "",
    buildingAddress: "",
    yearBuilt: "",
    yearRenovated: "",
    grossSquareFootage: "",
    floorPlate: "",
    unitSize: "",
    unitFloors: "",
    grossRent: "",
    assumedVacancy: "",
    operatingExpense: "",
    entryCapRate: "",
    exitCapRate: "",
    unitPerFloor: "",
    totalNumberOfUnits: "",
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backendendpoint}/gethelpcenter/67757f4ab8258e4d2aeec74d`, // Use actual ID here
        );
        const data = await response.json();

        if (response.ok) {
          setFormData(data); // Populate form with fetched data
        } else {
          alert("Error fetching data");
        }
      } catch (error) {
        alert("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Fetch only once on component mount

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that all required fields are filled
    if (
      !formData.buildingName ||
      !formData.buildingAddress ||
      !formData.yearBuilt ||
      !formData.grossSquareFootage ||
      !formData.floorPlate ||
      !formData.unitSize ||
      !formData.unitFloors ||
      !formData.grossRent ||
      !formData.assumedVacancy ||
      !formData.operatingExpense ||
      !formData.entryCapRate ||
      !formData.exitCapRate
    ) {
      alert("All fields are required.");
      return;
    }

    // Exclude _id from formData before sending to server
    const { _id, ...dataToUpdate } = formData;

    try {
      const response = await fetch(
        `${backendendpoint}/helpcenter/67757f4ab8258e4d2aeec74d`,
        {
          method: "PUT", // Change to PUT for update
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToUpdate), // Send updated data without _id
        },
      );

      const result = await response.json();

      if (response.ok) {
        alert("Helpcenter entry updated successfully!");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert("An error occurred while submitting the form.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form
      className="grid grid-cols-3 gap-9 sm:grid-cols-3"
      onSubmit={handleSubmit}
    >
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Help Center 1
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          {/* Building Name */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Building Name
            </label>
            <input
              type="text"
              name="buildingName"
              value={formData.buildingName}
              onChange={handleInputChange}
              placeholder="Building Name"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Building Address */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Building Address
            </label>
            <input
              type="text"
              name="buildingAddress"
              value={formData.buildingAddress}
              onChange={handleInputChange}
              placeholder="Building Address"
              className="w-full rounded-[7px] border-[1.5px] border-primary bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:bg-dark-2 dark:text-white"
            />
          </div>

          {/* Year Built */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Year Built
            </label>
            <input
              type="text"
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={handleInputChange}
              placeholder="Year Built"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Year Renovated */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Year Renovated
            </label>
            <input
              type="text"
              name="yearRenovated"
              value={formData.yearRenovated}
              onChange={handleInputChange}
              placeholder="Year Renovated"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Help Center 2
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          {/* Gross Square Footage */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Gross Square Footage
            </label>
            <input
              type="text"
              name="grossSquareFootage"
              value={formData.grossSquareFootage}
              onChange={handleInputChange}
              placeholder="Gross Square Footage"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Floor Plate */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Floor Plate
            </label>
            <input
              type="text"
              name="floorPlate"
              value={formData.floorPlate}
              onChange={handleInputChange}
              placeholder="Floor Plate"
              className="w-full rounded-[7px] border-[1.5px] border-primary bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:bg-dark-2 dark:text-white"
            />
          </div>

          {/* Unit Size */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Unit Size
            </label>
            <input
              type="text"
              name="unitSize"
              value={formData.unitSize}
              onChange={handleInputChange}
              placeholder="Unit Size"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Unit Floors */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Unit Floors
            </label>
            <input
              type="text"
              name="unitFloors"
              value={formData.unitFloors}
              onChange={handleInputChange}
              placeholder="Unit Floors"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Help Center 3
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          {/* Gross Rent */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Gross Rent
            </label>
            <input
              type="text"
              name="grossRent"
              value={formData.grossRent}
              onChange={handleInputChange}
              placeholder="Gross Rent"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Assumed Vacancy */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Assumed Vacancy
            </label>
            <input
              type="text"
              name="assumedVacancy"
              value={formData.assumedVacancy}
              onChange={handleInputChange}
              placeholder="Assumed Vacancy"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Operating Expense */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Operating Expense
            </label>
            <input
              type="text"
              name="operatingExpense"
              value={formData.operatingExpense}
              onChange={handleInputChange}
              placeholder="Operating Expense"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Entry Cap Rate */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Entry Cap Rate
            </label>
            <input
              type="text"
              name="entryCapRate"
              value={formData.entryCapRate}
              onChange={handleInputChange}
              placeholder="Entry Cap Rate"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Help Center 4
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          {/* Exit Cap Rate */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Exit Cap Rate
            </label>
            <input
              type="text"
              name="exitCapRate"
              value={formData.exitCapRate}
              onChange={handleInputChange}
              placeholder="Exit Cap Rate"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Unit per Floor */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Unit per Floor
            </label>
            <input
              type="text"
              name="unitPerFloor"
              value={formData.unitPerFloor}
              onChange={handleInputChange}
              placeholder="Unit per Floor"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Total Number of Units */}
          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Total Number of Units
            </label>
            <input
              type="text"
              name="totalNumberOfUnits"
              value={formData.totalNumberOfUnits}
              onChange={handleInputChange}
              placeholder="Total Number of Units"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mt-4 flex w-full justify-end">
            <button
              type="submit"
              className="rounded-md bg-primary px-7 py-3 font-medium text-white"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HelpCenterForm;
