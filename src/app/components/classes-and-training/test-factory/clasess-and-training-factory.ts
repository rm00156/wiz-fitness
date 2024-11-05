import { factory } from "node-factory";

export const classesAndTrainingFactory = factory<HomeMembership[]>(() => [
  { src: "src", title: "title", href: "href" },
]);
