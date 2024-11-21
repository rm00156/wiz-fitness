"use client";
import { useState } from "react";
import MembershipItem from "./membership-item";
import { Product } from "../../stripe/stripe-helper";

export type MembershipsSectionProps = {
  memberships: Product[];
  title: string;
  titleClassName?: string;
  isDisplayCheckBox?: boolean;
};

const MembershipsSection = ({
  memberships,
  title,
  titleClassName = "text-2xl md:text-4xl text-black",
  isDisplayCheckBox,
}: MembershipsSectionProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      ></div>

      <div className="mx-auto max-w-4xl text-center">
        <h2 className={titleClassName}>{title}</h2>
      </div>

      {isDisplayCheckBox && (
        <div className="mt-8 flex justify-center">
          <div className=" flex items-center space-x-4">
            <div className="grid grid-col-1">
              <span className="text-gray-700 font-bold text-right">
                Standard
              </span>
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
      )}
      <div className="flex justify-center mt-16 grid  grid-cols-1 md:grid-cols-2  gap-4 gap-y-6 sm:mt-20  lg:grid-cols-4">
        {memberships.map((membership) => (
          <MembershipItem
            key={membership.id}
            membership={membership}
            isChecked={isChecked}
          />
        ))}
      </div>
    </div>
  );
};

export default MembershipsSection;
