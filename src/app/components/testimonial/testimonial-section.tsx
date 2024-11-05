import { Testimonial } from "@/app/constants";
import TestimonialCardItem from "./testimonial-card-item";

export type TestimonialProps = {
  testimonials: Testimonial[];
};

export default function TestimonialSection({ testimonials }: TestimonialProps) {
  return (
    <section className="relative isolate overflow-hidden  bg-slate-100 px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 " />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl ">
        <div className="grid grid-col-1">
          <p className="text-center text-2xl md:text-4xl text-black">
            Member experiences
          </p>
          <p className="text-center mt-3 text-slate-500 text-xl md:text-2xl">
            Hear what our members love about WizFit
          </p>
        </div>

        <div className="py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialCardItem key={index} content={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
