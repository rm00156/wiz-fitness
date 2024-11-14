import PaymentPage from "./payment-page";

const Page = async () => {
  const progressSections = await require("../../data/progress-sections.json");

  return (
    <>
      <PaymentPage progressSections={progressSections} />
    </>
  );
};

export default Page;
