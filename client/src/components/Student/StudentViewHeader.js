
import { useAppContext } from "../../context/appContext";
import { FaCheckCircle, FaFileDownload, FaTimes, FaUserCircle } from "react-icons/fa";
import { ExportJsonCsv } from "react-export-json-csv";
import { IoMdDocument } from 'react-icons/io';
const StudentViewHeader = ({handleCapture,componentRef}) => {
  const { specificStudent, getRandomColor, user,verifyStudent } = useAppContext();

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
  const handleVerify=()=>{
    if(window.confirm(`Are you sure you want to ${specificStudent?.applicationStatus===true?"unverify":"verify"} this student?`)){
      verifyStudent(specificStudent?._id);
    }
    setTimeout(() => {
    window.location.reload(false);
    }, 4500);
  }
  return (
    <div className="shadow bg-white w-full rounded-xl flex flex-col">
      {/* //Details Section */}
      <div className="flex flex-col relative w-full">
        <div
          className={`rounded-t-xl mb-20 ${getRandomColor()}`}
          style={{ minHeight: "100px" }}
        ></div>
        <div className="flex flex-row absolute top-0 right-0 mt-4 mr-4">
          {user?.role==="admin" &&
        <button className="border bg-white  px-4 md:py-2 py-1 rounded-lg mr-2 text-sm font-medium" onClick={handleVerify} >
            {specificStudent?.applicationStatus==="verified"?<FaTimes title="Unverify Student"/>:<FaCheckCircle title="Verify Student"/>}

          </button>
}
          <button className="flex flex-col justify-center items-center mx-auto border bg-white px-4 py-2 rounded-lg mr-2 text-sm font-medium" onClick={handleCapture}>
            <FaFileDownload title="Download PDF"/>
            <span className="font-bold text-xs">PDF</span>
          </button>
          <button
            className="flex flex-col justify-center items-center mx-auto border bg-white px-4 py-2 rounded-lg text-sm font-medium"
          >
        
          <FaFileDownload title="Download CSV"/>
            <span className="font-bold text-xs">CSV</span>
          </button>
        </div>

        <div className="flex flex-col absolute md:mt-6 mt-12 ml-4">
          {specificStudent?.personalDetails?.profileImage ||
          specificStudent?.personalDetails?.profileImage.length > 0 ? (<>
            <img
              src={specificStudent?.personalDetails?.profileImage}
              alt={specificStudent?.personalDetails?.profileImage}
              className="md:w-32 md:h-32 w-20 h-20 rounded-full m-4 bg-white p-1"
            />
             <div className="rounded-full w-4 h-4 md:ml-[105px] ml-[75px] mt-[-55px]">
           {specificStudent?.applicationStatus==="verified" ? <FaCheckCircle className=" rounded-full md:text-3xl text-3xl font-bold bg-blue-500 text-white" title="applicationStatus"/>:
            <FaTimes className=" rounded-full md:text-3xl text-xl font-bold bg-red-500 text-white" title="UnapplicationStatus"/>}
            </div>
            </>
          ) : (
            <>
            <FaUserCircle className="md:w-32 md:h-32 w-20 h-20 rounded-full m-4 bg-white p-1" />
            <div className="rounded-full w-4 h-4 md:ml-[105px] ml-[75px] mt-[-55px]">
           {specificStudent?.applicationStatus==="verified" ? <FaCheckCircle className=" rounded-full md:text-3xl text-3xl font-bold bg-blue-500 text-white" title="applicationStatus"/>:
            <FaTimes className=" rounded-full md:text-3xl text-xl font-bold bg-red-500 text-white" title="UnapplicationStatus"/>}
            </div>
            </>
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
