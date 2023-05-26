import React from 'react'
import ActionCard from '../ActionCard'
import StudentProfilePersonal from './StudentProfilePersonal'
import { FaBriefcase, FaCode, FaCodepen, FaFile, FaGraduationCap, FaInfoCircle, FaUser } from 'react-icons/fa'
import {TbCertificate} from "react-icons/tb"
import {BiLink} from "react-icons/bi"
import StudentProfileAcademic from './StudentProfileAcademic'
import StudentProfileDocument from './StudentProfileDocument'
import StudentProfileBasic from './StudentProfileBasic'
import StudentProfileExperience from './StudentProfileExperience'
import StudentProfileProjects from './StudentProfileProjects'
import StudentProfileSkills from './StudentProfileSkills'
import StudentProfileCertifications from './StudentProfileCertifications'
import StudentProfileLinks from './StudentProfileLinks'
import UpdatePasswordForm from '../UpdatePasswordForm'
import { RiKeyFill } from 'react-icons/ri'
const StudentSettings = () => {
  return (
    <div className="bg-white w-full pb-24">
      <ActionCard
        title={"Basic Details"}
        bgColor={"bg-blue-500"}
        icon={<FaInfoCircle />}
        dropDownComponent={<StudentProfileBasic />}
      />
      <ActionCard
        title={"Personals"}
        bgColor={"bg-pink-500"}
        icon={<FaUser />}
        dropDownComponent={<StudentProfilePersonal />}
      />
      <ActionCard
        title={"Academics"}
        bgColor={"bg-purple-500"}
        icon={<FaGraduationCap />}
        dropDownComponent={<StudentProfileAcademic />}
      />
      <ActionCard
        title={"Experiences"}
        bgColor={"bg-yellow-500"}
        icon={<FaBriefcase />}
        dropDownComponent={<StudentProfileExperience />}
      />
      <ActionCard
        title={"Projects"}
        bgColor={"bg-green-500"}
        icon={<FaCodepen />}
        dropDownComponent={<StudentProfileProjects />}
      />
      <ActionCard
        title={"Skills"}
        bgColor={"bg-indigo-500"}
        icon={<FaCode />}
        dropDownComponent={<StudentProfileSkills />}
      />
      <ActionCard
        title={"Certifications"}
        bgColor={"bg-teal-500"}
        icon={<TbCertificate />}
        dropDownComponent={<StudentProfileCertifications />}
      />
      <ActionCard
        title={"Links"}
        bgColor={"bg-cyan-500"}
        icon={<BiLink />}
        dropDownComponent={<StudentProfileLinks />}
      />
      <ActionCard
        title={"Documents"}
        bgColor={"bg-gray-500"}
        icon={<FaFile />}
        dropDownComponent={<StudentProfileDocument />}
      />
      <ActionCard
        title={"Update Password"}
        bgColor={"bg-red-500"}
        icon={<RiKeyFill />}
        dropDownComponent={<UpdatePasswordForm />}
      />
    </div>
  )
}

export default StudentSettings