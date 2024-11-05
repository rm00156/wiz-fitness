"use client";
import { Membership } from "@/app/constants";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export type MemebershipsSectionProps = {
  memberships: Membership[];
};

const MemebershipsSection = ({ memberships }: MemebershipsSectionProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div
      id="memberships"
      className="relative isolate bg-white px-6 pt-[120px] pb-[120px] sm:pb-[80px] sm:pt-[80px] lg:px-8"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      ></div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl md:text-4xl text-black">Memberships</h2>
      </div>

      <div className="mt-8 flex justify-center">
        <div className=" flex items-center space-x-4">
          <div className="grid grid-col-1">
            <span className="text-gray-700 font-bold text-right">Standard</span>
            <span className="text-gray-500 text-sm">12 month term</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              onChange={handleChange}
              type="checkbox"
              className="sr-only peer"
            />
            <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-black"></div>
            <div className="absolute left-1 top-0.6 h-5 w-5 bg-white rounded-full transition-transform transform peer-checked:translate-x-5"></div>
          </label>
          <div className="grid grid-col-1">
            <span className="text-gray-700 font-bold">Flexible</span>
            <span className="text-gray-500 text-sm">1-month rolling</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-4 gap-y-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-3">
        {memberships.map((membership) => (
          <div
            key={membership.id}
            className={twMerge(
              membership.isMostPopular
                ? "relative bg-gray-900 shadow-2xl overflow-hidden"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            {membership.isMostPopular && (
              <div className="absolute right-0 top-0 h-16 w-16">
                <div className="absolute transform rotate-45 bg-red-400 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
                  Most Popular
                </div>
              </div>
            )}

            <h3
              id={membership.id}
              className={twMerge(
                membership.isMostPopular ? "text-amber-400" : "text-amber-600",
                "text-base/7 font-semibold"
              )}
            >
              {membership.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={twMerge(
                  membership.isMostPopular ? "text-white" : "text-gray-900",
                  "text-5xl font-semibold tracking-tight"
                )}
              >
                £
                {!isChecked
                  ? membership.contractPrice
                  : membership.rollingPrice}
              </span>
              <span
                className={twMerge(
                  membership.isMostPopular ? "text-gray-400" : "text-gray-500",
                  "text-base"
                )}
              >
                /month
              </span>
            </p>
            <p
              className={twMerge(
                membership.isMostPopular ? "text-gray-300" : "text-gray-600",
                "mt-6 text-base/7"
              )}
            >
              {membership.description}
            </p>
            <ul
              role="list"
              className={twMerge(
                membership.isMostPopular ? "text-gray-300" : "text-gray-600",
                "mt-8 space-y-3 text-sm/6 sm:mt-10"
              )}
            >
              {membership.features.map((feature) => (
                <li key={feature.name} className="flex gap-x-3">
                  {feature.access ? (
                    <CheckIcon
                      aria-hidden="true"
                      className={twMerge(
                        membership.isMostPopular
                          ? "text-amber-400"
                          : "text-amber-600",
                        "h-6 w-5 flex-none"
                      )}
                    />
                  ) : (
                    <XMarkIcon
                      aria-hidden="true"
                      className={twMerge(
                        membership.isMostPopular
                          ? "text-red-400"
                          : "text-red-600",
                        "h-6 w-5 flex-none"
                      )}
                    />
                  )}

                  {feature.name}
                </li>
              ))}
            </ul>
            <a
              href={membership.href}
              aria-describedby={membership.id}
              className={twMerge(
                membership.isMostPopular
                  ? "bg-amber-500 text-white shadow-sm hover:bg-amber-400 focus-visible:outline-amber-500"
                  : "bg-black text-white shadow-sm hover:bg-slate-700 focus-visible:outline-slate-500",
                "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
              )}
            >
              Select
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemebershipsSection;
