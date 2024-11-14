import { useWizard } from "../../../context/wizard-context";
import { useRouter } from "next/navigation";

const ProgressSummary = () => {
  const { formData, updateFormData } = useWizard();
  const router = useRouter();

  const goToMembershipTypePage = () => {
    updateFormData({
      ...formData,
      membership: undefined,
      membershipType: undefined,
    });
    router.push("/join-now");
  };

  const goToMembershipPage = () => {
    const newMembershipType =
      formData.membershipType === "Monthly - Rolling"
        ? "Monthly"
        : formData.membershipType;
    updateFormData({
      ...formData,
      membershipType: newMembershipType,
      membership: undefined,
      total: undefined,
    });
    router.push("/join-now");
  };

  const goToYourDetailsPage = () => {
    router.push("/join-now/your-details");
  };

  return (
    <div>
      <ul
        role="list"
        className="divide-y divide-gray-300 w-[70vw] md:w-[50vw] py-5 text-sm md:text-base"
      >
        {formData.membershipType && (
          <li className="flex justify-between gap-x-6 py-5">
            <div className="grid grid-cols-3 w-full">
              <h1>Membership Type:</h1>
              <p className="text-center">{formData.membershipType}</p>
              <a
                href="#"
                className="text-right text-amber-600 underline"
                onClick={goToMembershipTypePage}
              >
                Edit
              </a>
            </div>
          </li>
        )}

        {formData.membership && (
          <li className="flex justify-between gap-x-6 py-5">
            <div className="grid grid-cols-3 w-full">
              <h1>Membership:</h1>
              <p className="text-center">
                {formData.membership} - £{formData.total}
              </p>
              <a
                href="#"
                className="text-right text-amber-600 underline"
                onClick={goToMembershipPage}
              >
                Edit
              </a>
            </div>
          </li>
        )}

        {formData.startDate && (
          <li className="flex justify-between gap-x-6 py-5">
            <div className="grid grid-cols-3 w-full">
              <h1>Start Date:</h1>
              <p className="text-center">{formData.startDate}</p>
              <a
                href="#"
                className="text-right text-amber-600 underline"
                onClick={goToYourDetailsPage}
              >
                Edit
              </a>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProgressSummary;
