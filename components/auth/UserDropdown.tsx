"use client";

import { FC, useState } from "react";
import { signOut } from "next-auth/react";
import { Home, LogOut, Rocket } from "lucide-react";
import Popover from "@/components/Popover";
import Image from "next/image";
import { Session } from "next-auth";
import Link from "next/link";

interface UserDropdownProps {
  session: Session | null;
}

const UserDropdown: FC<UserDropdownProps> = ({ session }) => {
  const { email, image } = session?.user || {};
  console.log(session?.user);
  const [openPopover, setOpenPopover] = useState(false);

  if (!email) return null;

  return (
    <div className='relative flex items-end text-left'>
      <Popover
        content={
          <div className='w-full rounded-md bg-background p-2 sm:w-56'>
            <Link
              className='relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-800'
              href='/dashboard'
              onClick={() => setOpenPopover(false)}>
              <Home className='h-4 w-4' />
              <p className='text-sm'>Dashboard</p>
            </Link>
            <Link
              className='relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-800'
              href='/welcome'
              onClick={() => setOpenPopover(false)}>
              <Rocket className='h-4 w-4' />
              <p className='text-sm'>New Chat</p>
            </Link>
            {/* <button
              className="relative flex w-full cursor-not-allowed items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Post a Job</p>
            </button> */}
            <button
              className='relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-800'
              onClick={() => {
                setOpenPopover(false);
                signOut();
              }}>
              <LogOut className='h-4 w-4' />
              <p className='text-sm'>Logout</p>
            </button>
          </div>
        }
        align='end'
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}>
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className='mt-auto flex h-8 w-8 items-end justify-end overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9'>
          <Image alt={email} src={image as string} width={40} height={40} />
        </button>
      </Popover>
    </div>
  );
};

export default UserDropdown;
