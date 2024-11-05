import { Testimonial } from "@/app/constants";
import { factory } from "node-factory";

export const testimonialsFactory = factory<Testimonial[]>(() => [
  { imagePath: "/imagePath", quote: "quote", by: "by" },
]);
