import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

const StudentProfileDocument = () => {
  const {
    documentResume,
    documentPhoto,
    documentAadhar,
    documentAllDocument,
    pdfUpload,
    imageUpload,
    pdfUrl,
    imageUrl,
    user,
    isLoading,
    handleChange,
    getStudentProfileDocuments,
    updateStudentProfileDocuments,
  } = useAppContext();
  const handlePdfChange = (event) => {
    const file = event.target.files[0];

    // Read the file as Base64 URL
    const reader = new FileReader();

    // Initiate the reading of the file
    reader.readAsDataURL(file);

    // Read the file when it has been loaded
    reader.onload = () => {
      const base64Url = reader.result;
      handleChange({ name: "pdfUrl", value: file });
      handleChange({ name: event.target.name, value: base64Url });
    };
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // Read the file as Base64 URL
    const reader = new FileReader();

    // Initiate the reading of the file
    reader.readAsDataURL(file);

    // Read the file when it has been loaded
    reader.onload = () => {
      const base64Url = reader.result;
      handleChange({ name: "imageUrl", value: file });
      handleChange({ name: event.target.name, value: base64Url });
    };
  };

  async function handlePdfUpload(title) {
    handleChange({ name: "uploadProgress", value: 0 });
    handleChange({ name: "isUploading", value: true });
    if (!pdfUrl || pdfUrl.length === 0)
      return toast.error("Please select a pdf file");
    const dataUrl = await pdfUpload(pdfUrl, user);
    handleChange({ name: title, value: dataUrl });

    handleChange({ name: "isUploading", value: false });
  }
  const handleImageUpload = async () => {
    handleChange({ name: "uploadProgress", value: 0 });
    handleChange({ name: "isUploading", value: true });
    if (!imageUrl || imageUrl.length === 0)
      return toast.error("Please select an image file");
    //check if the state contains file and not any other string
    if (typeof imageUrl !== "object")
      return toast.error("Please select an image file");
    const dataUrl = await imageUpload(imageUrl, user);
    handleChange({ name: "documentPhoto", value: dataUrl });
    handleChange({ name: "isUploading", value: false });
  };
  const onUpdateProfile = (e) => {
    e.preventDefault();
    updateStudentProfileDocuments();
  };
  useEffect(() => {
    getStudentProfileDocuments();
  // eslint-disable-next-line
    }, []);
  // if (isLoading) {
  //   return (
  //     <Loader
  //       backgroundColor="text-gray-300"
  //       loaderColor="fill-black"
  //       text={`Uploading... ${uploadProgress}%`}
  //     />
  //   );
  // }
  return (
    <form
      className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-lg md:p-4 p-2"
      onSubmit={onUpdateProfile}
    >
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="documentResume"
        >
          Resume
        </label>
        <div className="flex flex-row justify-between w-full">
          <input
            className="mt-2 mb-2 mr-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
            type="file"
            accept=".pdf"
            id="documentResume"
            name="documentResume"
            placeholder="Add Resume"
            onChange={handlePdfChange}
          />
          <button
            type="button"
            className="flex flex-col w-8 h-8 mt-3 items-center justify-center  bg-orange-500 hover:bg-orange-600 text-white font-medium p-2 rounded-full"
            onClick={() => handlePdfUpload("documentResume")}
          >
            <FaUpload />
          </button>
        </div>
        {(documentResume?.length !== 0 || documentResume !== undefined) && (
          <embed
            width="100%"
            height="500px"
            src={documentResume?.length !== 0 ? documentResume : pdfUrl}
            type="application/pdf"
          />
        )}
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="documentPhoto"
        >
          Passport Size Photo
        </label>
        <div className="flex flex-row justify-between w-full">
          <input
            className="mt-2 mb-2 mr-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
            type="file"
            accept=".jpg,.jpeg,.png"
            id="documentPhoto"
            name="documentPhoto"
            placeholder="Add Photo"
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="flex flex-col w-8 h-8 mt-3 items-center justify-center  bg-orange-500 hover:bg-orange-600 text-white font-medium p-2 rounded-full"
            onClick={() => handleImageUpload()}
          >
            <FaUpload />
          </button>
        </div>
        {(documentPhoto?.length !== 0 || documentPhoto !== undefined) && (
          <img
            className="w-48 h-48 justify-center items-center mx-auto object-cover"
            src={documentPhoto?.length !== 0 ? documentPhoto : imageUrl}
            alt="Profile"
          />
        )}
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="documentAadhar"
        >
          Addhar Card
        </label>
        <div className="flex flex-row justify-between w-full">
          <input
            className="mt-2 mb-2 mr-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
            type="file"
            accept=".pdf"
            id="documentAadhar"
            name="documentAadhar"
            placeholder="Add Aadhar card"
            onChange={handlePdfChange}
          />
          <button
            type="button"
            className="flex flex-col w-8 h-8 mt-3 items-center justify-center  bg-orange-500 hover:bg-orange-600 text-white font-medium p-2 rounded-full"
            onClick={() => handlePdfUpload("documentAadhar")}
          >
            <FaUpload />
          </button>
        </div>
        {(documentAadhar?.length !== 0 || documentAadhar !== undefined) && (
          <embed
            width="100%"
            height="500px"
            src={documentAadhar?.length !== 0 ? documentAadhar : pdfUrl}
            type="application/pdf"
          />
        )}
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="documentAllDocument"
        >
          All Documents
        </label>
        <div className="flex flex-row justify-between w-full">
          <input
            className="mt-2 mb-2 mr-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
            type="file"
            accept=".pdf"
            id="documentAllDocument"
            name="documentAllDocument"
            placeholder="Add Aadhar card"
            onChange={handlePdfChange}
          />
          <button
            type="button"
            className="flex flex-col w-8 h-8 mt-3 items-center justify-center  bg-orange-500 hover:bg-orange-600 text-white font-medium p-2 rounded-full"
            onClick={() => handlePdfUpload("documentAllDocument")}
          >
            <FaUpload />
          </button>
        </div>
        {(documentAllDocument?.length !== 0 ||
          documentAllDocument !== undefined) && (
          <embed
            width="100%"
            height="500px"
            src={
              documentAllDocument?.length !== 0 ? documentAllDocument : pdfUrl
            }
            type="application/pdf"
          />
        )}
      </div>
      <button
        className="flex mt-2 mb-2 w-full items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
        type="submit"
        disabled={isLoading}
      >
        {isLoading && (
          <Loader
            backgroundColor="text-gray-300"
            loaderColor="fill-black"
            text="Loading"
          />
        )}
        {!isLoading && "Update Profile"}
      </button>
    </form>
  );
};

export default StudentProfileDocument;
