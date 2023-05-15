// import React from "react";

// const Navbar = () => {
//   return (
//     <nav className="bg-blue-500 py-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-white font-bold text-xl">
//           Campus Placement Portal
//         </div>
//         <ul className="flex">
//           <li className="ml-4">
//             <a href="/" className="text-white hover:text-gray-300">
//               Home
//             </a>
//           </li>
//           <li className="ml-4">
//             <a href="/" className="text-white hover:text-gray-300">
//               Features
//             </a>
//           </li>
//           <li className="ml-4">
//             <a href="/" className="text-white hover:text-gray-300">
//               About
//             </a>
//           </li>
//           <li className="ml-4">
//             <a href="/" className="text-white hover:text-gray-300">
//               Contact
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link to="/" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/features" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Features
                </Link>
                <Link to="/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
