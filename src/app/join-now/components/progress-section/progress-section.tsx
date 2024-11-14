"use client";
import { twMerge } from "tailwind-merge";
import { useWizard } from "../../../context/wizard-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProgressSummary from "./progress-summary";

export type ProgressSteps = {
  name: string;
  step: 1 | 2 | 3;
  href: string;
};

type ProgressSectionProps = {
  title: string;
  step: 1 | 2 | 3;
  progressSections: ProgressSteps[];
};

const ProgressSection = ({
  title,
  step,
  progressSections,
}: ProgressSectionProps) => {
  const { formData, updateFormData } = useWizard();
  const router = useRouter();

  const goTo = (path: string) => {
    if (path === "/join-now") {
      updateFormData({ ...formData, membership: undefined });
    }

    router.push(path);
  };

  useEffect(() => {
    const stepStatusMap: Map<number, boolean> = new Map();
    stepStatusMap.set(
      1,
      formData.membership !== undefined &&
        formData.membershipType !== undefined &&
        formData.total !== undefined
    );

    stepStatusMap.set(
      2,
      formData.membership !== undefined &&
        formData.membershipType !== undefined &&
        formData.firstName !== undefined &&
        formData.lastName !== undefined &&
        formData.email !== undefined &&
        formData.dateOfBirth !== undefined &&
        formData.startDate !== undefined &&
        formData.password !== undefined &&
        formData.telephone !== undefined &&
        formData.postCode !== undefined &&
        formData.total !== undefined &&
        formData.gender !== undefined &&
        formData.disabledAccess !== undefined
    );

    if (step !== 1 && !stepStatusMap.get(step - 1)) {
      return goTo("/join-now");
    }
  }, [
    formData.membership,
    formData.membershipType,
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.dateOfBirth,
    formData.startDate,
    formData.password,
    formData.telephone,
    formData.postCode,
    formData.total,
    formData.gender,
    formData.disabledAccess,
    step,
  ]);

  return (
    <div className="py-6 ">
      <h1 className="pb-6 text-2xl text-center">{title}</h1>
      <div className="flex justify-center">
        <ol
          className={twMerge(
            "flex items-center w-[70vw] md:w-[50vw] text-xs lg:text-sm font-medium "
          )}
        >
          {progressSections.map((progressSection) => (
            <li
              key={progressSection.step}
              className={twMerge(
                "flex relative",
                progressSection.step !== 3 &&
                  "w-full after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4",
                progressSection.step >= step && "after:bg-gray-200",
                progressSection.step > step && "text-gray-300",
                progressSection.step < step && "after:bg-amber-600",
                progressSection.step <= step && "text-amber-600"
              )}
            >
              <div
                className={twMerge(
                  "block whitespace-nowrap z-10",
                  progressSection.step <= step && "cursor-pointer"
                )}
                onClick={() =>
                  progressSection.step <= step && goTo(progressSection.href)
                }
              >
                <span
                  className={twMerge(
                    "w-8 h-8 border-2 rounded-full flex justify-center items-center mx-auto mb-3 lg:w-10 lg:h-10 bg-gray-50 border-gray-300  text-gray-300",
                    progressSection.step <= step &&
                      "bg-amber-50 border-amber-600  text-amber-600"
                  )}
                >
                  {progressSection.step}
                </span>
                {progressSection.name}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex justify-center ">
        <ProgressSummary />
      </div>
    </div>
  );
};

export default ProgressSection;
