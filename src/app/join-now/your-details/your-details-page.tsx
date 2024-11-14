"use client";
import ProgressSection, {
  ProgressSteps,
} from "../components/progress-section/progress-section";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { YourDetailFormData, formSchema } from "./form-schema/form-schema";
import { useWizard } from "../../context/wizard-context";
import { useRouter } from "next/navigation";

type YourDetailsProps = {
  progressSections: ProgressSteps[];
};
const YourDetails = ({ progressSections }: YourDetailsProps) => {
  const { formData, updateFormData } = useWizard();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YourDetailFormData>({
    defaultValues: {
      firstName: formData.firstName ?? "",
      lastName: formData.lastName ?? "",
      email: formData.email ?? "",
      password: formData.password ?? "",
      telephone: formData.telephone ?? "",
      postCode: formData.postCode ?? "",
      gender: formData.gender,
      disabledAccess: formData.disabledAccess,
      dateOfBirth: formData.dateOfBirth ?? "",
      startDate: formData.startDate ?? "",
    },
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<YourDetailFormData> = (data) => {
    updateFormData({ ...formData, ...data });
    router.push("/join-now/payment");
  };
  return (
    <>
      <ProgressSection
        title={"Your Details"}
        step={2}
        progressSections={progressSections}
      />
      <div className="flex mx-auto justify-center py-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[70vw] md:w-[50vw] text-left space-y-4"
        >
          <div>
            <label htmlFor="firstName" className="block font-medium">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("firstName")}
              id="firstName"
              type="text"
              aria-label="firstName"
              className={`border rounded p-2 w-full focus:outline-amber-600 ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block font-medium">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("lastName")}
              id="lastName"
              type="text"
              aria-label="lastName"
              className={`border rounded p-2 w-full focus:outline-amber-600 ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              aria-label="email"
              className={`border rounded p-2 w-full focus:outline-amber-600 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              {...register("password")}
              id="password"
              type="password"
              aria-label="password"
              className={`border rounded p-2 w-full focus:outline-amber-600 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="telephone" className="block font-medium">
              Telephone Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register("telephone")}
              id="telephone"
              type="text"
              aria-label="telephone"
              className={`border rounded p-2 w-full focus:outline-amber-600 ${
                errors.telephone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.telephone && (
              <p className="text-red-500 text-sm">{errors.telephone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="postCode" className="block font-medium">
              Post Code <span className="text-red-500">*</span>
            </label>
            <input
              {...register("postCode")}
              id="postCode"
              type="text"
              aria-label="postCode"
              className={`border rounded p-2 w-full focus:outline-amber-600 ${
                errors.telephone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.postCode && (
              <p className="text-red-500 text-sm">{errors.postCode.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <span className="block font-medium">
                Gender <span className="text-red-500">*</span>
              </span>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    {...register("gender")}
                    type="radio"
                    aria-label="gender"
                    value="Male"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register("gender")}
                    type="radio"
                    value="Female"
                    className="h-4 w-4 text-pink-600 checked:outline-pink-600 checked:border-pink-500 focus:outline-pink-500 border-gray-300"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>

            <div className="py-3 md:py-0">
              <span className="block font-medium">
                Do you require disabled access?{" "}
                <span className="text-red-500">*</span>
              </span>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    {...register("disabledAccess")}
                    type="radio"
                    value="No"
                    aria-label="disabledAccess"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                  />
                  <span className="ml-2">No</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register("disabledAccess")}
                    type="radio"
                    value="Yes"
                    className="h-4 w-4 text-pink-600 checked:outline-pink-600 checked:border-pink-500 focus:outline-pink-500 border-gray-300"
                  />
                  <span className="ml-2">Yes</span>
                </label>
              </div>
              {errors.disabledAccess && (
                <p className="text-red-500 text-sm">
                  {errors.disabledAccess.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block font-medium">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              {...register("dateOfBirth")}
              id="dateOfBirth"
              type="date"
              aria-label="dateOfBirth"
              className={`border rounded p-2 w-full focus:outline-amber-600 ${
                errors.dateOfBirth ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="startDate" className="block font-medium">
              Start Date<span className="text-red-500"> *</span>
            </label>
            <input
              {...register("startDate")}
              id="startDate"
              type="date"
              aria-label="startDate"
              className={`border rounded p-2 w-full focus:outline-amber-600 ${
                errors.startDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>
          <div className="pt-6 pb-10">
            <button
              type="submit"
              className="rounded-lg text-sm font-semibold py-2.5 px-4 bg-black text-white hover:bg-slate-700"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default YourDetails;
