export type SectionItem = {
  id: string;
  text: string;
};

export type Section = {
  id: string;
  items: SectionItem[];
};

export type Testimonial = {
  imagePath: string;
  quote: string;
  by: string;
};

export type Feature = {
  name: string;
  access: boolean;
};

export type Membership = {
  id: string;
  name: string;
  membershipType: "Daily Passes" | "Monthly";
  price1: string;
  price2?: string;
  isMostPopular?: boolean;
  features: Feature[];
};

export type HomeMembership = {
  src: string;
  title: string;
  href: string;
};
