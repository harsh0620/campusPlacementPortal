import React from "react";
import { useAppContext } from "../context/appContext";

const Alert = () => {
  const { alertType, alertText } = useAppContext();

  return (
    <div
      className={`${
        alertType === "success"
          ? "bg-green-500"
          : alertType === "error"
          ? "bg-red-500"
          : "bg-yellow-500"
      } text-white p-2 rounded-md mt-2 mb-2`}
    >
      {alertText}
    </div>
  );
};

export default Alert;
