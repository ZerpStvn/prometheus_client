"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

// If these imports differ in your project, adjust accordingly:
import SelectGroupTwo from "@/components/FormElements/SelectGroup/SelectGroupTwo";
import SelectStates from "@/components/FormElements/SelectGroup/selectStates";
import { backendendpoint } from "@/hooks/endpoint";

/** Types for main form data. */
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
  postalcode: string;
};

/** Each entry for the "Summarized Unit Floors". */
type CustomFloor = {
  floorName: string; // e.g. "One Bedroom", "Studio", etc.
  unitsPerFloor: string; // numeric string
  size: string; // area (string) in current unit (sqft or sqm)
};

/** Conversion factor constants. */
const conversionFactor = 0.092903;
// 1 sqft = 0.092903 sqm
// or equivalently 1 sqm ≈ 10.7639 sqft

/** Convert from sqft to sqm, returning a string. */
function toSqm(sqftStr: string): string {
  const sqft = parseFloat(sqftStr) || 0;
  const sqm = sqft * conversionFactor;
  return sqm.toFixed(2);
}

/** Convert from sqm to sqft, returning a string. */
function toSqft(sqmStr: string): string {
  const sqm = parseFloat(sqmStr) || 0;
  const sqft = sqm / conversionFactor;
  return sqft.toFixed(2);
}

/** Convert relevant area fields in the main form. */
function convertAreas(
  data: FormDataType,
  fromUnit: "sqft" | "sqm",
  toUnit: "sqft" | "sqm",
): FormDataType {
  if (fromUnit === toUnit) return data;

  const converter = fromUnit === "sqft" ? toSqm : toSqft;
  return {
    ...data,
    grossSquareFootage: converter(data.grossSquareFootage),
    floorplate: converter(data.floorplate),
    newunitSize: converter(data.newunitSize),
    netfloorplate: converter(data.netfloorplate),
    net_rentable_square_footage: converter(data.net_rentable_square_footage),
  };
}

/** Convert each custom floor's `size` between sqft and sqm. */
function convertCustomFloors(
  floors: CustomFloor[],
  fromUnit: "sqft" | "sqm",
  toUnit: "sqft" | "sqm",
): CustomFloor[] {
  if (fromUnit === toUnit) return floors;
  const converter = fromUnit === "sqft" ? toSqm : toSqft;
  return floors.map((floor) => ({
    ...floor,
    size: converter(floor.size),
  }));
}

