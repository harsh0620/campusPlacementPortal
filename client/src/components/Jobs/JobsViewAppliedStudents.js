import React from 'react'
import JobsViewComp from './JobsViewComp'
import AdminStudentTable from '../Admin/AdminStudentTable'
import { useAppContext } from '../../context/appContext';

const JobsViewAppliedStudentsComp = () => {
    const {specificJob}=useAppContext();
    return (
        <div>
          <AdminStudentTable students={specificJob?.appliedBy} />
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