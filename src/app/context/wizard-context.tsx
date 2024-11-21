"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type FormData = {
  membershipType?: string;
  membership?: string;
  paymentType?:
    | "12 Month Contract"
    | "One Time Payment"
    | "Rolling Subscription";
  total?: number;
  startDate?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  telephone?: string;
  postCode?: string;
  gender?: "Male" | "Female";
  disabledAccess?: "No" | "Yes";
  dateOfBirth?: string;
  priceId?: string;
};

export type WizardContextType = {
  formData: FormData;
  updateFormData: (stepData: Partial<FormData>) => void;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({});

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...stepData }));
  };

  return (
    <WizardContext.Provider value={{ formData, updateFormData }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
