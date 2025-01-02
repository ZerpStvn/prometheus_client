import React from "react";
import { dataStats } from "@/types/dataStats";

type TotalSFValue = {
  value: string;
};

const TotalSF: React.FC<TotalSFValue> = ({ value }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
          <div
            className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
            style={{ backgroundColor: "#3FD97F" }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5626 13.0002C10.5626 11.654 11.6539 10.5627 13.0001 10.5627C14.3463 10.5627 15.4376 11.654 15.4376 13.0002C15.4376 14.3464 14.3463 15.4377 13.0001 15.4377C11.6539 15.4377 10.5626 14.3464 10.5626 13.0002Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.16675 13.0002C2.16675 14.7762 2.62713 15.3743 3.54788 16.5705C5.38638 18.959 8.4697 21.6668 13.0001 21.6668C17.5305 21.6668 20.6138 18.959 22.4523 16.5705C23.373 15.3743 23.8334 14.7762 23.8334 13.0002C23.8334 11.2242 23.373 10.6261 22.4523 9.42985C20.6138 7.04135 17.5305 4.3335 13.0001 4.3335C8.4697 4.3335 5.38638 7.04135 3.54788 9.42985C2.62713 10.6261 2.16675 11.2242 2.16675 13.0002ZM13.0001 8.93766C10.7564 8.93766 8.93758 10.7565 8.93758 13.0002C8.93758 15.2438 10.7564 17.0627 13.0001 17.0627C15.2437 17.0627 17.0626 15.2438 17.0626 13.0002C17.0626 10.7565 15.2437 8.93766 13.0001 8.93766Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                {value}
              </h4>
              <span className="text-body-sm font-medium">Total RSF</span>
            </div>

            <span
              className={`flex items-center gap-1.5 text-body-sm font-medium ${
                0.43 > 0 ? "text-green" : "text-red"
              }`}
            >
              {0.43}%
              {0.43 > 0 ? (
                <svg
                  className="fill-current"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.35716 2.3925L0.908974 5.745L5.0443e-07 4.86125L5 -5.1656e-07L10 4.86125L9.09103 5.745L5.64284 2.3925L5.64284 10L4.35716 10L4.35716 2.3925Z"
                    fill=""
                  />
                </svg>
              ) : (
                <svg
                  className="fill-current"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.64284 7.6075L9.09102 4.255L10 5.13875L5 10L-8.98488e-07 5.13875L0.908973 4.255L4.35716 7.6075L4.35716 7.6183e-07L5.64284 9.86625e-07L5.64284 7.6075Z"
                    fill=""
                  />
                </svg>
              )}
            </span>
          </div>
        </div>
        <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
          <div
            className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
            style={{ backgroundColor: "#3FD97F" }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 23.8332C18.983 23.8332 23.8333 18.9829 23.8333 12.9998C23.8333 7.01675 18.983 2.1665 13 2.1665C7.01687 2.1665 2.16663 7.01675 2.16663 12.9998C2.16663 18.9829 7.01687 23.8332 13 23.8332ZM13.8125 6.49984C13.8125 6.05111 13.4487 5.68734 13 5.68734C12.5512 5.68734 12.1875 6.05111 12.1875 6.49984V6.84297C10.4212 7.15923 8.93746 8.48625 8.93746 10.2915C8.93746 12.3684 10.9013 13.8123 13 13.8123C14.4912 13.8123 15.4375 14.7935 15.4375 15.7082C15.4375 16.6228 14.4912 17.604 13 17.604C11.5088 17.604 10.5625 16.6228 10.5625 15.7082C10.5625 15.2594 10.1987 14.8957 9.74996 14.8957C9.30123 14.8957 8.93746 15.2594 8.93746 15.7082C8.93746 17.5134 10.4212 18.8404 12.1875 19.1567V19.4998C12.1875 19.9486 12.5512 20.3123 13 20.3123C13.4487 20.3123 13.8125 19.9486 13.8125 19.4998V19.1567C15.5788 18.8404 17.0625 17.5134 17.0625 15.7082C17.0625 13.6313 15.0986 12.1873 13 12.1873C11.5088 12.1873 10.5625 11.2061 10.5625 10.2915C10.5625 9.37688 11.5088 8.39567 13 8.39567C14.4912 8.39567 15.4375 9.37688 15.4375 10.2915C15.4375 10.7402 15.8012 11.104 16.25 11.104C16.6987 11.104 17.0625 10.7402 17.0625 10.2915C17.0625 8.48625 15.5788 7.15923 13.8125 6.84297V6.49984Z"
                  fill="white"
                />
              </svg>
            </svg>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                $161,229,125
              </h4>
              <span className="text-body-sm font-medium">
                Total Project Costs
              </span>
            </div>

            <span
              className={`flex items-center gap-1.5 text-body-sm font-medium ${"text-red"}`}
            >
              {0.23}%
              {0.43 > 0 ? (
                <svg
                  className="fill-current"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.35716 2.3925L0.908974 5.745L5.0443e-07 4.86125L5 -5.1656e-07L10 4.86125L9.09103 5.745L5.64284 2.3925L5.64284 10L4.35716 10L4.35716 2.3925Z"
                    fill=""
                  />
                </svg>
              ) : (
                <svg
                  className="fill-current"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.64284 7.6075L9.09102 4.255L10 5.13875L5 10L-8.98488e-07 5.13875L0.908973 4.255L4.35716 7.6075L4.35716 7.6183e-07L5.64284 9.86625e-07L5.64284 7.6075Z"
                    fill=""
                  />
                </svg>
              )}
            </span>
          </div>
        </div>
        <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
          <div
            className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
            style={{ backgroundColor: "#3FD97F" }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 23.8332C18.983 23.8332 23.8333 18.9829 23.8333 12.9998C23.8333 7.01675 18.983 2.1665 13 2.1665C7.01687 2.1665 2.16663 7.01675 2.16663 12.9998C2.16663 18.9829 7.01687 23.8332 13 23.8332ZM13.8125 6.49984C13.8125 6.05111 13.4487 5.68734 13 5.68734C12.5512 5.68734 12.1875 6.05111 12.1875 6.49984V6.84297C10.4212 7.15923 8.93746 8.48625 8.93746 10.2915C8.93746 12.3684 10.9013 13.8123 13 13.8123C14.4912 13.8123 15.4375 14.7935 15.4375 15.7082C15.4375 16.6228 14.4912 17.604 13 17.604C11.5088 17.604 10.5625 16.6228 10.5625 15.7082C10.5625 15.2594 10.1987 14.8957 9.74996 14.8957C9.30123 14.8957 8.93746 15.2594 8.93746 15.7082C8.93746 17.5134 10.4212 18.8404 12.1875 19.1567V19.4998C12.1875 19.9486 12.5512 20.3123 13 20.3123C13.4487 20.3123 13.8125 19.9486 13.8125 19.4998V19.1567C15.5788 18.8404 17.0625 17.5134 17.0625 15.7082C17.0625 13.6313 15.0986 12.1873 13 12.1873C11.5088 12.1873 10.5625 11.2061 10.5625 10.2915C10.5625 9.37688 11.5088 8.39567 13 8.39567C14.4912 8.39567 15.4375 9.37688 15.4375 10.2915C15.4375 10.7402 15.8012 11.104 16.25 11.104C16.6987 11.104 17.0625 10.7402 17.0625 10.2915C17.0625 8.48625 15.5788 7.15923 13.8125 6.84297V6.49984Z"
                  fill="white"
                />
              </svg>
            </svg>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                $161,229,125
              </h4>
              <span className="text-body-sm font-medium">
                Total Renovation Costs
              </span>
            </div>

            <span
              className={`flex items-center gap-1.5 text-body-sm font-medium ${"text-red"}`}
            >
              {0.33}%
              {0.29 < 0 ? (
                <svg
                  className="fill-current"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.35716 2.3925L0.908974 5.745L5.0443e-07 4.86125L5 -5.1656e-07L10 4.86125L9.09103 5.745L5.64284 2.3925L5.64284 10L4.35716 10L4.35716 2.3925Z"
                    fill=""
                  />
                </svg>
              ) : (
                <svg
                  className="fill-current"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.64284 7.6075L9.09102 4.255L10 5.13875L5 10L-8.98488e-07 5.13875L0.908973 4.255L4.35716 7.6075L4.35716 7.6183e-07L5.64284 9.86625e-07L5.64284 7.6075Z"
                    fill=""
                  />
                </svg>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalSF;
