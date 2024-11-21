import PaymentPage from "./payment-page";

const Page = async () => {
  const progressSections = await require("../../data/progress-sections.json");
  const stripeKey = process.env.stripe_private_key as string;
  return (
    <>
      <PaymentPage progressSections={progressSections} stripeKey={stripeKey} />
    </>
  );
};

export default Page;
