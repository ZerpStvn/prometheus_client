"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { backendendpoint } from "@/hooks/endpoint";
import { formatDate } from "@/hooks/formatdate";

type Project = {
  _id: string;
  buildingName: string;
  buildingAddress: string;
  city: string;
  state: string;
  datetimeCreated: string;
  image_id?: string; // Optional image_id
};

const TableOne = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  //  handle open more options
  // Toggle the dropdown menu for a specific row
  const toggleMenu = (projectId: string) => {
    setOpenMenuId(openMenuId === projectId ? null : projectId);
  };

  // get ProjectData
  useEffect(() => {
    const fetchProjects = async () => {
      if (typeof window !== "undefined") {
        const userId = localStorage.getItem("sessionId");

        if (!userId) {
          console.error("User not logged in or sessionId not found");
          return;
        }

        try {
          const response = await fetch(
            `${backendendpoint}/getprojects?user_id=${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (!response.ok) {
            throw new Error("Failed to fetch projects");
          }

          const data = await response.json();
          setProjects(data); // Store fetched projects
        } catch (error) {
          console.error("Failed to fetch projects:", error);
        }
      }
    };

    fetchProjects();
  }, []);
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Projects
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 sm:grid-cols-5">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Building
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Address
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              City
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              State
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {projects.map((projct, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === projects.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={projct._id}
          >
            <div className="flex items-center gap-3.5 px-2 py-4">
              <div className="flex-shrink-0">
                <Image
                  src={`${backendendpoint}/uploads/${projct.image_id}`}
                  alt="projects"
                  width={48}
                  height={48}
                />
              </div>
              <p className="hidden font-medium text-dark dark:text-white sm:block">
                {projct.buildingName}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {formatDate(projct.datetimeCreated)}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-green-light-1">{projct.city}</p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {projct.state}
              </p>
            </div>

            <div className="relative hidden items-center justify-center px-2 py-4 sm:flex">
              {/* <p className="font-medium text-dark dark:text-white">{}%</p> */}
              <button
                type="button"
                onClick={() => toggleMenu(projct._id)}
                className="flex  cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
              >
                Options
              </button>
              {openMenuId === projct._id && (
                <div className="absolute top-[80px] z-50 mt-2 w-48 rounded-md bg-white shadow-lg">
                  <ul className="text-start">
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-gray-900 hover:text-white"
                      onClick={() => {
                        console.log(`${projct._id}  Proforma`);
                      }}
                    >
                      Pro Forma
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-gray-900 hover:text-white"
                      onClick={() => {
                        console.log(`${projct._id}  Subsidy`);
                      }}
                    >
                      Subsidy
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-gray-900 hover:text-white"
                      onClick={() => {
                        console.log(`${projct._id}  Capital Stack`);
                      }}
                    >
                      Capital Stack
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-gray-900 hover:text-white"
                      onClick={() => {
                        console.log(`${projct._id}  Analytics`);
                      }}
                    >
                      Analytics
                    </li>
                    <li className="cursor-pointer px-4 py-2 hover:bg-gray-900 hover:text-white">
                      Delete
                    </li>
                    {/* <li className="px-4 py-2 hover:bg-gray-900 hover:text-white cursor-pointer">
                          Edit
                        </li> */}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
