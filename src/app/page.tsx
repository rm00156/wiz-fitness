import React from "react";

import Hero from "./components/hero/hero-section";
import ClassesAndTrainingSection from "./components/classes-and-training/classes-and-training-section";
import WellbeingSection from "./components/wellbeing/wellbeing-section";
import TestimonialSection from "./components/testimonial/testimonial-section";
import MemebershipsSection from "./components/memberships/memberships-section";
import { HomeMembership, Membership } from "./constants";

const Home = async () => {
  const memberships = (await require("./data/membership.json")) as Membership[];
  const homeMemberships =
    (await require("./data/home-membership.json")) as HomeMembership[];

  const testimonials = await require("./data/testimonials.json");
  return (
    <>
      <Hero />

      <ClassesAndTrainingSection memberships={homeMemberships} />
      <WellbeingSection />
      <MemebershipsSection memberships={memberships} />
      <TestimonialSection testimonials={testimonials} />
    </>
  );
};

export default Home;
