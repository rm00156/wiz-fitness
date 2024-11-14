import { useRouter } from "next/navigation";
import * as Factory from "factory.ts";

type Router = ReturnType<typeof useRouter>;

export const testRouterFactory = Factory.Sync.makeFactory<Router>(() => {
  return {
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  };
});
