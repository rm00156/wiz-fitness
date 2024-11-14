import YourDetails from "./your-details-page";

const Page = async () => {
  const progressSections = await require("../../data/progress-sections.json");
  return (
    <div>
      <YourDetails progressSections={progressSections} />
    </div>
  );
};

export default Page;
