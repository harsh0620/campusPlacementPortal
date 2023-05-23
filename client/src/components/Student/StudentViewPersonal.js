import React from 'react'
import StudentViewComp from './StudentViewComp'
import { useAppContext } from '../../context/appContext';

const StudentViewPersonalComp = () => {
    const { specificStudent } = useAppContext();
  
    if (!specificStudent) {
      // Handle the case when specificStudent is not available
      return null;
    }
  
    const { name, enrollmentNo, email, personalDetails } = specificStudent;
    const { contactNo, aadharNo,collegeName,stream,program,currentAddress,dob,fatherName,motherName,gender,homeCity,homeCountry,homeState,permanentAddress,pincode,universityName } = personalDetails;
  
    return (
<div className='flex flex-col'>
            <div className='flex flex-col justify-between'>
        {!specificStudent && <p>No personal data</p>}
        {specificStudent &&
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <p className="text-gray-700 font-medium">Name:</p>
            <p>{name}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Enrollment No:</p>
            <p>{enrollmentNo}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Email:</p>
            <p>{email}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Phone:</p>
            <p>{contactNo}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Aadhar No</p>
            <p>{aadharNo}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">College Name</p>
            <p>{collegeName}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">University Name</p>
            <p>{universityName}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Stream</p>
            <p>{stream}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Branch</p>
            <p>{program}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Date of Birth:</p>
            <p>{dob}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Gender</p>
            <p>{gender}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Father's Name</p>
            <p>{fatherName}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Mother's Name</p>
            <p>{motherName}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Current Address</p>
            <p>{currentAddress}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Permanent Address</p>
            <p>{permanentAddress}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Home City</p>
            <p>{homeCity}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Home State</p>
            <p>{homeState}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Home Country</p>
            <p>{homeCountry}</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Home Area Pincode</p>
            <p>{pincode}</p>
          </div>
        </div>
}
</div>
      </div>
    );
  };
  

const StudentViewPersonal = () => {
  return (
    <div>
    <StudentViewComp title="Personal Information" viewComponent={<StudentViewPersonalComp/>}/>
  </div>
  )
}

export default StudentViewPersonal