import { IBoatData } from "@/services/boat/boatTypes";
import { formatDate } from "@/shared/utils";

type ConfigType = { name: string; property: string; format?: boolean };

interface BoxDetailProps {
  config: ConfigType[];
  data: IBoatData;
}

const BoxComponent = (props: BoxDetailProps) => {
  const { config, data } = props;
  const newData: Record<string, any> = data;

  const handleFormatDate = (value: string) => {
    return formatDate(value);
  };

  const handleTextValue = (item: ConfigType) => {
    return item.format ? handleFormatDate(newData[item.property]) : newData[item.property] || "-";
  };


  return (
    <>
      {config.map((item) => (
        <div className="p-1 " key={item.name}>
          <p className="font- min-w-[190px] text-[14px] font-semibold text-[#848484] ">{item.name}</p>
          <p className="font-custom font-semibold text-[14px]">{handleTextValue(item)}</p>
        </div>
      ))}
    </>
  );
};

export default BoxComponent;
