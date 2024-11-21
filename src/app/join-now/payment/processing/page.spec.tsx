import { WizardProvider } from "../../../context/wizard-context";
import { act, render, waitFor } from "@testing-library/react";
import Page from "./page";
import fetchMock from "jest-fetch-mock";
import { useRouter } from "next/navigation";
import { testRouterFactory } from "../../../test-factory/test-router";

jest.mock("next/navigation", () => {
  return { useRouter: jest.fn() };
});

jest.mock("../../../context/wizard-context", () => {
  return {
    ...jest.requireActual("../../../context/wizard-context"),
    useWizard: jest.fn(),
  };
});
fetchMock.enableMocks();
const originalURLSearchParams = global.URLSearchParams;
global.URLSearchParams = jest.fn().mockImplementation((queryString) => {
  const params = new originalURLSearchParams(queryString);

  return {
    get: () => "session_id",
    getAll: jest.fn((key: string) => params.getAll(key)),
    has: jest.fn((key: string) => params.has(key)),
    append: jest.fn((key: string, value: string) => params.append(key, value)),
    delete: jest.fn((key: string) => params.delete(key)),
    entries: jest.fn(() => params.entries()),
    keys: jest.fn(() => params.keys()),
    values: jest.fn(() => params.values()),
    [Symbol.iterator]: jest.fn(() => params[Symbol.iterator]()),
  };
});

describe("page", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should router to account page if session status is complete", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ status: "complete" }));

    const push = jest.fn();
    jest.mocked(useRouter).mockReturnValue(testRouterFactory.build({ push }));

    act(() => {
      render(
        <WizardProvider>
          <Page />
        </WizardProvider>
      );
    });

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/account/reireoeiroeieoerorei");
    });
  });

  it("should router back to payment page if session status is open", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ status: "open" }));

    const push = jest.fn();
    jest.mocked(useRouter).mockReturnValue(testRouterFactory.build({ push }));

    act(() => {
      render(
        <WizardProvider>
          <Page />
        </WizardProvider>
      );
    });

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/join-now/payment?error=true");
    });
  });
});
