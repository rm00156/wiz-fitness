import React from "react";

import Hero from "./components/hero/hero-section";
import ClassesAndTrainingSection from "./components/classes-and-training/classes-and-training-section";
import WellbeingSection from "./components/wellbeing/wellbeing-section";
import TestimonialSection from "./components/testimonial/testimonial-section";
import MembershipsSection from "./components/memberships/memberships-section";
import { HomeMembership } from "./constants";
import { getProductsList } from "./stripe/stripe-helper";

const Home = async () => {
  const { membershipProducts } = await getProductsList();
  const homeMemberships =
    (await require("./data/home-membership.json")) as HomeMembership[];

  const testimonials = await require("./data/testimonials.json");
  return (
    <>
      <Hero />

      <ClassesAndTrainingSection memberships={homeMemberships} />
      <WellbeingSection />
      <div
        id="memberships"
        className="relative isolate bg-white px-6 pt-[120px] pb-[120px] sm:pb-[80px] sm:pt-[80px] lg:px-8"
      >
        <MembershipsSection
          memberships={membershipProducts}
          isDisplayCheckBox={true}
          title="Memberships"
        />
      </div>
      <TestimonialSection testimonials={testimonials} />
    </>
  );
};

export default Home;
