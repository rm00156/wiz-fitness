import { Testimonial } from "@/app/constants";
import Image from "next/image";

type TestimonialCardItemProps = {
  content: Testimonial;
};

const TestimonialCardItem = ({ content }: TestimonialCardItemProps) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative  rounded-lg border border-gray-300 overflow-hidden shadow-lg">
        <div className="flex h-full">
          <div className="w-1/2 h-full">
            <Image
              width={500}
              height={500}
              src={content.imagePath}
              alt="testimonial"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 h-full flex items-center justify-center bg-gray-100">
            <div className="px-5 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10%"
                height="10%"
                viewBox="0 0 22 16"
                fill="none"
              >
                <path
                  d="M11.6134 14.0758L16.689 0.341797L21.9437 1.71519L18.4207 15.9269L11.6134 14.0758ZM0.267944 14.0758L5.34354 0.341797L10.658 1.71519L7.07522 15.9269L0.267944 14.0758Z"
                  fill="#fbbe24"
                ></path>
              </svg>

              <div className="grid grid-cols-1 text-black">
                <p className="text-center md:text-md lg:text-md  text-xs p-4">
                  {content.quote}
                </p>

                <p className="text-center md:text-md font-bold lg:text-md text-xs p-4">
                  {content.by}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCardItem;
