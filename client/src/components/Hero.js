import React from "react";
import heroImage from "../assets/images/hero.png";

const Hero = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto flex items-center justify-between py-10">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to our Campus Placement Portal
          </h1>
          <p className="text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam
            dictum tellus, at egestas felis blandit sed.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Register Now
          </button>
        </div>
        <div className="w-1/2">
          <img src={heroImage} alt="hero" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
