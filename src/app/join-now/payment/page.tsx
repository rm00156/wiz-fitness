import { Suspense } from "react";
import PaymentPage from "./payment-page";

const Page = async () => {
  const progressSections = await require("../../data/progress-sections.json");
  const stripeKey = process.env.stripe_private_key as string;
  return (
    <>
      <Suspense>
        <PaymentPage
          progressSections={progressSections}
          stripeKey={stripeKey}
        />
      </Suspense>
    </>
  );
};

export default Page;
