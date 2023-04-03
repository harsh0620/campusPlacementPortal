import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/companies"
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Companies
                </Link>
                <Link
                  to="/jobs"
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Jobs
                </Link>
                <Link
                  to="/students"
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Students
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
                Campus Placement Portal
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Your Future Starts Here
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                consequat mi vitae metus porttitor, id cursus magna pretium.
                Quisque et enim at nulla finibus viverra. Curabitur a eros
                euismod, bibendum sapien a, interdum nunc. Praesent commodo urna
                nec libero pulvinar, sit amet commodo risus elementum.
              </p>
              <div className="mt-10">
                <Link
                  to="/jobs"
                  className="inline-block bg-indigo-600 py-3 px-8 border border-transparent rounded-md text-base font-medium text-white hover:bg-indigo-700"
                >
                  Find Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
