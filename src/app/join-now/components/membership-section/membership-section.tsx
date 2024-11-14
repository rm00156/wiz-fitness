"use client";
import { Membership } from "@/app/constants";
import { useWizard } from "../../../context/wizard-context";
import { twMerge } from "tailwind-merge";
import MembershipsSection from "../../../components/memberships/memberships-section";
type MemberSectionProps = {
  dailyPasses: Membership[];
  monthlies: Membership[];
};

type Options = {
  name: "Daily Passes" | "Monthly";
  description: string;
  fromPrice: string;
};

const MembershipSection = ({ dailyPasses, monthlies }: MemberSectionProps) => {
  const { formData, updateFormData } = useWizard();

  const selectOption = (option: "Daily Passes" | "Monthly") => {
    updateFormData({ ...formData, membershipType: option });
  };

  const displaySelectedOptions = (
    options: Membership[],
    heading: string,
    isDisplayCheckBox: boolean
  ) => {
    return (
      <div className="mx-auto">
        <MembershipsSection
          title={heading}
          titleClassName="text-lg sm:mx-8"
          memberships={options}
          isDisplayCheckBox={isDisplayCheckBox}
        />
      </div>
    );
  };

  const selectOptions = () => {
    const dailyPassFromPrice = dailyPasses[0].price1;
    const monthlyFromPrice = monthlies[0].price1;

    const options = [
      {
        name: "Daily Passes",
        description: "Passes for the gym from 1 day to 30 days",
        fromPrice: dailyPassFromPrice,
      },
      {
        name: "Monthly",
        description: "Ongoing access to all we offer",
        fromPrice: monthlyFromPrice,
      },
    ] as Options[];

    return (
      <div>
        <h1 className="text-center text-lg py-10">
          Select a day pass or explore our flexible monthly memberships.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option) => (
            <div
              key={option.name}
              className={twMerge(
                "bg-white/60 sm:mx-8 lg:mx-0",
                "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 shadow"
              )}
            >
              <h3
                className={twMerge(
                  "text-amber-600",
                  "text-base/7 font-semibold"
                )}
              >
                {option.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                {option.description}
              </p>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={twMerge(
                    "text-gray-900",
                    "text-xl font-semibold tracking-tight"
                  )}
                >
                  From £{option.fromPrice}
                </span>
                <span className={twMerge("text-gray-500", "text-base")}>
                  /month
                </span>
              </p>

              <button
                type="button"
                className={twMerge(
                  "cursor-pointer w-full bg-black text-white shadow-sm hover:bg-slate-700 focus-visible:outline-slate-500",
                  "mt-5 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-5"
                )}
                onClick={() => selectOption(option.name)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getMembershipSectionChildren = () => {
    if (formData.membershipType === "Daily Passes") {
      return displaySelectedOptions(
        dailyPasses,
        "Select the pass that suits you best",
        false
      );
    } else if (formData.membershipType === "Monthly") {
      return displaySelectedOptions(
        monthlies,
        "Get the membership that suits you best",
        true
      );
    } else {
      return selectOptions();
    }
  };

  return (
    <div className="flex grid justify-center">
      <div className="py-10 mx-auto">{getMembershipSectionChildren()}</div>
    </div>
  );
};

export default MembershipSection;
