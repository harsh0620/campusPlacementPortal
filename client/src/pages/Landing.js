import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaCheckCircle, FaCogs } from "react-icons/fa";
import {BsLightningCharge} from "react-icons/bs";
// import heroImage from '../images/hero-image.jpg';

const FeatureBox = ({ title, description, icon }) => {
  return (
    <div className="bg-blue-50 px-4 py-6 shadow rounded-lg">
      <div className="flex items-center">
        <div className="flex-shrink-0 text-blue-500">{icon}</div>
        <div className="ml-4">
          <h4 className="text-lg font-medium text-gray-900">{title}</h4>
          <p className="mt-2 text-base text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};
function Landing() {
  return (
    <div>
      <div>
        {/* Hero Section */}
        <div className="bg-blue-500 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-lg font-medium text-white uppercase">
              Welcome to
            </h2>
            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Campus Placement Portal CTAE
            </h1>
            <p className="mt-3 text-lg text-white">
              Find your dream job and launch your career with our platform.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/login"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                Features
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Find your dream job
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our platform offers a variety of features to help you find and
                apply for your dream job.
              </p>
            </div>
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <FeatureBox title={"Easy Placement Management"} description={"Our platform makes it easy for CTAE Placement Head and Student in placement process"} icon={<FaCheckCircle/>}/>
                <FeatureBox title={" Apply with Ease"} description={" Once you find a job you're interested in, applying is a breeze with our streamlined application process."} icon={<BsLightningCharge/>}/>
                <FeatureBox title={"Manage Applications"} description={"Keep track of all your job applications in one place with our easy-to-use application management system."} icon={<FaCogs/>}/>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-500 w-full mt-8">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-lg font-medium text-white uppercase">
                Ready to get started?
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Create your account today.
              </p>
              <p className="mt-3 text-lg text-white">
                Join our platform and start searching for your dream job.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="inline-flex rounded-md shadow">
                  <a
                    href="/login"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                  >
                    Create Account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center space-x-6 md:order-2">
              <a href="/" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="/" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="/" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="/" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
            <div className="flex items-center justify-center md:order-1">
              <p className="text-center text-base text-gray-400 flex items-center m-auto">
                © {new Date().getFullYear()} Campus Placement Portal All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Landing;
