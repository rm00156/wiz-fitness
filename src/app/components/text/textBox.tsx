import { SectionItem } from "@/app/constants";
import { ReactNode } from "react";

type TextBoxProps = {
  items: SectionItem[];
  button?: ReactNode;
};

const TextBox = ({ items, button }: TextBoxProps) => {
  return (
    <div className="container  pt-[100px] pb-10 sm:pt-[80px] px-5 mx-auto mt-12 mb-10 text-center">
      {items.map((item) => (
        <p className="mb-4" key={item.id}>
          {item.text}
        </p>
      ))}

      {button && <div className="mt-5">{button}</div>}
    </div>
  );
};

export default TextBox;
