import React from 'react'
import { useAppContext } from '../../context/appContext'
import { FaGlobe, FaLinkedin } from 'react-icons/fa';

const CompanyViewHeader = () => {
    const {isValidImageUrl,specificCompany,getRandomColor}=useAppContext();
  return (
    <div className="shadow bg-white w-full rounded-xl flex flex-col">
    {/* //Details Section */}
    <div className="flex flex-col relative w-full">
      <div
        className={`rounded-t-xl mb-20 ${getRandomColor()}`}
        style={{ minHeight: "100px" }}
      ></div>
      <div className="flex flex-col absolute md:mt-6 mt-12 ml-4">
        {isValidImageUrl(specificCompany?.logo) ? (
          <img
            src={specificCompany?.logo}
            alt={specificCompany?.logo}
            className="md:w-32 md:h-32 w-20 h-20 rounded-full m-4 bg-white p-1 border"
          />
        ) : (
          <div className="md:w-32 md:h-32 w-20 h-20 rounded-full m-4 bg-gray-300 p-1 border" > 
          <div className='mx-auto w-12 h-12 md:mt-8 md:text-6xl text-3xl mt-4 md:ml-8 ml-6'>
          {specificCompany?.name ? specificCompany?.name.charAt(0) : ''}
          </div>
          </div>
        )}
      </div>
      <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start p-4">
        <div className="flex flex-col">
          <div className="text-2xl font-bold">{specificCompany?.name}</div>
          <div className="text-lg font-medium">
            {specificCompany?.email}
          </div>
        </div>
        <div className="flex flex-row">
          {/* <div className="flex flex-col"> */}
            <a className="text-lg font-medium m-1 text-gray-500" href={specificCompany?.website} target="__blank">
              <FaGlobe/>
            </a>
            <a className="text-lg font-medium m-1 text-blue-500" href={specificCompany?.linkedin} target="__blank">
             <FaLinkedin/>
            </a>
          {/* </div> */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default CompanyViewHeader