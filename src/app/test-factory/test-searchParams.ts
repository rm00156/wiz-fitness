import { useSearchParams } from "next/navigation";
import * as Factory from "factory.ts";

type SearchParams = ReturnType<typeof useSearchParams>;

export const testSearchParamsFactory = Factory.Sync.makeFactory<SearchParams>(
  () => {
    return {
      append: jest.fn(),
      delete: jest.fn(),
      entries: jest.fn(),

      forEach: jest.fn(),
      get: jest.fn(),
      getAll: jest.fn(),

      has: jest.fn(),
      keys: jest.fn(),
      set: jest.fn(),

      sort: jest.fn(),
      toString: jest.fn(),
      values: jest.fn(),
      [Symbol.iterator]: jest.fn(),
      size: 0,
    };
  }
);
