import LinkButton from "../button/link-button";
import Image from "next/image";

const WellbeingSection = () => {
  return (
    <div
      id="wellness"
      className=" bg-slate-100 pt-[120px] pb--[120px] sm:pb-[80px] sm:pt-[80px] px-5 "
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
        <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
          <div className="mt-5 hidden md:block ">
            <LinkButton buttonText="Time to relax" href="/wellbeing" />
          </div>
          <h1 className="hidden md:block text-sm md:text-lg mt-2 leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">
            Escape the hustle and bustle in our serene sauna, designed for
            ultimate relaxation and stress relief. After rejuvenating your mind
            and body, join us for our engaging social events, where you can
            connect with fellow members over a refreshing beverage—from aromatic
            coffees to nutritious fitness drinks. Embrace the perfect blend of
            relaxation and community at our gym!
          </h1>
          <p className="mt-1 text-2xl  text-white sm:text-slate-900 md:text-4xl dark:sm:text-white">
            Wellness
          </p>
        </div>
        <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
          <Image
            width={500}
            height={500}
            src="/sauna1.webp"
            alt=""
            className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full"
            loading="lazy"
          />
          <Image
            width={500}
            height={500}
            src="/wellbeing2.jpg"
            alt=""
            className="hidden w-full h-52 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32"
            loading="lazy"
          />
          <Image
            width={500}
            height={500}
            src="/wellbeing3.webp"
            alt=""
            className="hidden w-full h-52 object-cover rounded-lg md:block lg:row-start-2 lg:col-span-2 lg:h-32"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default WellbeingSection;
