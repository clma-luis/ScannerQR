import React from "react";

interface ArrowLeftIconProps {
  width?: number;
  height?: number;
}

const ArrowLeftIcon = (props: ArrowLeftIconProps) => {
  const { width = 24, height = 24 } = props;
  return (
    <svg
      className="text-black dark:text-white group-hover:text-primary "
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
    </svg>
  );
};

export default ArrowLeftIcon;