/** The main component. */
const ProjectForm = () => {
  // Info center data, loaded from your backend.
  const [infocenter, setInfocenter] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // For building photo preview
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  // Main form data
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
    numberofunits: "0", // defaults to "0"
    unitfloors: "",
    net_rentable_square_footage: "",
    unitfloorstotal: "",
    net_effective_rent: "",
    totalunits: "",
    net_operating_income: "",
    devlopment_yeild: "",
    newunitSize: "",
    postalcode: "",
  });

  // Custom floors for Summarized Unit Floors
  const [customFloors, setCustomFloors] = useState<CustomFloor[]>([]);

  // A small local state for adding new floor entries:
  const [newFloorName, setNewFloorName] = useState("");
  const [newUnitsPerFloor, setNewUnitsPerFloor] = useState("");
  const [newFloorSize, setNewFloorSize] = useState("");

  // Measurement unit: can be "sqft" or "sqm"
  const [unit, setUnit] = useState<"sqft" | "sqm">("sqft");

  // Whether the selected country is Canada or not (based on your original code).
  const [iscanda, setisCanda] = useState(true);

  /** ====== Fetch Info Center on load ====== */
  useEffect(() => {
    async function fetchData() {
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
    }
    fetchData();
  }, []);

  /** Display info center text. */
  const handleShowInfoCenter = (key: string) => {
    if (!infocenter) {
      alert("Data is not loaded yet.");
      return;
    }
    if (key in infocenter) {
      alert(infocenter[key]);
    }
  };

  /** Toggle measurement unit for the entire form. */
  const handleUnitToggle = () => {
    const newUnit = unit === "sqft" ? "sqm" : "sqft";

    // Convert the main form area fields
    const convertedFormData = convertAreas(formData, unit, newUnit);
    setFormData(convertedFormData);

    // Convert each custom floor's size
    const convertedFloors = convertCustomFloors(customFloors, unit, newUnit);
    setCustomFloors(convertedFloors);

    // Update the unit
    setUnit(newUnit);
  };

  /** When changing the country, see if it's Canada or not. */
  const handlecheckState = (value: string) => {
    if (value !== "Canada") {
      setisCanda(true);
    } else {
      setisCanda(false);
    }
  };

  /** Handle changes to text inputs or selects in the main form. */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedFormData = { ...prevData, [name]: value };

      // Re-compute numeric fields that depend on each other
      const floorPlate = parseFloat(updatedFormData.floorplate) || 0;
      const grossSqft = parseFloat(updatedFormData.grossSquareFootage) || 0;
      const unetperfloor = parseFloat(updatedFormData.numberofunits) || 0;
      const efficiency = parseFloat(updatedFormData.efficiency) || 0;
      const grossRent = parseFloat(updatedFormData.grossrent) || 0;
      const assumevacancy = parseFloat(updatedFormData.assumevacancy) || 0;
      const operatingExpense =
        parseFloat(updatedFormData.operatingexpense) || 0;
      const unitfloors = parseFloat(updatedFormData.unitfloors) || 0;

      const netfloorplate = floorPlate * (efficiency / 100);
      const net_rentable_square_footage = grossSqft * (efficiency / 100);
      const unitfloorstotal = unitfloors - 2;
      const net_effective_rent = grossRent * (1 - assumevacancy / 100);
      const totalunits = unetperfloor * unitfloorstotal;
      const net_operating_income =
        net_effective_rent * (1 - operatingExpense / 100);
      // placeholder for dev yield
      const devlopment_yeild = 0;

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

  /** Handle the building photo upload change. */
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
    } else {
      setImagePreviewUrl(null);
      setFormData((prev) => ({ ...prev, profilePhoto: null }));
    }
  };

  /** Custom floors: Add a new floor entry. */
  const handleAddCustomFloor = () => {
    if (!newFloorName.trim()) {
      alert("Please enter a floor name");
      return;
    }
    if (!newUnitsPerFloor) {
      alert("Please enter units per floor");
      return;
    }
    if (!newFloorSize) {
      alert("Please enter the floor size");
      return;
    }

    const floor: CustomFloor = {
      floorName: newFloorName,
      unitsPerFloor: newUnitsPerFloor,
      size: newFloorSize,
    };

    setCustomFloors((prev) => [...prev, floor]);

    // Clear input fields
    setNewFloorName("");
    setNewUnitsPerFloor("");
    setNewFloorSize("");
  };

  /** Remove a custom floor. */
  const handleRemoveFloor = (index: number) => {
    setCustomFloors((prev) => prev.filter((_, i) => i !== index));
  };

  /** Summation of total units from all custom floors. */
  const totalCustomUnits = customFloors.reduce((acc, floor) => {
    const count = parseFloat(floor.unitsPerFloor) || 0;
    return acc + count;
  }, 0);

  /** Keep formData.numberofunits in sync with totalCustomUnits. */
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      numberofunits: String(totalCustomUnits),
    }));
  }, [totalCustomUnits]);

  /** On submit, gather everything into FormData and POST. */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userIdFromLocalStorage = localStorage.getItem("sessionId") ?? "";
      const formDataToUpload = new FormData();

      // Basic fields
      formDataToUpload.append("userId", userIdFromLocalStorage);
      formDataToUpload.append("buildingName", formData.buildingName);
      formDataToUpload.append("buildingAddress", formData.buildingAddress);
      formDataToUpload.append("yearBuilt", formData.yearbuilt);
      formDataToUpload.append("yearRenovated", formData.yearrenovated);
      formDataToUpload.append("city", formData.city);
      formDataToUpload.append("country", formData.country);
      formDataToUpload.append("state", formData.state);
      formDataToUpload.append("county", formData.country); // or real county
      formDataToUpload.append("postalCode", formData.postalcode);

      // Numeric fields
      formDataToUpload.append(
        "grossSquareFootage",
        formData.grossSquareFootage,
      );
      formDataToUpload.append("floorPlate", formData.floorplate);
      formDataToUpload.append("efficiency", formData.efficiency);
      formDataToUpload.append("unitSize", formData.newunitSize);
      formDataToUpload.append("unitsPerFloor", formData.numberofunits);
      formDataToUpload.append("floors", formData.unitfloors);
      formDataToUpload.append("grossRent", formData.grossrent);
      formDataToUpload.append("assumedVacancy", formData.assumevacancy);
      formDataToUpload.append("operatingExpense", formData.operatingexpense);
      formDataToUpload.append("entryCapRate", formData.entrycaprate);
      formDataToUpload.append("exitCapRate", formData.exitcaprate);

      // Calculated fields - optional if your backend needs them
      formDataToUpload.append("netFloorPlate", formData.netfloorplate);
      formDataToUpload.append(
        "netRentableSquareFootage",
        formData.net_rentable_square_footage,
      );
      formDataToUpload.append("unitFloorsTotal", formData.unitfloorstotal);
      formDataToUpload.append("totalUnits", formData.totalunits);
      formDataToUpload.append("netEffectiveRent", formData.net_effective_rent);
      formDataToUpload.append(
        "netOperatingIncome",
        formData.net_operating_income,
      );
      formDataToUpload.append("developmentYield", formData.devlopment_yeild);

      // Image file
      if (formData.profilePhoto) {
        formDataToUpload.append("image", formData.profilePhoto);
      }

      // Summarized Unit Floors (customFloors) if your backend needs them.
      // Adjust according to your backend's needs.
      // Example:
      formDataToUpload.append("customFloors", JSON.stringify(customFloors));

      // Post it
      const response = await fetch(`${backendendpoint}/projects`, {
        method: "POST",
        body: formDataToUpload,
      });

      if (!response.ok) {
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
      {/* ---------- CARD: BUILDING PHOTO ---------- */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Building Photo
          </h3>
        </div>
        <div className="p-7">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-15 w-14 rounded-full">
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
              </div>
              <div>
                <span className="mb-1.5 font-medium text-dark dark:text-white">
                  Add your photo
                </span>
              </div>
            </div>

            <div
              id="FileUpload"
              className="relative mb-5.5 block w-full cursor-pointer appearance-none 
                         rounded-xl border border-dashed border-gray-4 bg-gray-2 px-4 py-4 
                         hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary 
                         sm:py-7.5"
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
                <span
                  className="flex h-13.5 w-13.5 items-center justify-center 
                                 rounded-full border border-stroke bg-white 
                                 dark:border-dark-3 dark:bg-gray-dark"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4613 2.07827C10.3429 1.94876 10.1755 1.875 
                         10 1.875C9.82453 1.875 9.65714 1.94876 9.53873 
                         2.07827L6.2054 5.7241C5.97248 5.97885 5.99019 
                         6.37419 6.24494 6.6071C6.49969 6.84002 6.89502 
                         6.82232 7.12794 6.56756L9.375 4.10984V13.3333
                         C9.375 13.6785 9.65482 13.9583 10 13.9583
                         C10.3452 13.9583 10.625 13.6785 10.625 
                         13.3333V4.10984L12.8721 6.56756C13.105 
                         6.82232 13.5003 6.84002 13.7551 6.6071
                         C14.0098 6.37419 14.0275 5.97885 13.7946 
                         5.7241L10.4613 2.07827Z"
                      fill="#5750F1"
                    />
                    <path
                      d="M3.125 12.5C3.125 12.1548 2.84518 11.875 
                         2.5 11.875C2.15482 11.875 1.875 
                         12.1548 1.875 12.5V12.5457C1.87498 
                         13.6854 1.87497 14.604 1.9721 
                         15.3265C2.07295 16.0765 2.2887 
                         16.7081 2.79029 17.2097C3.29189 
                         17.7113 3.92345 17.9271 4.67354 
                         18.0279C5.39602 18.125 6.31462 
                         18.125 7.45428 18.125H12.5457C13.6854 
                         18.125 14.604 18.125 15.3265 
                         18.0279C16.0766 17.9271 16.7081 
                         17.7113 17.2097 17.2097C17.7113 
                         16.7081 17.9271 16.0765 18.0279 
                         15.3265C18.125 14.604 18.125 
                         13.6854 18.125 12.5457V12.5C18.125 
                         12.1548 17.8452 11.875 17.5 
                         11.875C17.1548 11.875 16.875 
                         12.1548 16.875 12.5C16.875 13.6962 
                         16.8737 14.5304 16.789 15.1599
                         C16.7068 15.7714 16.5565 16.0952 
                         16.3258 16.3258C16.0952 16.5565 
                         15.7714 16.7068 15.1599 16.789C14.5304 
                         16.8737 13.6962 16.875 12.5 
                         16.875H7.5C6.30382 16.875 
                         5.46956 16.8737 4.8401 16.789
                         C4.22862 16.7068 3.90481 16.5565 
                         3.67418 16.3258C3.44354 16.0952 
                         3.29317 15.7714 3.21096 15.1599
                         C3.12633 14.5304 3.125 13.6962 
                         3.125 12.5Z"
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

      {/* ---------- CARD: BUILDING INFORMATION ---------- */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Building Information
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          {/* BUILDING NAME */}
          <div>
            <div className="flex gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Building Name
              </label>
              <span
                className="cursor-pointer"
                onClick={() => handleShowInfoCenter("buildingName")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="19px"
                  viewBox="0 -960 960 960"
                  width="19px"
                  fill="#5f6368"
                >
                  <path
                    d="M440-280h80v-240h-80v240Zm40-320q17 
                   0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                   0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                   520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                   31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 
                   31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 
                   156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                   0 227-93t93-227q0-134-93-227t-227-93q-134 
                   0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
              </span>
            </div>
            <input
              type="text"
              name="buildingName"
              value={formData.buildingName}
              onChange={handleInputChange}
              placeholder="One City Center"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                         px-5.5 py-3 text-dark outline-none transition 
                         focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>
          {/* BUILDING ADDRESS */}
          <div>
            <div className="flex gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Building Address
              </label>
              <span
                className="cursor-pointer"
                onClick={() => handleShowInfoCenter("buildingAddress")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="19px"
                  viewBox="0 -960 960 960"
                  width="19px"
                  fill="#5f6368"
                >
                  <path
                    d="M440-280h80v-240h-80v240Zm40-320q17 
                   0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                   0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                   520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                   31.5-156T197-763q54-54 127-85.5T480-880q83 
                   0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                   83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                   0 227-93t93-227q0-134-93-227t-227-93q-134 
                   0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
              </span>
            </div>
            <input
              type="text"
              name="buildingAddress"
              value={formData.buildingAddress}
              onChange={handleInputChange}
              placeholder="1021 Main Street"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                         px-5.5 py-3 text-dark outline-none transition 
                         focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>

          {/* Row with Year Built / Year Renovated / Zip */}
          <div className="flex gap-3">
            {/* YEAR BUILT */}
            <div>
              <div className="flex gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Year Built
                </label>
                <span
                  className="cursor-pointer"
                  onClick={() => handleShowInfoCenter("yearBuilt")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path
                      d="M440-280h80v-240h-80v240Zm40-320q17 
                     0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                     0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                     520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                     31.5-156T197-763q54-54 127-85.5T480-880q83 
                     0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                     83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                     0 227-93t93-227q0-134-93-227t-227-93q-134 
                     0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                name="yearbuilt"
                value={formData.yearbuilt}
                onChange={handleInputChange}
                placeholder="2001"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                           px-5.5 py-3 text-dark outline-none transition 
                           focus:border-primary active:border-primary 
                           dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                           dark:focus:border-primary"
              />
            </div>

            {/* YEAR RENOVATED */}
            <div>
              <div className="flex gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Year Renovated
                </label>
                <span
                  className="cursor-pointer"
                  onClick={() => handleShowInfoCenter("yearRenovated")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path
                      d="M440-280h80v-240h-80v240Zm40-320q17 
                     0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                     0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                     520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                     31.5-156T197-763q54-54 127-85.5T480-880q83 
                     0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                     83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                     0 227-93t93-227q0-134-93-227t-227-93q-134 
                     0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                name="yearrenovated"
                value={formData.yearrenovated}
                onChange={handleInputChange}
                placeholder="2024"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                           px-5.5 py-3 text-dark outline-none transition 
                           focus:border-primary active:border-primary 
                           dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                           dark:focus:border-primary"
              />
            </div>

            {/* ZIP / POSTAL */}
            <div>
              <div className="flex gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Zip/Postal
                </label>
              </div>
              <input
                type="text"
                name="postalcode"
                placeholder="0000"
                value={formData.postalcode}
                onChange={handleInputChange}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                           px-5.5 py-3 text-dark outline-none transition 
                           focus:border-primary active:border-primary 
                           dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                           dark:focus:border-primary"
              />
            </div>
          </div>

          {/* Country / State */}
          <div className="flex gap-3">
            {/* Country */}
            <SelectGroupTwo
              selectedCountry={formData.country}
              onCountryChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  country: value,
                }));
                handlecheckState(value);
              }}
            />
            {/* State */}
            <SelectStates
              selectedState={formData.state}
              iscanda={iscanda}
              onStateChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  state: value,
                }));
              }}
            />
          </div>

          {/* City */}
          <div>
            <div className="flex gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                City
              </label>
            </div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Atlanta"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                         px-5.5 py-3 text-dark outline-none transition 
                         focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* ---------- CARD: BUILDING INFORMATION 2 ---------- */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Building Information 2
          </h3>
          {/* Toggle for sqft <-> sqm */}
          <div className="flex items-center gap-2">
            <label className="text-body-sm font-medium text-dark dark:text-white">
              {unit === "sqft" ? "Square Feet" : "Square Meters"}
            </label>
            <label className="switch">
              <input
                type="checkbox"
                checked={unit === "sqm"}
                onChange={handleUnitToggle}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          {/* GROSS SQUARE FOOTAGE / METER */}
          <div>
            <div className="flex gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                {unit === "sqft"
                  ? "Gross Square Footage"
                  : "Gross Square Meters"}
              </label>
              <span
                className="cursor-pointer"
                onClick={() => handleShowInfoCenter("grossSquareFootage")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="19px"
                  viewBox="0 -960 960 960"
                  width="19px"
                  fill="#5f6368"
                >
                  <path
                    d="M440-280h80v-240h-80v240Zm40-320q17 
                   0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                   0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                   520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                   31.5-156T197-763q54-54 127-85.5T480-880q83 
                   0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                   83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                   0 227-93t93-227q0-134-93-227t-227-93q-134 
                   0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
              </span>
            </div>
            <input
              type="number"
              name="grossSquareFootage"
              value={formData.grossSquareFootage}
              onChange={handleInputChange}
              placeholder={unit === "sqft" ? "608,660" : "56,500"}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                         px-5.5 py-3 text-dark outline-none transition 
                         focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>

          {/* FLOORPLATE */}
          <div>
            <div className="flex gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                {unit === "sqft" ? "Floor Plate (SF)" : "Floor Plate (SQM)"}
              </label>
              <span
                className="cursor-pointer"
                onClick={() => handleShowInfoCenter("floorPlate")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="19px"
                  viewBox="0 -960 960 960"
                  width="19px"
                  fill="#5f6368"
                >
                  <path
                    d="M440-280h80v-240h-80v240Zm40-320q17 
                   0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                   0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                   520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                   31.5-156T197-763q54-54 127-85.5T480-880q83 
                   0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                   83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                   0 227-93t93-227q0-134-93-227t-227-93q-134 
                   0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
              </span>
            </div>
            <input
              type="number"
              name="floorplate"
              value={formData.floorplate}
              onChange={handleInputChange}
              placeholder={unit === "sqft" ? "22,960" : "2,133"}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                         px-5.5 py-3 text-dark outline-none transition 
                         focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>

          {/* EFFICIENCY */}
          <div>
            <div className="flex gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Efficiency (%)
              </label>
              <span
                className="cursor-pointer"
                onClick={() => handleShowInfoCenter("floorPlate")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="19px"
                  viewBox="0 -960 960 960"
                  width="19px"
                  fill="#5f6368"
                >
                  <path
                    d="M440-280h80v-240h-80v240Zm40-320q17 
                   0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                   0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                   520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                   31.5-156T197-763q54-54 127-85.5T480-880q83 
                   0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                   83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                   0 227-93t93-227q0-134-93-227t-227-93q-134 
                   0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
              </span>
            </div>
            <input
              type="number"
              name="efficiency"
              value={formData.efficiency}
              onChange={handleInputChange}
              placeholder="70"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                         px-5.5 py-3 text-dark outline-none transition 
                         focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>

          {/* UNIT SIZE / UNIT FLOORS */}
          <div className="flex gap-3">
            <div>
              <div className="flex gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  {unit === "sqft" ? "Unit Size (SF)" : "Unit Size (SQM)"}
                </label>
                <span
                  className="cursor-pointer"
                  onClick={() => handleShowInfoCenter("unitSize")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path
                      d="M440-280h80v-240h-80v240Zm40-320q17 
                     0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                     0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                     520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                     31.5-156T197-763q54-54 127-85.5T480-880q83 
                     0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                     83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                     0 227-93t93-227q0-134-93-227t-227-93q-134 
                     0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="number"
                name="newunitSize"
                value={formData.newunitSize}
                onChange={handleInputChange}
                placeholder={unit === "sqft" ? "900" : "84"}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                           px-5.5 py-3 text-dark outline-none transition 
                           focus:border-primary active:border-primary 
                           dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                           dark:focus:border-primary"
              />
            </div>
            <div>
              <div className="flex gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Unit Floors
                </label>
                <span
                  className="cursor-pointer"
                  onClick={() => handleShowInfoCenter("unitFloors")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path
                      d="M440-280h80v-240h-80v240Zm40-320q17 
                     0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                     0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                     520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                     31.5-156T197-763q54-54 127-85.5T480-880q83 
                     0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                     83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                     0 227-93t93-227q0-134-93-227t-227-93q-134 
                     0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="number"
                name="unitfloors"
                value={formData.unitfloors}
                onChange={handleInputChange}
                placeholder="29"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                           px-5.5 py-3 text-dark outline-none transition 
                           focus:border-primary active:border-primary 
                           dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                           dark:focus:border-primary"
              />
            </div>
          </div>

          {/* GROSS RENT / ASSUMED VACANCY */}
          <div className="flex justify-between gap-3">
            <div>
              <div className="flex gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Gross Rent
                </label>
                <span
                  className="cursor-pointer"
                  onClick={() => handleShowInfoCenter("grossRent")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path
                      d="M440-280h80v-240h-80v240Zm40-320q17 
                     0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                     0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                     520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                     31.5-156T197-763q54-54 127-85.5T480-880q83 
                     0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                     83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                     0 227-93t93-227q0-134-93-227t-227-93q-134 
                     0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="number"
                name="grossrent"
                value={formData.grossrent}
                onChange={handleInputChange}
                placeholder="$1.85"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                           px-5.5 py-3 text-dark outline-none transition 
                           focus:border-primary active:border-primary 
                           dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                           dark:focus:border-primary"
              />
            </div>

            <div>
              <div className="flex gap-2">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Assumed Vacancy (%)
                </label>
                <span
                  className="cursor-pointer"
                  onClick={() => handleShowInfoCenter("assumedVacancy")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="19px"
                    viewBox="0 -960 960 960"
                    width="19px"
                    fill="#5f6368"
                  >
                    <path
                      d="M440-280h80v-240h-80v240Zm40-320q17 
                     0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                     0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                     520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                     31.5-156T197-763q54-54 127-85.5T480-880q83 
                     0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                     83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                     0 227-93t93-227q0-134-93-227t-227-93q-134 
                     0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="number"
                name="assumevacancy"
                value={formData.assumevacancy}
                onChange={handleInputChange}
                placeholder="15"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                           px-5.5 py-3 text-dark outline-none transition 
                           focus:border-primary active:border-primary 
                           dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                           dark:focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- CARD: BUILDING INFORMATION 3 ---------- */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Building Information 3
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          {/* OPERATING EXPENSE */}
          <div>
            <div className="flex gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Operating Expense (%)
              </label>
              <span
                className="cursor-pointer"
                onClick={() => handleShowInfoCenter("operatingExpense")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="19px"
                  viewBox="0 -960 960 960"
                  width="19px"
                  fill="#5f6368"
                >
                  <path
                    d="M440-280h80v-240h-80v240Zm40-320q17 
                   0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                   0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                   520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                   31.5-156T197-763q54-54 127-85.5T480-880q83 
                   0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                   83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                   0 227-93t93-227q0-134-93-227t-227-93q-134 
                   0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
              </span>
            </div>
            <input
              type="number"
              name="operatingexpense"
              value={formData.operatingexpense}
              onChange={handleInputChange}
              placeholder="45"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                         px-5.5 py-3 text-dark outline-none transition 
                         focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>
          {/* ENTRY CAP RATE */}
          <div>
            <div className="flex gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Entry Cap Rate (%)
              </label>
              <span
                className="cursor-pointer"
                onClick={() => handleShowInfoCenter("entryCapRate")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="19px"
                  viewBox="0 -960 960 0"
                  width="19px"
                  fill="#5f6368"
                >
                  <path
                    d="M440-280h80v-240h-80v240Zm40-320q17 
                   0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                   0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                   520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                   31.5-156T197-763q54-54 127-85.5T480-880q83 
                   0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                   83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                   0 227-93t93-227q0-134-93-227t-227-93q-134 
                   0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
              </span>
            </div>
            <input
              type="number"
              name="entrycaprate"
              value={formData.entrycaprate}
              onChange={handleInputChange}
              placeholder="7"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                         px-5.5 py-3 text-dark outline-none transition 
                         focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>
          {/* EXIT CAP RATE */}
          <div>
            <div className="flex gap-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Exit Cap Rate (%)
              </label>
              <span
                className="cursor-pointer"
                onClick={() => handleShowInfoCenter("exitCapRate")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="19px"
                  viewBox="0 -960 960 0"
                  width="19px"
                  fill="#5f6368"
                >
                  <path
                    d="M440-280h80v-240h-80v240Zm40-320q17 
                   0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 
                   0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 
                   520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
                   31.5-156T197-763q54-54 127-85.5T480-880q83 
                   0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                   83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 
                   0 227-93t93-227q0-134-93-227t-227-93q-134 
                   0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                  />
                </svg>
              </span>
            </div>
            <input
              type="number"
              name="exitcaprate"
              value={formData.exitcaprate}
              onChange={handleInputChange}
              placeholder="8"
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                         px-5.5 py-3 text-dark outline-none transition 
                         focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* ---------- CARD: SUMMARIZED UNIT FLOORS ---------- */}
      <div
        className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 
                   dark:bg-gray-dark dark:shadow-card sm:col-span-2"
      >
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Summarized Unit Floors
          </h3>
        </div>
        <div className="p-6.5">
          {/* Sub-form to add a new floor */}
          <div className="mb-4 flex flex-col gap-2 sm:flex-row">
            {/* FLOOR NAME */}
            <div className="flex-1">
              <label className="mb-1 block text-body-sm font-medium text-dark dark:text-white">
                Floor Name
              </label>
              <input
                type="text"
                placeholder='e.g. "One Bedroom", "Den", "Studio"'
                value={newFloorName}
                onChange={(e) => setNewFloorName(e.target.value)}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                           px-5.5 py-2 text-dark outline-none transition 
                           focus:border-primary active:border-primary 
                           dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                           dark:focus:border-primary"
              />
            </div>
            {/* UNITS PER FLOOR */}
            <div className="flex-1">
              <label className="mb-1 block text-body-sm font-medium text-dark dark:text-white">
                Units Per Floor
              </label>
              <input
                type="number"
                placeholder="e.g. 10"
                value={newUnitsPerFloor}
                onChange={(e) => setNewUnitsPerFloor(e.target.value)}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                           px-5.5 py-2 text-dark outline-none transition 
                           focus:border-primary active:border-primary 
                           dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                           dark:focus:border-primary"
              />
            </div>
            {/* SIZE */}
            <div className="flex-1">
              <label className="mb-1 block text-body-sm font-medium text-dark dark:text-white">
                {unit === "sqft" ? "Size (sqft)" : "Size (sqm)"}
              </label>
              <input
                type="number"
                placeholder={unit === "sqft" ? "e.g. 900" : "e.g. 84"}
                value={newFloorSize}
                onChange={(e) => setNewFloorSize(e.target.value)}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent 
                           px-5.5 py-2 text-dark outline-none transition 
                           focus:border-primary active:border-primary 
                           dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                           dark:focus:border-primary"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddCustomFloor}
            className="mb-5 inline-block rounded bg-primary px-4 py-2 font-medium text-white 
                       hover:bg-primary/80"
          >
            Add Floor
          </button>

          {/* List existing floors */}
          {customFloors.length > 0 ? (
            <div className="max-h-64 space-y-3 overflow-y-auto border-t border-stroke pt-3 dark:border-dark-3">
              {customFloors.map((floor, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-between gap-2 rounded 
                             bg-gray-50 p-2 dark:bg-dark-2 sm:flex-row"
                >
                  <div className="flex-1">
                    <p className="font-medium text-dark dark:text-white">
                      {floor.floorName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Units Per Floor: {floor.unitsPerFloor}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Size: {floor.size} {unit}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFloor(index)}
                    className="rounded bg-red-500 px-4 py-1 text-sm text-white hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No floors added yet.</p>
          )}

          {/* Total units from floors */}
          <div className="mt-4 border-t border-stroke pt-2 dark:border-dark-3">
            <p className="text-body-sm font-medium text-dark dark:text-white">
              Total Units (from these floors):{" "}
              {customFloors.reduce(
                (acc, f) => acc + (parseFloat(f.unitsPerFloor) || 0),
                0,
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- CARD: CALCULATED FIELDS / EXAMPLE ---------- */}
      <div
        className="rounded-[10px] border border-stroke bg-white shadow-1 
                  dark:border-dark-3 dark:bg-gray-dark dark:shadow-card"
      >
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Calculated Fields
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          {/* NET FLOOR PLATE */}
          <div>
            <label className="mb-1 block text-body-sm font-medium text-dark dark:text-white">
              Net Floor Plate
            </label>
            <input
              type="number"
              name="netfloorplate"
              value={formData.netfloorplate}
              onChange={handleInputChange}
              placeholder="e.g. 17,220"
              className="w-full rounded-[7px] border-[1.5px] border-stroke 
                         bg-transparent px-5.5 py-3 text-dark outline-none 
                         transition focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>
          {/* NET RENTABLE SQUARE FOOTAGE */}
          <div>
            <label className="mb-1 block text-body-sm font-medium text-dark dark:text-white">
              Net Rentable Square Footage
            </label>
            <input
              type="number"
              name="net_rentable_square_footage"
              value={formData.net_rentable_square_footage}
              onChange={handleInputChange}
              placeholder="e.g. 456,495"
              className="w-full rounded-[7px] border-[1.5px] border-stroke 
                         bg-transparent px-5.5 py-3 text-dark outline-none 
                         transition focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>
          {/* UNIT FLOORS TOTAL */}
          <div>
            <label className="mb-1 block text-body-sm font-medium text-dark dark:text-white">
              Unit Floors
            </label>
            <input
              type="number"
              name="unitfloorstotal"
              value={formData.unitfloorstotal}
              onChange={handleInputChange}
              placeholder="e.g. 27"
              className="w-full rounded-[7px] border-[1.5px] border-stroke 
                         bg-transparent px-5.5 py-3 text-dark outline-none 
                         transition focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>
          {/* TOTAL UNITS */}
          <div>
            <label className="mb-1 block text-body-sm font-medium text-dark dark:text-white">
              Total Units
            </label>
            <input
              type="number"
              name="totalunits"
              value={formData.totalunits}
              onChange={handleInputChange}
              placeholder="e.g. 513"
              className="w-full rounded-[7px] border-[1.5px] border-stroke 
                         bg-transparent px-5.5 py-3 text-dark outline-none 
                         transition focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* ---------- CARD: MORE CALCULATED FIELDS ---------- */}
      <div
        className="rounded-[10px] border border-stroke bg-white shadow-1 
                  dark:border-dark-3 dark:bg-gray-dark dark:shadow-card"
      >
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Calculated Fields 2
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          {/* NET EFFECTIVE RENT */}
          <div>
            <label className="mb-1 block text-body-sm font-medium text-dark dark:text-white">
              Net Effective Rent
            </label>
            <input
              type="number"
              name="net_effective_rent"
              value={formData.net_effective_rent}
              onChange={handleInputChange}
              placeholder="$1.57"
              className="w-full rounded-[7px] border-[1.5px] border-stroke 
                         bg-transparent px-5.5 py-3 text-dark outline-none 
                         transition focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>
          {/* NET OPERATING INCOME */}
          <div>
            <label className="mb-1 block text-body-sm font-medium text-dark dark:text-white">
              Net Operating Income
            </label>
            <input
              type="number"
              name="net_operating_income"
              value={formData.net_operating_income}
              onChange={handleInputChange}
              placeholder="$0.86"
              className="w-full rounded-[7px] border-[1.5px] border-stroke 
                         bg-transparent px-5.5 py-3 text-dark outline-none 
                         transition focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>
          {/* DEVELOPMENT YIELD */}
          <div>
            <label className="mb-1 block text-body-sm font-medium text-dark dark:text-white">
              Development Yield
            </label>
            <input
              type="number"
              name="devlopment_yeild"
              value={formData.devlopment_yeild}
              onChange={handleInputChange}
              placeholder="5.53%"
              className="w-full rounded-[7px] border-[1.5px] border-stroke 
                         bg-transparent px-5.5 py-3 text-dark outline-none 
                         transition focus:border-primary active:border-primary 
                         dark:border-dark-3 dark:bg-dark-2 dark:text-white 
                         dark:focus:border-primary"
            />
          </div>
          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="mt-4 w-full rounded bg-primary py-2 text-white 
                       hover:bg-primary/80"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
