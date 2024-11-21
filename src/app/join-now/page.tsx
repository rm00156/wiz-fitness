import { getProductsList } from "../stripe/stripe-helper";
import JoinNow from "./join-now-page";

const Page = async () => {
  const progressSections = await require("../data/progress-sections.json");

  const { dailyProducts, membershipProducts } = await getProductsList();

  return (
    <JoinNow
      progressSections={progressSections}
      dailyPasses={dailyProducts}
      monthlies={membershipProducts}
    />
  );
};

export default Page;
