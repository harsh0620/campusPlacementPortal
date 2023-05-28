import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CompanyViewHeader from './CompanyViewHeader';
import { useAppContext } from '../../context/appContext';
import Loader from '../Loader';
import CompanyViewBasic from './CompanyViewBasic';
import CompanyViewHr from './CompanyViewHr';
import ActionCard from '../ActionCard';
import { FaList } from 'react-icons/fa';
import CompanyViewJobs from './CompanyViewJobs';

const CompanyView = () => {
    const {getCompanyByIdByAdmin,getCompanyByIdByStudent,getCompanyByIdByCompany,isLoading,user}=useAppContext();
    const params=useParams();
    const {id}=params;
    useEffect(() => {
      if(user?.role==="admin"){
        getCompanyByIdByAdmin(id);
    }else if(user?.role==="student"){
        getCompanyByIdByStudent(id);
    }
    else if(user?.role==="company"){
      getCompanyByIdByCompany(id);
    }
     // eslint-disable-next-line
    }, [])
  
      if(isLoading) return <Loader backgroundColor="text-gray-300" loaderColor="fill-black" text="Loading"/>
  return (
    <div className='pb-16'>
        <CompanyViewHeader/>
        <CompanyViewBasic/>
        <CompanyViewHr/>
        <ActionCard
        title={"Job Postings"}
        bgColor={"bg-gray-500"}
        icon={<FaList />}
        dropDownComponent={<CompanyViewJobs  />}
      />
    </div>
  )
}

export default CompanyView