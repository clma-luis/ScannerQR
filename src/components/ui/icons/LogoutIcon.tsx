import React from "react";

interface LogoutIconProps {
  width?: number;
  height?: number;
}

const LogoutIcon = (props: LogoutIconProps) => {
  const { width = 24, height = 24 } = props;
  return (
    <svg
      className="text-icon dark:text-icon group-hover:text-primary "
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
      />
    </svg>
  );
};

export default LogoutIcon;
/*  */
