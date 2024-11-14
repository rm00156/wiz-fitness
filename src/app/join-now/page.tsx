import JoinNow from "./join-now-page";

const Page = async () => {
  const dailyPasses = await require("../data/daily-pass.json");
  const memberships = await require("../data/membership.json");

  const progressSections = await require("../data/progress-sections.json");

  return (
    <JoinNow
      progressSections={progressSections}
      dailyPasses={dailyPasses}
      monthlies={memberships}
    />
  );
};

export default Page;
