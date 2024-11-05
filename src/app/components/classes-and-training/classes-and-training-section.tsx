import { HomeMembership } from "@/app/constants";
import Image from "next/image";

export type ClassesAndTrainingSectionProps = {
  memberships: HomeMembership[];
};

const ClassesAndTrainingSection = ({
  memberships,
}: ClassesAndTrainingSectionProps) => {
  return (
    <div
      id="classes"
      className=" pt-[120px] pb-[70px] sm:pt-[150px] bg-white px-5 mx-auto"
    >
      <div className="text-center mx-auto text-black max-w-4xl">
        <p className="text-2xl md:text-4xl  mb-5">
          Your new destination for living well
        </p>

        <p className="text-xl md:text-2xl mb-4 ">
          Imagine a place where you can switch off from the world and tune into
          you. A space where you can create a different wellness experience each
          time you visit.
        </p>

        <p className="text-xl md:text-2xl mb-4 ">
          Start reimagining your everyday at WizFit.
        </p>
      </div>
      <div className="pt-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {memberships.map((membership, index) => (
          <a key={index} href={membership.href}>
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <Image
                  width={500}
                  height={500}
                  src={membership.src}
                  alt="Description"
                  className="w-full h-64 object-cover rounded-lg transform transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-2 left-2 p-2  bg-opacity-60 text-white text-2xl text-bold">
                {membership.title}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ClassesAndTrainingSection;
