import React from 'react'
import ActionCard from '../ActionCard'
import StudentProfilePersonal from './StudentProfilePersonal'
import { FaBriefcase, FaFile, FaGraduationCap, FaInfoCircle, FaUser } from 'react-icons/fa'
import StudentProfileAcademic from './StudentProfileAcademic'
import StudentProfileProfessional from './StudentProfileProfessional'
import StudentProfileDocument from './StudentProfileDocument'
import StudentProfileBasic from './StudentProfileBasic'

const StudentProfile = () => {
  return (
    <div className="bg-white w-full pb-24">
      <ActionCard
        title={"Update Basic Details"}
        bgColor={"bg-gray-500"}
        icon={<FaInfoCircle />}
        dropDownComponent={<StudentProfileBasic />}
      />
      <ActionCard
        title={"Update Personal Details"}
        bgColor={"bg-gray-500"}
        icon={<FaUser />}
        dropDownComponent={<StudentProfilePersonal />}
      />
      <ActionCard
        title={"Update Academic Details"}
        bgColor={"bg-gray-500"}
        icon={<FaGraduationCap />}
        dropDownComponent={<StudentProfileAcademic />}
      />
      <ActionCard
        title={"Update Professional Details"}
        bgColor={"bg-gray-500"}
        icon={<FaBriefcase />}
        dropDownComponent={<StudentProfileProfessional />}
      />
      <ActionCard
        title={"Update Document Details"}
        bgColor={"bg-gray-500"}
        icon={<FaFile />}
        dropDownComponent={<StudentProfileDocument />}
      />
    </div>
  )
}

export default StudentProfile