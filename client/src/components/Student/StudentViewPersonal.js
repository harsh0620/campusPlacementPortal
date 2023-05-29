import React from "react";
import StudentViewComp from "./StudentViewComp";
import { useAppContext } from "../../context/appContext";

const StudentViewPersonalComp = () => {
  const { specificStudent } = useAppContext();

  if (!specificStudent) {
    // Handle the case when specificStudent is not available
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between">
        {specificStudent && (
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <p className="text-gray-700 font-medium">Name:</p>
              <p>{specificStudent?.name}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Enrollment No:</p>
              <p>{specificStudent?.enrollmentNo}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Email:</p>
              <p>{specificStudent?.email}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Phone:</p>
              <p>{specificStudent?.personalDetails?.contactNo}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Aadhar No</p>
              <p>{specificStudent?.personalDetails?.aadharNo}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">College Name</p>
              <p>{specificStudent?.personalDetails?.collegeName}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">University Name</p>
              <p>{specificStudent?.personalDetails?.universityName}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Stream</p>
              <p>{specificStudent?.personalDetails?.stream}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Branch</p>
              <p>{specificStudent?.personalDetails?.program}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Date of Birth:</p>
              <p>{new Date(specificStudent?.personalDetails?.dob).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Gender</p>
              <p>{specificStudent?.personalDetails?.gender}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Father's Name</p>
              <p>{specificStudent?.personalDetails?.fatherName}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Mother's Name</p>
              <p>{specificStudent?.personalDetails?.motherName}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Current Address</p>
              <p>{specificStudent?.personalDetails?.currentAddress}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Permanent Address</p>
              <p>{specificStudent?.personalDetails?.permanentAddress}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Home City</p>
              <p>{specificStudent?.personalDetails?.homeCity}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Home State</p>
              <p>{specificStudent?.personalDetails?.homeState}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Home Country</p>
              <p>{specificStudent?.personalDetails?.homeCountry}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Home Area Pincode</p>
              <p>{specificStudent?.personalDetails?.pincode}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StudentViewPersonal = () => {
  return (
    <div>
      <StudentViewComp
        title="Personal"
        viewComponent={<StudentViewPersonalComp />}
      />
    </div>
  );
};

export default StudentViewPersonal;
