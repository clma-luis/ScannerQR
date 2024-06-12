import { Skeleton } from "@/components/ui/Skeleton";

const SkeletonDetails = () => {
  return (
    <div className="w-full grid gap-1 grid-cols-2 justify-start pb-2">
      <div>
        <Skeleton className="h-8 w-[250px]" />
      </div>
      <div />

      {Array.from({ length: 4 }).map((_, i) => (
        <div className="p-1" key={i}>
          <Skeleton className="h-10 w-[100%]" />
        </div>
      ))}

      <div className="mt-8">
        <Skeleton className="h-8 w-[250px]" />
      </div>
      <div />
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="p-1" key={i}>
          <Skeleton className="h-10 w-[100%]" />
        </div>
      ))}

      <div />
      {Array.from({ length: 2 }).map((_, i) => (
        <div className="p-1 pt-8" key={i}>
          <Skeleton className="h-10 w-[100%]" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonDetails;
