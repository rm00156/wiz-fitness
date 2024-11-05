import Image from "next/image";
const FooterSection = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="bg-black text-white py-8">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Image
              width={500}
              height={500}
              className="w-1/6"
              src="/logo_black.png"
              alt=""
            />
            <p className="text-gray-400 mt-5">
              We help busy men & women create new positive fitness habits and
              sustainable lifestyle changes in 6 weeks or less.
            </p>
            <div className="flex space-x-4 mt-5">
              <a
                href="https://www.facebook.com"
                target="_blank"
                className="text-slate-400 hover:text-slate-100"
              >
                <i className="fa-brands fa-facebook text-2xl"></i>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                className="text-slate-400 hover:text-slate-100"
              >
                <i className="fa-brands fa-youtube text-2xl"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                className="text-slate-400 hover:text-slate-100"
              >
                <i className="fa-brands fa-instagram text-2xl"></i>
              </a>

              <a
                href="https://www.x.com"
                target="_blank"
                className="text-slate-400 hover:text-slate-100"
              >
                <i className="fa-brands fa-x-twitter text-2xl"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Membership</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="/memberships"
                  className="hover:underline hover:text-gray-300"
                >
                  Memberships
                </a>
              </li>
              <li>
                <a
                  href="/enquire-about-membership"
                  className="hover:underline hover:text-gray-300"
                >
                  Enquire about membership
                </a>
              </li>
              <li>
                <a
                  href="/book-a-tour"
                  className="hover:underline hover:text-gray-300"
                >
                  Book a tour
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <div className="flex space-x-4">
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="/about"
                    className="hover:underline hover:text-gray-300"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="hover:underline hover:text-gray-300"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/contact-us"
                    className="hover:underline hover:text-gray-300"
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Key Information</h3>
            <div className="flex space-x-4">
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="/membership-terms-and-conditions"
                    className="hover:underline hover:text-gray-300"
                  >
                    Membership terms and conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/website-terms-and-conditions"
                    className="hover:underline hover:text-gray-300"
                  >
                    Website terms and conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/policies-and-documents"
                    className="hover:underline hover:text-gray-300"
                  >
                    Policies and documents
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          <p>&copy; {year} WizFit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
