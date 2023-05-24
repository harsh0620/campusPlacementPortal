import React, { useEffect } from 'react'
import JobsViewHeader from './JobsViewHeader'
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import { useAppContext } from '../../context/appContext';
import JobsViewDetails from './JobsViewDetails';
import JobsViewAppliedStudents from './JobsViewAppliedStudents';

const JobsView = () => {
    const {getJobsByIdByAdmin,isLoading,user}=useAppContext();
    const params=useParams();
    const {id}=params;
    useEffect(() => {
        getJobsByIdByAdmin(id);
      }, [])
  
      if(isLoading) return <Loader backgroundColor="text-gray-300" loaderColor="fill-black" />
  return (
    <div className='pb-16'>
        <JobsViewHeader/>
        <JobsViewDetails/>
        {(user?.role==="admin" || user?.role==="company") && <JobsViewAppliedStudents/>}
    </div>
  )
}

export default JobsView