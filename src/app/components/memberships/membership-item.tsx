import { twMerge } from "tailwind-merge";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useWizard } from "../../context/wizard-context";
import { Product } from "../../stripe/stripe-helper";
import Stripe from "stripe";

type MembershipItemProps = {
  membership: Product;
  isChecked?: boolean;
};

const MembershipItem = ({ membership, isChecked }: MembershipItemProps) => {
  const { formData, updateFormData } = useWizard();
  const router = useRouter();

  const goTo = (
    name: string,
    membershipType: string,
    total: number,
    priceId: string
  ) => {
    updateFormData({
      ...formData,
      membership: name,
      membershipType: membershipType,
      total,
      priceId,
    });

    router.push("/join-now/your-details");
  };
  return (
    <div
      key={membership.id}
      className={twMerge(
        membership.isMostPopular
          ? "relative bg-gray-900 shadow-2xl sm:mx-8 lg:mx-0 overflow-hidden"
          : "bg-white/60 sm:mx-8 lg:mx-0",
        "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 shadow"
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
            ? (membership.default_price.unit_amount as number) / 100
            : (membership.secondary_price?.unit_amount as number) / 100}
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

      <ul
        role="list"
        className={twMerge(
          membership.isMostPopular ? "text-gray-300" : "text-gray-600",
          "mt-8 space-y-3 text-sm/6 sm:mt-10"
        )}
      >
        {membership.features.map((feature: Stripe.Product.MarketingFeature) => (
          <li key={feature.name} className="flex gap-x-3">
            <CheckIcon
              aria-hidden="true"
              className={twMerge(
                membership.isMostPopular ? "text-amber-400" : "text-amber-600",
                "h-6 w-5 flex-none"
              )}
            />

            {feature.name}
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-describedby={membership.id}
        className={twMerge(
          membership.isMostPopular
            ? "bg-amber-500 text-white shadow-sm hover:bg-amber-400 focus-visible:outline-amber-500"
            : "bg-black text-white shadow-sm hover:bg-slate-700 focus-visible:outline-slate-500",
          "mt-8 w-full block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
        )}
        onClick={() =>
          goTo(
            membership.name,
            isChecked
              ? (membership.secondary_price?.nickname as string)
              : (membership.default_price?.nickname as string),
            isChecked
              ? (membership.secondary_price?.unit_amount as number) / 100
              : (membership.default_price?.unit_amount as number) / 100,
            isChecked
              ? (membership.secondary_price?.id as string)
              : membership.default_price.id
          )
        }
      >
        Select
      </button>
    </div>
  );
};

export default MembershipItem;
