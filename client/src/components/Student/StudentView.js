import React, { useRef,useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import StudentViewHeader from './StudentViewHeader'
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import StudentViewPersonal from './StudentViewPersonal';
import StudentViewExperience from './StudentViewExperience';
import StudentViewEducation from './StudentViewEducation';
import StudentViewSkill from './StudentViewSkill';
import StudentViewProject from './StudentViewProject';
import StudentViewCertification from './StudentViewCertification';
import StudentViewLink from './StudentViewLink';
import Loader from '../Loader';
import StudentViewAbout from './StudentViewAbout';
import StudentViewDocuments from './StudentViewDocuments';
import CompanyHireStudent from '../Company/CompanyHireStudent';

const StudentView = ({userType}) => {
  const {getStudentByIdByStudent,getStudentByIdByAdmin,getStudentByIdByCompany,user,isLoading}=useAppContext();
    const params=useParams();
    const {id}=params;
    const componentRef = useRef(null);

    const handleCapture = () => {
      const component = componentRef.current;
      html2canvas(component, { scrollY: -window.scrollY }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height, null, 'FAST');
        pdf.save('component.pdf');
      });
    };
    useEffect(() => {
      console.log(userType);
      if(user?.role==="student"){
        getStudentByIdByStudent(id);
      }
      else if(user?.role==="admin")
      {
        getStudentByIdByAdmin(id);
      }
      else if(user?.role==="company")
      {
        getStudentByIdByCompany(id);
      }
      // eslint-disable-next-line
    }, [])

    if(isLoading) return <Loader backgroundColor="text-gray-300" loaderColor="fill-black" text="Loading"/>
  return (
    <div className='pb-16' ref={componentRef}>
        <StudentViewHeader handleCapture={handleCapture} componentRef={componentRef}/>
        <StudentViewPersonal/>
        <StudentViewAbout/>
        <StudentViewExperience/>
        <StudentViewEducation/>
        <StudentViewProject/>
        <StudentViewSkill/>
        <StudentViewCertification/>
        <StudentViewLink/>
        <StudentViewDocuments/>
        {user?.role==="company" && <CompanyHireStudent/>}
    </div>
  )
}

export default StudentView