"use client";
import { useState } from "react";

type AlertProps = {
  title: string;
  message: string;
  color?: "gray" | "indigo" | "emerald" | "amber" | "red";
};

const Alert = ({ title, message, color = "red" }: AlertProps) => {
  const [displayAlert, setDisplayAlert] = useState(true);
  const dismissAlert = () => {
    setDisplayAlert(false);
  };

  return (
    displayAlert && (
      <div
        className={`p-4 mb-4 text-sm text-${color}-500 rounded-xl bg-${color}-50   font-normal`}
        role="alert"
      >
        <span className="font-semibold mr-2">{title}</span>
        {message}
        <button
          type="button"
          onClick={dismissAlert}
          className="pl-3 ml-auto"
          data-dismiss="alert"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.833497 9.16659L9.16683 0.833253M9.16683 9.16658L0.833496 0.833252"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    )
  );
};

export default Alert;
