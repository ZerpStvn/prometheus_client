"use client";
import React, { useEffect, useState } from "react";
import { backendendpoint } from "@/hooks/endpoint";
import Image from "next/image";
import Link from "next/link";

interface Project {
  _id: string;
  buildingName: string;
  image_id?: string;
}

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Project[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().toLowerCase() !== "") {
        try {
          const response = await fetch(
            `${backendendpoint}/searchprojects?q=${encodeURIComponent(query)}`,
          );
          if (response.ok) {
            const data = await response.json();
            setSuggestions(data); // Only update the suggestions state
          } else {
            console.error("Error fetching suggestions:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]); // Clear suggestions if query is empty
      }
    };

    fetchSuggestions();
  }, [query]); // Only depend on query, not suggestions.length
  return (
    <div className=" max-w-[300px]">
      <li className="relative hidden  lg:block">
        <form>
          <div className="relative w-full max-w-[300px]">
            <button className="absolute left-5 top-1/2 -translate-y-1/2 text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary">
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1791_1693)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.625 2.0625C5.00063 2.0625 2.0625 5.00063 2.0625 8.625C2.0625 12.2494 5.00063 15.1875 8.625 15.1875C12.2494 15.1875 15.1875 12.2494 15.1875 8.625C15.1875 5.00063 12.2494 2.0625 8.625 2.0625ZM0.9375 8.625C0.9375 4.37931 4.37931 0.9375 8.625 0.9375C12.8707 0.9375 16.3125 4.37931 16.3125 8.625C16.3125 10.5454 15.6083 12.3013 14.4441 13.6487L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L13.6487 14.4441C12.3013 15.6083 10.5454 16.3125 8.625 16.3125C4.37931 16.3125 0.9375 12.8707 0.9375 8.625Z"
                    fill=""
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1791_1693">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full rounded-full border border-stroke bg-gray-2 py-3 pl-13.5 pr-5 text-dark focus:border-primary focus:outline-none dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus:border-primary xl:w-[300px]"
            />
          </div>
        </form>
      </li>
      {suggestions.length > 0 && (
        <div className="absolute top-[90px] min-w-[300px]  rounded-sm bg-white p-4 shadow-card">
          <ul className="">
            {suggestions.map((suggestion) => (
              <Link
                href={`/${suggestion._id}`}
                key={suggestion._id}
                className="flex items-center gap-2 pb-2 "
              >
                <Image
                  src={`${backendendpoint}/uploads/${suggestion.image_id}`}
                  width={80}
                  height={80}
                  alt={"project"}
                />
                <p>{suggestion.buildingName}</p>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
