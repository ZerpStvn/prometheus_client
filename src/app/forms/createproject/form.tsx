"use client";
import SelectGroupTwo from "@/components/FormElements/SelectGroup/SelectGroupTwo";
import SelectStates from "@/components/FormElements/SelectGroup/selectStates";
import { backendendpoint } from "@/hooks/endpoint";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";

type FormDataType = {
  buildingName: string;
  buildingAddress: string;
  profilePhoto: File | null;
  country: string;
  yearbuilt: string;
  yearrenovated: string;
  city: string;
  state: string;
  grossSquareFootage: string;
  unitsize: string;
  floorplate: string;
  grossrent: string;
  assumevacancy: string;
  operatingexpense: string;
  entrycaprate: string;
  exitcaprate: string;
  efficiency: string;
  unitType: string;
  unitSize: string;
  numberofunits: string;
  unitfloors: string;
  netfloorplate: string;
  net_rentable_square_footage: string;
  unitfloorstotal: string;
  net_effective_rent: string;
  totalunits: string;
  net_operating_income: string;
  devlopment_yeild: string;
  newunitSize: string;
};
const ProjectForm = () => {
  const [units, setUnits] = useState<FormDataType[]>([]);
  const [infocenter, setInfocenter] = useState<any>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    buildingName: "",
    buildingAddress: "",
    profilePhoto: null,
    country: "United States",
    yearbuilt: "",
    yearrenovated: "",
    city: "",
    state: "",
    grossSquareFootage: "",
    unitsize: "",
    netfloorplate: "",
    floorplate: "",
    grossrent: "",
    assumevacancy: "",
    operatingexpense: "",
    entrycaprate: "",
    exitcaprate: "",
    efficiency: "",
    unitType: "",
    unitSize: "",
    newunitSize: "",
    unitfloors: "",
    numberofunits: "",
    net_rentable_square_footage: "",
    unitfloorstotal: "",
    net_effective_rent: "",
    totalunits: "",
    net_operating_income: "",
    devlopment_yeild: "",
  });
  const [iscanda, setisCanda] = useState(true);
  const [unit, setUnit] = useState<"sqft" | "sqm">("sqft");
  const [loading, setLoading] = useState<boolean>(true);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, profilePhoto: file });
    } else {
      setFormData({ ...formData, profilePhoto: null });
    }
  };

  // load info center
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backendendpoint}/gethelpcenter/67757f4ab8258e4d2aeec74d`,
        );
        const data = await response.json();

        if (response.ok) {
          setInfocenter(data);
        } else {
          console.error(
            "Error fetching data:",
            data.message || response.statusText,
          );
          alert("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowInfoCenter = (value: string) => {
    if (!infocenter) {
      alert("Data is not loaded yet.");
      return;
    }
    if (value in infocenter) {
      alert(` ${infocenter[value]}`);
    }
  };

  //handle toggle unit measurement
  const handleUnitToggle = () => {
    setUnit((prevUnit) => (prevUnit === "sqft" ? "sqm" : "sqft"));
  };

  //
  const handlecheckState = (value: String) => {
    console.log(iscanda);
    if (value != "Canada") {
      setisCanda(true);
    } else {
      setisCanda(false);
    }
  };

  // Handle form field changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      // Build a new object from the old state plus this updated field
      const updatedFormData = {
        ...prevData,
        [name]: value, // store the new value
      };

      // Parse numeric fields from updatedFormData
      const floorPlate = parseFloat(updatedFormData.floorplate) || 0;
      const grossSquareFootage =
        parseFloat(updatedFormData.grossSquareFootage) || 0;
      const unetperfloor = parseFloat(updatedFormData.numberofunits) || 0;
      const efficiency = parseFloat(updatedFormData.efficiency) || 0;
      const grossRent = parseFloat(updatedFormData.grossrent) || 0;
      const assumevacancy = parseFloat(updatedFormData.assumevacancy) || 0;
      const operatingExpense =
        parseFloat(updatedFormData.operatingexpense) || 0;
      const unitfloors = parseFloat(updatedFormData.unitfloors) || 0;

      // Perform calculations
      const netfloorplate = floorPlate * (efficiency / 100);
      const net_rentable_square_footage =
        grossSquareFootage * (efficiency / 100);
      const unitfloorstotal = unitfloors - 2;
      const net_effective_rent = grossRent * (1 - assumevacancy / 100);

      const totalunits = unetperfloor * unitfloorstotal;
      const net_operating_income =
        net_effective_rent * (1 - operatingExpense / 100);
      const devlopment_yeild = 0;

      // Debug logs (optional)
      console.log("netfloorplate:", netfloorplate);
      console.log("unitfloorstotal", unitfloorstotal);
      console.log("totalunits", totalunits);
      console.log("net_operating_income", net_operating_income);
      console.log("net_effective_rent", net_effective_rent);
      console.log("net_rentable_square_footage", net_rentable_square_footage);
      console.log("Unitsize", formData.newunitSize);
      // Return one final, updated object with your computed fields
      return {
        ...updatedFormData,
        netfloorplate: String(netfloorplate),
        unitfloorstotal: String(unitfloorstotal),
        net_effective_rent: String(net_effective_rent.toFixed(2)),
        totalunits: String(totalunits),
        net_operating_income: String(net_operating_income.toFixed(2)),
        devlopment_yeild: String(devlopment_yeild),
        net_rentable_square_footage: String(net_rentable_square_footage),
      };
    });
  };

  // Handle form submit
  const handleAddUnit = () => {
    console.log("ADDed");
    if (formData.unitType && formData.unitSize) {
      setUnits([...units, formData]);
      setFormData({
        ...formData,
        unitType: "",
        numberofunits: String(units.length + 1),
      }); // Reset only unit-specific fields
    } else {
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userIdFromLocalStorage = localStorage.getItem("sessionId") ?? "";

      // 1) Construct the multipart form data object
      const formDataToUpload = new FormData();

      // 2) Append the userId from localStorage
      formDataToUpload.append("userId", userIdFromLocalStorage);

      // 3) Append all the other fields
      formDataToUpload.append("buildingName", formData.buildingName);
      formDataToUpload.append("buildingAddress", formData.buildingAddress);
      formDataToUpload.append("yearBuilt", formData.yearbuilt);
      formDataToUpload.append("city", formData.city);
      formDataToUpload.append("country", formData.country);
      formDataToUpload.append("state", formData.state);

      // NOTE: This line appends "county" with the same value as "country."
      // If you intended "county" to be a different field from your formData,
      // replace `formData.country` with `formData.county`.
      formDataToUpload.append("county", formData.country);

      formDataToUpload.append("postalCode", "");

      // Convert numbers to string before appending
      formDataToUpload.append(
        "grossSquareFootage",
        parseFloat(formData.grossSquareFootage).toString(),
      );
      formDataToUpload.append(
        "floorPlate",
        parseFloat(formData.floorplate).toString(),
      );
      formDataToUpload.append(
        "efficiency",
        parseFloat(formData.efficiency).toString(),
      );
      formDataToUpload.append(
        "unitSize",
        parseFloat(formData.newunitSize).toString(),
      );
      formDataToUpload.append(
        "unitsPerFloor",
        parseFloat(formData.numberofunits).toString(),
      );
      formDataToUpload.append(
        "floors",
        parseFloat(formData.unitfloors).toString(),
      );
      formDataToUpload.append(
        "grossRent",
        parseFloat(formData.grossrent).toString(),
      );
      formDataToUpload.append(
        "assumedVacancy",
        parseFloat(formData.assumevacancy).toString(),
      );
      formDataToUpload.append(
        "operatingExpense",
        parseFloat(formData.operatingexpense).toString(),
      );
      formDataToUpload.append(
        "entryCapRate",
        parseFloat(formData.entrycaprate).toString(),
      );
      formDataToUpload.append(
        "exitCapRate",
        parseFloat(formData.exitcaprate).toString(),
      );

      // 4) Append the file (image) if present
      if (formData.profilePhoto) {
        formDataToUpload.append("image", formData.profilePhoto);
      }

      // 5) POST it to your Flask endpoint
      const response = await fetch(`${backendendpoint}/projects`, {
        method: "POST",
        body: formDataToUpload,
      });

      if (!response.ok) {
        // Optionally parse the JSON error
        const errorData = await response.json();
        console.error("Upload failed:", errorData);
        alert(`Error: ${errorData.error || response.statusText}`);
        return;
      }

      const result = await response.json();
      console.log("Project created successfully:", result);
      alert("Project created successfully!");
    } catch (error) {
      console.error("Error uploading project:", error);
      alert("Error uploading project. Check console for details.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-9 sm:grid-cols-3"
    >
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Building Photo
          </h3>
        </div>
        <div className="p-7">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-14 w-14 rounded-full">
                <>
                  {imagePreviewUrl && (
                    <div className="h-14 w-14 overflow-hidden rounded-full">
                      <Image
                        src={imagePreviewUrl}
                        width={55}
                        height={55}
                        alt="User"
                        className="overflow-hidden rounded-full"
                      />
                    </div>
                  )}
                </>
              </div>
              <div>
                <span className="mb-1.5 font-medium text-dark dark:text-white">
                  Add your photo
                </span>
                <span className="flex gap-3">
                  <button className="text-body-sm hover:text-red">
                    Delete
                  </button>
                </span>
              </div>
            </div>

            <div
              id="FileUpload"
              className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-xl border border-dashed border-gray-4 bg-gray-2 px-4 py-4 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary sm:py-7.5"
            >
              <input
                type="file"
                name="profilePhoto"
                id="profilePhoto"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleImageChange}
                className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              />
              <div className="flex flex-col items-center justify-center">
                <span className="flex h-13.5 w-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4613 2.07827C10.3429 1.94876 10.1755 1.875 10 1.875C9.82453 1.875 9.65714 1.94876 9.53873 2.07827L6.2054 5.7241C5.97248 5.97885 5.99019 6.37419 6.24494 6.6071C6.49969 6.84002 6.89502 6.82232 7.12794 6.56756L9.375 4.10984V13.3333C9.375 13.6785 9.65482 13.9583 10 13.9583C10.3452 13.9583 10.625 13.6785 10.625 13.3333V4.10984L12.8721 6.56756C13.105 6.82232 13.5003 6.84002 13.7551 6.6071C14.0098 6.37419 14.0275 5.97885 13.7946 5.7241L10.4613 2.07827Z"
                      fill="#5750F1"
                    />
                    <path
                      d="M3.125 12.5C3.125 12.1548 2.84518 11.875 2.5 11.875C2.15482 11.875 1.875 12.1548 1.875 12.5V12.5457C1.87498 13.6854 1.87497 14.604 1.9721 15.3265C2.07295 16.0765 2.2887 16.7081 2.79029 17.2097C3.29189 17.7113 3.92345 17.9271 4.67354 18.0279C5.39602 18.125 6.31462 18.125 7.45428 18.125H12.5457C13.6854 18.125 14.604 18.125 15.3265 18.0279C16.0766 17.9271 16.7081 17.7113 17.2097 17.2097C17.7113 16.7081 17.9271 16.0765 18.0279 15.3265C18.125 14.604 18.125 13.6854 18.125 12.5457V12.5C18.125 12.1548 17.8452 11.875 17.5 11.875C17.1548 11.875 16.875 12.1548 16.875 12.5C16.875 13.6962 16.8737 14.5304 16.789 15.1599C16.7068 15.7714 16.5565 16.0952 16.3258 16.3258C16.0952 16.5565 15.7714 16.7068 15.1599 16.789C14.5304 16.8737 13.6962 16.875 12.5 16.875H7.5C6.30382 16.875 5.46956 16.8737 4.8401 16.789C4.22862 16.7068 3.90481 16.5565 3.67418 16.3258C3.44354 16.0952 3.29317 15.7714 3.21096 15.1599C3.12633 14.5304 3.125 13.6962 3.125 12.5Z"
                      fill="#5750F1"
                    />
                  </svg>
                </span>
                <p className="mt-2.5 text-body-sm font-medium">
                  <span className="text-primary">Click to upload</span> or drag
                  and drop
                </p>
                <p className="mt-1 text-body-xs">
                  SVG, PNG, JPG or GIF (max, 800 X 800px)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Building Information
          </h3>
        </div>

        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Building Name
              </label>
              <span
                className=" cursor-pointer"
                onClick={() => {
                  handleShowInfoCenter("buildingName");
                }}
              >
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
              value={formData.buildingName}
              onChange={handleInputChange}
              placeholder="One City Center"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Building Address
              </label>
              <span
                className=" cursor-pointer"
                onClick={() => {
                  handleShowInfoCenter("buildingAddress");
                }}
              >
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
              id="buildingAddress"
              name="buildingAddress"
              placeholder="1021 Main Street"
              value={formData.buildingAddress}
              onChange={handleInputChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex gap-3">
            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Year Built
                </label>
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    handleShowInfoCenter("yearBuilt");
                  }}
                >
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
                id="yearbuilt"
                name="yearbuilt"
                placeholder="2001"
                value={formData.yearbuilt}
                onChange={handleInputChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Year Renovated
                </label>
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    handleShowInfoCenter("yearRenovated");
                  }}
                >
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
                id="yearrenovated"
                name="yearrenovated"
                placeholder="2024"
                value={formData.yearrenovated}
                onChange={handleInputChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <SelectGroupTwo
              selectedCountry={formData.country}
              onCountryChange={(value) => {
                setFormData((prevState) => ({
                  ...prevState,
                  country: value,
                }));
                handlecheckState(value);
              }}
            />

            <SelectStates
              selectedState={formData.state}
              iscanda={iscanda}
              onStateChange={(value) =>
                setFormData((prevState) => ({
                  ...prevState,
                  state: value,
                }))
              }
            />
            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  City
                </label>
              </div>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Atlanta"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Building Information 2
          </h3>
        </div>

        <div className="flex flex-col gap-5.5 p-6.5">
          {/* Unit Toggle */}
          <div className="flex items-center gap-4">
            <label className="text-body-sm font-medium text-dark dark:text-white">
              Measurement Unit
            </label>
            <div className="flex items-center">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={unit === "sqm"}
                  onChange={handleUnitToggle}
                />
                <span className="slider round"></span>
              </label>
              <span className="ml-2 text-body-sm">
                {unit === "sqft" ? "Square Feet" : "Square Meters"}
              </span>
            </div>
          </div>
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                {unit === "sqft"
                  ? "Gross Square Footage"
                  : "Gross Square Meters"}
              </label>
              <span
                className=" cursor-pointer"
                onClick={() => {
                  handleShowInfoCenter("grossSquareFootage");
                }}
              >
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
              type="number"
              id="grossSquareFootage"
              name="grossSquareFootage"
              onChange={handleInputChange}
              value={formData.grossSquareFootage}
              placeholder={unit === "sqft" ? "608,660" : "56,500"}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                {unit === "sqft" ? "Floor Plate (SF)" : "Floor Plate (SQM)"}
              </label>
              <span
                className=" cursor-pointer"
                onClick={() => {
                  handleShowInfoCenter("floorPlate");
                }}
              >
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
              type="number"
              id="floorplate"
              name="floorplate"
              value={formData.floorplate}
              onChange={handleInputChange}
              placeholder={unit === "sqft" ? "22,960" : "2,133"}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Efficiency
              </label>
              <span
                className=" cursor-pointer"
                onClick={() => {
                  handleShowInfoCenter("floorPlate");
                }}
              >
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
              type="number"
              id="efficiency"
              name="efficiency"
              value={formData.efficiency}
              onChange={handleInputChange}
              placeholder="70%"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex gap-3">
            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Unit Size
                </label>
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    handleShowInfoCenter("unitSize");
                  }}
                >
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
                type="number"
                id="newunitSize"
                name="newunitSize"
                value={formData.newunitSize}
                onChange={handleInputChange}
                placeholder={unit === "sqft" ? "900" : "83"}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Unit Floors
                </label>
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    handleShowInfoCenter("unitFloors");
                  }}
                >
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
                type="number"
                id="unitfloors"
                name="unitfloors"
                value={formData.unitfloors}
                onChange={handleInputChange}
                placeholder="29"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Gross Rent
                </label>
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    handleShowInfoCenter("grossRent");
                  }}
                >
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
                type="number"
                id="grossrent"
                name="grossrent"
                value={formData.grossrent}
                onChange={handleInputChange}
                placeholder="$ 1.85"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <div className="flex  gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Assumed Vacancy (%)
                </label>
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    handleShowInfoCenter("assumedVacancy");
                  }}
                >
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
                type="number"
                id="assumevacancy"
                name="assumevacancy"
                value={formData.assumevacancy}
                onChange={handleInputChange}
                placeholder="15%"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Building Information 3
          </h3>
        </div>

        <div className="flex flex-col gap-5.5 p-6.5">
          {/* Unit Toggle */}

          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Operating Expense (%)
              </label>
              <span
                className=" cursor-pointer"
                onClick={() => {
                  handleShowInfoCenter("operatingExpense");
                }}
              >
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
              type="number"
              id="operatingexpense"
              name="operatingexpense"
              value={formData.operatingexpense}
              onChange={handleInputChange}
              placeholder="45%"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Entry Cap Rate (%)
              </label>
              <span
                className=" cursor-pointer"
                onClick={() => {
                  handleShowInfoCenter("entryCapRate");
                }}
              >
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
              type="number"
              id="entrycaprate"
              name="entrycaprate"
              placeholder="7%"
              value={formData.entrycaprate}
              onChange={handleInputChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Exit Cap Rate
              </label>
              <span
                className=" cursor-pointer"
                onClick={() => {
                  handleShowInfoCenter("exitCapRate");
                }}
              >
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
              type="number"
              id="exitcaprate"
              name="exitcaprate"
              value={formData.exitcaprate}
              onChange={handleInputChange}
              placeholder="8%"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
      </div>
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Building Information 4
          </h3>
        </div>

        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Unit Per Floor
              </label>
              <span
                className=" cursor-pointer"
                onClick={() => {
                  handleShowInfoCenter("unitPerFloor");
                }}
              >
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
            <select
              name="unitType" // Added name attribute
              value={formData.unitType} // Bind the value to formData.unitType
              onChange={handleInputChange} // Added onChange handler
              className={`relative z-10 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-4 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 ${"text-dark dark:text-white"}`}
            >
              <option disabled value="Room1">
                Unit Floor
              </option>
              <option value="One Bedroom "> One Bedroom </option>
              <option value="One Bedroom with Den ">
                One Bedroom with Den{" "}
              </option>
              <option value="Two Bedroom "> Two Bedroom </option>
              <option value="Two Bedroom with Den ">
                One Bedroom with Den{" "}
              </option>
              <option value="Three Bedroom "> Three Bedroom </option>
              <option value="Three Bedroom with Den ">
                Three Bedroom with Den{" "}
              </option>
              <option value="Four Bedroom "> Four Bedroom </option>
              <option value="Four Bedroom with Den ">
                Four Bedroom with Den{" "}
              </option>
            </select>
          </div>
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Unit Size
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
              type="number"
              name="unitSize"
              id="unitSize"
              value={formData.unitSize}
              onChange={handleInputChange}
              placeholder="200 SF"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleAddUnit}
              className="mt-4 w-full rounded bg-primary py-2 text-white"
            >
              Add more unit
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Unit Per Floor Added
          </h3>
        </div>
        <div className="p-6.5">
          <div className="flex gap-2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Total Number Of Units
            </label>
            <span
              className="cursor-pointer"
              onClick={() => {
                handleShowInfoCenter("totalNumberOfUnits");
              }}
            >
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
            type="number"
            name="numberofunits"
            id="numberofunits"
            value={formData.numberofunits}
            onChange={handleInputChange}
            placeholder="Number of Units"
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
        <div
          className="flex flex-col gap-5.5 overflow-y-auto p-6.5"
          style={{ maxHeight: "300px" }} // Adjust the height as needed
        >
          {units.map((unit, index) => (
            <div key={index}>
              <p>Type: {unit.unitType}</p>
              <p>Size: {unit.unitSize}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Calculated Fields
          </h3>
        </div>

        <div className="flex flex-col gap-5.5 p-6.5">
          {/* Unit Toggle */}

          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                NET FLOOR PLATE
              </label>
            </div>
            <input
              type="number"
              id="netfloorplate"
              name="netfloorplate"
              value={formData.netfloorplate}
              onChange={handleInputChange}
              placeholder="17,220"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                NET RENTABLE SQUARE FOOTAGE
              </label>
            </div>
            <input
              type="number"
              id="net_rentable_square_footage"
              name="net_rentable_square_footage"
              placeholder="456,495"
              value={formData.net_rentable_square_footage}
              onChange={handleInputChange}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                UNIT FLOORS
              </label>
            </div>
            <input
              type="number"
              id="unitfloorstotal"
              name="unitfloorstotal"
              value={formData.unitfloorstotal}
              onChange={handleInputChange}
              placeholder="27"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                TOTAL UNITS
              </label>
            </div>
            <input
              type="number"
              id="unitfloorstotal"
              name="unitfloorstotal"
              value={formData.totalunits}
              onChange={handleInputChange}
              placeholder="513"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
      </div>
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Calculated Fields
          </h3>
        </div>

        <div className="flex flex-col gap-5.5 p-6.5">
          {/* Unit Toggle */}

          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Net Effective Rent
              </label>
            </div>
            <input
              type="number"
              id="net_effective_rent"
              name="net_effective_rent"
              value={formData.net_effective_rent}
              onChange={handleInputChange}
              placeholder="$ 1.57"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Net Operating Income
              </label>
            </div>
            <input
              type="number"
              id="net_operating_income"
              name="net_operating_income"
              value={formData.net_operating_income}
              onChange={handleInputChange}
              placeholder="$ 0.86"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <div className="flex  gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                DEVELOPMENT YIELD
              </label>
            </div>
            <input
              type="number"
              id="devlopment_yeild"
              name="devlopment_yeild"
              value={formData.devlopment_yeild}
              onChange={handleInputChange}
              placeholder="5.53 %"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded bg-primary py-2 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
