
import { useAppContext } from "../../context/appContext";
import { FaUserCircle } from "react-icons/fa";
import { ExportJsonCsv } from "react-export-json-csv";

const StudentViewHeader = ({handleCapture,componentRef}) => {
  const { specificStudent, getRandomColor, user } = useAppContext();

  const dataHeaders={
    'placementDetails.applied': 'Applied',
    'placementDetails.selected': 'Selected',
    'placementDetails.appliedIn': 'Applied In',
    'personalDetails.profileImage': 'Profile Image',
    'personalDetails.dob': 'Date of Birth',
    'personalDetails.gender': 'Gender',
    'personalDetails.contactNo': 'Contact Number',
    'personalDetails.aadharNo': 'Aadhar Number',
    'personalDetails.program': 'Program',
    'personalDetails.stream': 'Stream',
    'personalDetails.collegeName': 'College Name',
    'personalDetails.universityName': 'University Name',
    'personalDetails.fatherName': 'Father\'s Name',
    'personalDetails.motherName': 'Mother\'s Name',
    'personalDetails.currentAddress': 'Current Address',
    'personalDetails.permanentAddress': 'Permanent Address',
    'personalDetails.homeCity': 'Home City',
    'personalDetails.homeState': 'Home State',
    'personalDetails.homeCountry': 'Home Country',
    'personalDetails.pincode': 'Pincode',
    'professionalDetails.experiences': 'Experiences',
    'professionalDetails.projects': 'Projects',
    'professionalDetails.skills': 'Skills',
    'professionalDetails.certifications': 'Certifications',
    'professionalDetails.others': 'Other Details',
    'professionalDetails.links': 'Links',
    'documents.resume': 'Resume',
    'documents.photo': 'Photo',
    'documents.aadhar': 'Aadhar Card',
    'documents.marksheets': 'Marksheets',
    'role': 'Role',
    'applicationStatus': 'Application Status',
    'enrollmentNo': 'Enrollment Number',
    'name': 'Name',
    'email': 'Email',
    'academicDetails': 'Academic Details',
  };
  const headers=[
    {
        key:'name',
        name:'Name'
    },
    {
        key:'enrollmentNo',
        name:'Enrollment Number'
    },
    {
        key:'email',
        name:'Email'
    },
    {
        key:'role',
        name:'Role'
    },
    {
        key:'applicationStatus',
        name:'Application Status'
    },
    {
        key:'academicDetails',
        name:'Academic Details'
    },
    {
        key:'placementDetails.applied',
        name:'Applied'
    },
    {
        key:'placementDetails.selected',
        name:'Selected'
    },
    {
        key:'placementDetails.appliedIn',
        name:'Applied In'
    },
    {
        key:'personalDetails.profileImage',
        name:'Profile Image'
    },
    {
        key:'personalDetails.dob',
        name:'Date of Birth'
    }
  ]
  return (
    <div className="shadow bg-white w-full rounded-xl flex flex-col">
      {/* //Details Section */}
      <div className="flex flex-col relative w-full">
        <div
          className={`rounded-t-xl mb-20 ${getRandomColor()}`}
          style={{ minHeight: "100px" }}
        ></div>
        <div className="flex flex-row absolute top-0 right-0 mt-4 mr-4">
          <button className="border bg-white px-4 py-2 rounded-lg mr-2 text-sm font-medium" onClick={handleCapture}>
            Export as PDF
          </button>
          <button
            className="border bg-white px-4 py-2 rounded-lg text-sm font-medium"
          >
          <ExportJsonCsv headers={headers} items={specificStudent}>
            Export as CSV
            </ExportJsonCsv>
          </button>
        </div>

        <div className="flex flex-col absolute md:mt-6 mt-12 ml-4">
          {specificStudent?.personalDetails?.profileImage ||
          specificStudent?.personalDetails?.profileImage.length > 0 ? (
            <img
              src={specificStudent?.personalDetails?.profileImage}
              alt={specificStudent?.personalDetails?.profileImage}
              className="md:w-32 md:h-32 w-20 h-20 rounded-full m-4 bg-white p-1"
            />
          ) : (
            <FaUserCircle className="w-32 h-32 rounded-full m-4 bg-white p-1" />
          )}
        </div>
        <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start p-4">
          <div className="flex flex-col">
            <div className="text-2xl font-bold">{specificStudent?.name}</div>
            <div className="text-lg font-medium">
              {specificStudent?.enrollmentNo}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="text-lg font-medium">
                {specificStudent?.personalDetails?.stream}
              </div>
              <div className="text-lg font-medium">
                {specificStudent?.personalDetails?.program}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentViewHeader;
