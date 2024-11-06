"use client";
import React from "react";
import LinkButton from "../button/link-button";

const Hero = () => {
  return (
    <section id="home" className="relative h-[90vh]  overflow-hidden">
      <video
        title="hero-video"
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Purley&apos;s <span className="text-amber-300">No.1</span> Personal
          Training Studio
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          We help busy men & women create new positive fitness habits and
          sustainable lifestyle changes in 6 weeks or less.
        </p>
        <LinkButton buttonText="Join Now" href="/join-now" />
      </div>
    </section>
  );
};

export default Hero;
