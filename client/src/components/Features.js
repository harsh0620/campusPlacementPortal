import React from "react";
import featureImage1 from "../assets/images/feature-image-1.png";
import featureImage2 from "../assets/images/feature-image-2.png";
import featureImage3 from "../assets/images/feature-image-3.png";

const Features = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8">Features</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={featureImage1} alt="feature-1" className="w-full" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Job Opportunities</h3>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  aliquam dictum tellus, at egestas felis blandit sed.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={featureImage2} alt="feature-2" className="w-full" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Career Guidance</h3>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  aliquam dictum tellus, at egestas felis blandit sed.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={featureImage3} alt="feature-3" className="w-full" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Resume Building</h3>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  aliquam dictum tellus, at egestas felis blandit sed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
