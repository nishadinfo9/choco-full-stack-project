import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-square w-full  rounded-md bg-amber-900/20" />
      <Skeleton className=" w-full h-7 rounded-full bg-amber-900/20" />
      <div className="flex items-center gap-25">
        <Skeleton className="w-30 h-7 rounded-full bg-amber-900/20" />
        <Skeleton className=" w-full h-7 rounded-full bg-amber-900/20" />
      </div>
    </div>
  );
}
