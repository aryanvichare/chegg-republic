"use client";

import { FC, ReactNode } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster position='bottom-right' closeButton richColors />
      <TooltipProvider>{children}</TooltipProvider>
    </>
  );
};

export default Providers;
