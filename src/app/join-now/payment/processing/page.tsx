"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const getSessionStatus = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get("session_id");
      const response = await fetch(
        `/api/checkout/session/retrieve?session_id=${sessionId}`
      );
      const session = await response.json();

      if (session.status === "open") {
        return router.push("/join-now/payment?error=true");
      }

      return router.push("/account/reireoeiroeieoerorei");
    };

    getSessionStatus();
  }, [router]);
  return (
    <div className="animate-pulse flex items-center justify-center h-[90vh]">
      <div className="grid grid-cols-1">
        <div className="mx-auto text-xl">
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-amber-600" />
        </div>
        <div className="mx-auto text-2xl pt-3">Payment processing...</div>
      </div>
    </div>
  );
};

export default Page;
