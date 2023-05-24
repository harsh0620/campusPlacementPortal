import React from 'react'
import { useAppContext } from '../../context/appContext';
import AdminJobDriveTable from '../Admin/AdminJobDriveTable';

const CompanyViewJobs = () => {
    const {specificCompany}=useAppContext();
  return (
    <div className='mt-8'><AdminJobDriveTable jobDrives={specificCompany?.placementDrives}/></div>
  )
}

export default CompanyViewJobs