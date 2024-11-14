import ProgressSection, {
  ProgressSteps,
} from "../components/progress-section/progress-section";

type PaymentPageProps = {
  progressSections: ProgressSteps[];
};

const PaymentPage = ({ progressSections }: PaymentPageProps) => {
  return (
    <>
      <ProgressSection
        title={"Payment"}
        step={3}
        progressSections={progressSections}
      />
    </>
  );
};

export default PaymentPage;
