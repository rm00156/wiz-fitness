import { Membership } from "@/app/constants";
import { factory } from "node-factory";

export const membershipsFactory = factory<Membership[]>(() => [
  {
    id: "1",
    name: "name",
    href: "href",
    contractPrice: 100,
    rollingPrice: 150,
    description: "description",
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
