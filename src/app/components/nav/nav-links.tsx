"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const navigation = [
  { name: "Classes and Training", href: "/classes-and-training" },

  { name: "Wellness", href: "/wellness" },
  { name: "Memberships", href: "/memberships" },
  { name: "About", href: "/about" },
  { name: "Contact us", href: "/contact-us" },
  { name: "Shop", href: "/shop" },
];

export function NavLinks() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="fixed  h-[10vh] top-0 left-0 flex w-full items-center bg-white justify-between p-6 lg:px-8 w-50"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Wiz Fitness</span>
              <Image
                width={500}
                height={500}
                alt=""
                src="https://static.wixstatic.com/media/5924bf_c74f2a8b94674aca859d49034b7ad826~mv2.png/v1/crop/x_885,y_1188,w_1281,h_635/fill/w_123,h_61,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/WIZ%20FIT%202021_%20(Black).png"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                className="cursor-pointer  leading-6 text-gray-900"
                href={item.href}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:ml-8 lg:flex lg:items-center lg:border-l lg:border-slate-900/15 lg:pl-8">
            <a href="/login">Log in</a>
            <a
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-black text-white hover:bg-slate-700 -my-2.5 ml-8"
              href="/join-now"
            >
              <span>Join Now</span>
            </a>
          </div>
        </nav>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5">
                <span className="sr-only">Wiz Fitness</span>
                <Image
                  width={500}
                  height={500}
                  alt=""
                  src="https://static.wixstatic.com/media/5924bf_c74f2a8b94674aca859d49034b7ad826~mv2.png/v1/crop/x_885,y_1188,w_1281,h_635/fill/w_123,h_61,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/WIZ%20FIT%202021_%20(Black).png"
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>

                <div className="py-6">
                  <a
                    href="/join-now"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Join Now
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
