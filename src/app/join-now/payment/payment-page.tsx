"use client";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import ProgressSection, {
  ProgressSteps,
} from "../components/progress-section/progress-section";
import { useWizard } from "../../context/wizard-context";
import { useEffect, useState } from "react";
import Alert from "../../components/alert/alert";
import { useSearchParams } from "next/navigation";

type PaymentPageProps = {
  progressSections: ProgressSteps[];
  stripeKey: string;
};

const PaymentPage = ({ progressSections, stripeKey }: PaymentPageProps) => {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const { formData } = useWizard();
  const [clientSecret, setClientSecret] = useState(null);
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

  const priceId = formData.priceId as string;
  const membershipType = formData.membershipType;

  useEffect(() => {
    async function createCheckoutSession() {
      const res = await fetch("/api/checkout/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          mode: membershipType === "Daily Pass" ? "payment" : "subscription",
        }),
      });
      const data = await res.json();
      setClientSecret(data.client_secret);
    }
    const initializeStripe = async () => {
      const stripe = await loadStripe(stripeKey, {});
      setStripePromise(stripe);
    };

    initializeStripe();

    createCheckoutSession();
  }, [membershipType, priceId, stripeKey]);

  const options = {
    clientSecret,
  };
  return (
    <>
      {errorParam && (
        <div className="flex justify-center">
          <Alert
            title={"Payment Error"}
            message="There was an issue with your payment, please try again"
          ></Alert>
        </div>
      )}
      <ProgressSection
        title={"Payment"}
        step={3}
        progressSections={progressSections}
      />

      <div className="py-6">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </>
  );
};

export default PaymentPage;
