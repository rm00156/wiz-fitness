import { renderHook, act } from "@testing-library/react";
import { WizardProvider, useWizard, FormData } from "./wizard-context";

describe("WizardProvider", () => {
  it("provides initial formData as an empty object", () => {
    const { result } = renderHook(() => useWizard(), {
      wrapper: WizardProvider,
    });
    expect(result.current.formData).toEqual({});
  });

  it("updates formData correctly using updateFormData", () => {
    const { result } = renderHook(() => useWizard(), {
      wrapper: WizardProvider,
    });
    const initialData: Partial<FormData> = {
      firstName: "John",
      email: "john@example.com",
    };

    act(() => {
      result.current.updateFormData(initialData);
    });

    expect(result.current.formData).toEqual(initialData);
  });

  it("merges new data with existing formData", () => {
    const { result } = renderHook(() => useWizard(), {
      wrapper: WizardProvider,
    });

    const initialData: Partial<FormData> = { firstName: "John" };
    const additionalData: Partial<FormData> = {
      lastName: "Doe",
      email: "john.doe@example.com",
    };

    act(() => {
      result.current.updateFormData(initialData);
      result.current.updateFormData(additionalData);
    });

    expect(result.current.formData).toEqual({
      ...initialData,
      ...additionalData,
    });
  });

  it("throws error if useWizard is used outside of WizardProvider", () => {
    expect(() => {
      renderHook(() => useWizard());
    }).toThrow("useWizard must be used within a WizardProvider");
  });
});
