import React from "react";

function HeroSection() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="bg-indigo-700 lg:p-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Get all the features you need in one place</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
            </p>
          </div>
          <div className="flex lg:p-12">
            <img className="mx-auto h-96 w-auto" src="https://tailwindui.com/img/hero-images/hero-1.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
