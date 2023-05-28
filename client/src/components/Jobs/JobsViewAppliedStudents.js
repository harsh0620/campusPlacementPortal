import React from 'react'
import JobsViewComp from './JobsViewComp'
import AdminStudentTable from '../Admin/AdminStudentTable'
import { useAppContext } from '../../context/appContext';
import CompanyStudentTable from '../Company/CompanyStudentTable';

const JobsViewAppliedStudentsComp = () => {
    const {specificJob,user}=useAppContext();
    return (
        <div>
          {user?.role==="admin" &&
          <AdminStudentTable students={specificJob?.appliedBy} />}
          {user?.role==="company" &&
          <CompanyStudentTable students={specificJob?.appliedBy} />}

        </div>
    )
}
const JobsViewAppliedStudents = () => {
  return (
    <div>
    <JobsViewComp
      title="Students who applied for the job"
      viewComponent={<JobsViewAppliedStudentsComp />}
    />
  </div>
  )
}

export default JobsViewAppliedStudents