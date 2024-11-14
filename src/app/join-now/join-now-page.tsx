"use client";
import { Membership } from "../constants";
import MembershipSection from "./components/membership-section/membership-section";
import ProgressSection, {
  ProgressSteps,
} from "./components/progress-section/progress-section";

type JoinNowProps = {
  progressSections: ProgressSteps[];
  dailyPasses: Membership[];
  monthlies: Membership[];
};

const JoinNow = ({
  progressSections,
  dailyPasses,
  monthlies,
}: JoinNowProps) => {
  return (
    <div className="mt-5">
      <ProgressSection
        title={"Choose Your Memebership"}
        step={1}
        progressSections={progressSections}
      />
      <MembershipSection dailyPasses={dailyPasses} monthlies={monthlies} />
    </div>
  );
};

export default JoinNow;
