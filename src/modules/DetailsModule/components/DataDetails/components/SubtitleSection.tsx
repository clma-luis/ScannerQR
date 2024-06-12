import React from "react";

interface SubtitleSectionProps {
  subtitle: string;
  className?: string;
}

const SubtitleSection = (props: SubtitleSectionProps) => {
  const { subtitle, className = "" } = props;
  return (
    <>
      <div className={className}>
        <h1 className="font-custom text-[16px] flex-col font-semibold">{subtitle}</h1>
      </div>
    </>
  );
};

export default SubtitleSection;
