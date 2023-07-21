"use client";

import { FC, useState } from "react";
import BlurImage from "./BlurImage";
import { cn, truncate } from "@/lib/utils";
import AvatarsList from "./AvatarsList";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";

import Tilt from "react-parallax-tilt";

interface GroupProps {
  backgroundColors: string;
  logoUrl: string;
  title: string;
  description: string;
  numMembers: number;
  showJoinButton?: boolean;
  truncateDescription?: boolean;
}

const Group: FC<GroupProps> = ({
  backgroundColors,
  logoUrl,
  title,
  description,
  numMembers,
  showJoinButton = false,
  truncateDescription = false,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.3}
      glareColor='#ffffff'
      glarePosition='all'
      glareBorderRadius='8px'
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}>
      <div className='group relative w-full flex flex-col rounded-md border border-gray-300 border-solid'>
        <div
          className={cn(
            "relative bg-gradient-to-r rounded-tr-md rounded-tl-md border-b border-gray-300 py-12",
            backgroundColors
          )}>
          <div className='absolute top-[4.2rem] left-12'>
            <div className='relative bg-white shadow shadow-md rounded-full w-16 h-16 p-2'>
              <BlurImage
                src={logoUrl as string}
                style={{ objectFit: "cover" }}
                alt='CS 61B Logo'
                className='rounded-full scale-90'
                fill
              />
            </div>
          </div>
        </div>
        <div className='mt-12 flex-1 flex flex-col px-4 py-4 justify-between bg-gray-950 rounded-br-md rounded-bl-md'>
          <div className='flex flex-col space-y-2'>
            <h4 className='text-sm font-semibold tracking-side'>{title}</h4>
            <p className='text-gray-300 leading-relaxed text-sm'>
              {truncateDescription ? truncate(description, 100) : description}
            </p>
            <div className='py-3 flex flex-row items-center text-gray-300 justify-start'>
              <AvatarsList />{" "}
              <span className='text-xs ml-2'>+ {numMembers} students</span>
            </div>
          </div>
          {showJoinButton && (
            <Button
              className={cn(
                "mt-3 bg-primary",
                buttonClicked && "!bg-green-500 !hover:bg-green-400"
              )}
              onClick={() => setButtonClicked(true)}>
              {buttonClicked ? (
                <div className='flex items-center space-x-2'>
                  <CheckCircle2 className='w-4 h-4' />
                  <span className='text-sm mt-[1px]'>Joined</span>
                </div>
              ) : (
                `Join Group`
              )}
            </Button>
          )}
        </div>
      </div>
    </Tilt>
  );
};

export default Group;
