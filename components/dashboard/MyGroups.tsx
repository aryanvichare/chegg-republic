"use client";

import { FC } from "react";
import { GROUPS } from "@/lib/data";
import Group from "../Group";

interface MyGroupsProps {}

const MyGroups: FC<MyGroupsProps> = ({}) => {
  return (
    <div className='mt-12'>
      <h2 className='text-3xl font-bold tracking-tight'>My Groups</h2>
      <div className='mt-12'>
        <div className='grid grid-cols-2 md:grid-cols-3 place-items-start h-[410px] h-full items-stretch gap-12'>
          {GROUPS.map((group, idx) => {
            return (
              <div key={idx}>
                <Group {...group} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
