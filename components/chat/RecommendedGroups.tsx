import { FC, useState, useEffect } from "react";
import Group from "../Group";
import { GROUPS } from "@/lib/data";
import { Loader2 } from "lucide-react";

interface RecommendedGroupsProps {}

const RecommendedGroups: FC<RecommendedGroupsProps> = ({}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className='max-w-sm w-full ml-auto mr-24'>
      <h2 className='text-sm uppercase font-bold text-gray-300 tracking-tight'>
        Recommended Groups
      </h2>
      <div className='mt-2 flex flex-col gap-4'>
        {loading ? (
          <Loader2 className='text-center h-4 w-4 animate-spin text-primary' />
        ) : (
          <>
            <Group
              {...GROUPS[0]}
              showJoinButton={true}
              truncateDescription={true}
            />
            <Group
              {...GROUPS[1]}
              showJoinButton={true}
              truncateDescription={true}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendedGroups;
