"use client";

import React, { FC, ReactNode } from "react";

import Link from "next/link";
import { Popover } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import BlurImage from "../BlurImage";

import { useSignInModal } from "@/components/auth/SignInModal";
import { Session } from "next-auth";
import UserDropdown from "../auth/UserDropdown";
import { useRouter } from "next/navigation";

interface NavbarProps {
  session: Session | null;
}

function MenuIcon(props: any) {
  return (
    <svg viewBox='0 0 24 24' fill='none' aria-hidden='true' {...props}>
      <path
        d='M5 6h14M5 18h14M5 12h14'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function ChevronUpIcon(props: any) {
  return (
    <svg viewBox='0 0 24 24' fill='none' aria-hidden='true' {...props}>
      <path
        d='M17 14l-5-5-5 5'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

interface MobileNavLinkProps {
  children: ReactNode;
  href: string;
}

function MobileNavLink({ children, ...props }: MobileNavLinkProps) {
  return (
    <Popover.Button
      as={Link}
      className='block text-base leading-7 tracking-tight opacity-70'
      {...props}>
      {children}
    </Popover.Button>
  );
}

const Navbar: FC<NavbarProps> = ({ session }) => {
  const router = useRouter();
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      <header>
        <nav>
          <Container className='relative z-50 flex h-[100px] justify-between py-8'>
            <div className='relative z-10 flex items-center gap-16'>
              <Link
                href='/'
                aria-label='Home'
                className='flex h-8 items-center'>
                <BlurImage
                  src={`/images/chegg-logo.svg`}
                  alt={`HireWeb3 Logo`}
                  width={100}
                  height={64}
                  priority
                />
              </Link>
            </div>
            <div className='flex items-center gap-6'>
              <Popover className='lg:hidden'>
                {({ open, close }) => (
                  <>
                    <Popover.Button
                      className='relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-400 p-2 hover:bg-gray-200/10 hover:stroke-gray-300 active:stroke-gray-900 [&:not(:focus-visible)]:focus:outline-none'
                      aria-label='Toggle site navigation'>
                      {({ open }) =>
                        open ? (
                          <ChevronUpIcon className='h-6 w-6' />
                        ) : (
                          <MenuIcon className='h-6 w-6' />
                        )
                      }
                    </Popover.Button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <>
                          <Popover.Overlay
                            static
                            as={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='fixed inset-0 z-0 bg-gray-300/60 backdrop-blur'
                          />
                          <Popover.Panel
                            static
                            as={motion.div}
                            initial={{ opacity: 0, y: -32 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{
                              opacity: 0,
                              y: -32,
                              transition: { duration: 0.2 },
                            }}
                            className='absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-background px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20'>
                            {/* <div className='space-y-4'>
                              <MobileNavLink href='/'>Log In</MobileNavLink>
                            </div> */}
                            <div className='mt-8 flex flex-col gap-4'>
                              <Button
                                onClick={() => {
                                  close();
                                  setShowSignInModal(true);
                                }}
                                variant='outline'>
                                Log in
                              </Button>
                            </div>
                          </Popover.Panel>
                        </>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </Popover>

              {session ? (
                <>
                  <UserDropdown session={session} />
                </>
              ) : (
                <>
                  <Button
                    variant='default'
                    onClick={() => {
                      if (!session) {
                        setShowSignInModal(true);
                      } else {
                        router.push("/welcome");
                      }
                    }}
                    className='hidden font-semibold lg:block'>
                    Get Started
                  </Button>
                  <Button
                    variant='outline'
                    className='hidden lg:block'
                    onClick={() => {
                      setShowSignInModal(true);
                    }}>
                    Log in
                  </Button>
                </>
              )}
            </div>
          </Container>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
