import { Skeleton } from "@/components/ui/Skeleton";
import { statusOptions } from "@/modules/DetailsModule/config";

interface SelectComponentProps {
  selectedValue: string;
  isLoadPage: boolean;
  handleOnChangeValue: (value: string) => void;
}

const SelectComponent = (props: SelectComponentProps) => {
  const { selectedValue, isLoadPage, handleOnChangeValue } = props;

  if (isLoadPage)
    return (
      <div className="mt-4">
        <Skeleton className="w-full h-12 " />
      </div>
    );

  return (
    <div className="mt-4 border-[1px] px-2 rounded-md">
      <select
        onChange={(e) => handleOnChangeValue(e.target.value)}
        value={selectedValue}
        name="status"
        id="status-select"
        className="w-full h-[40px]   outline-none"
      >
        {statusOptions.map((item) => (
          <option value={`${item.id}`} key={item.id} className="text-black dark:text-white">
            {item.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
