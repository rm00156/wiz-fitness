import { Membership } from "@/app/constants";
import { factory } from "node-factory";
import * as Factory from "factory.ts";

export const membershipsFactory = factory<Membership[]>(() => [
  {
    id: "1",
    name: "name",
    membershipType: "Daily Passes",
    price1: "100",
    price2: "150",
    isMostPopular: false,
    features: [
      { name: "Gym", access: true },
      { name: "Fitness Classes", access: true },
      { name: "Unrestricted Access", access: true },
      { name: "Sauna Access", access: true },
      { name: "Monthly Guest Pass", access: true },
      { name: "Free Towel on every visit", access: true },
      { name: "10% discount in shop", access: true },
      { name: "10% discount on Kids sessions", access: true },
      { name: "Access to exclusive digital content", access: true },
    ],
  },
]);

export const membershipFactory = Factory.Sync.makeFactory<Membership>(() => {
  return {
    id: "1",
    name: "name",
    membershipType: "Daily Passes",
    price1: "100",
    price2: "150",
    isMostPopular: false,
    features: [
      { name: "Gym", access: true },
      { name: "Fitness Classes", access: true },
      { name: "Unrestricted Access", access: true },
      { name: "Sauna Access", access: true },
      { name: "Monthly Guest Pass", access: true },
      { name: "Free Towel on every visit", access: true },
      { name: "10% discount in shop", access: true },
      { name: "10% discount on Kids sessions", access: true },
      { name: "Access to exclusive digital content", access: true },
    ],
  };
});
