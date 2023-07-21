import { cn } from "@/lib/utils";
import { FC } from "react";
import styles from "@/styles/index.module.css";
import CheggRepublicBackground from "./CheggRepublicBackground";

interface BackgroundProps {}

const Background: FC<BackgroundProps> = ({}) => {
  return (
    <div className='pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden'>
      <div
        className={cn(
          "absolute z-[-1] h-full w-full [--gradient-stop-1:60%] [--gradient-stop-2:85%] lg:[--gradient-stop-1:50%] lg:[--gradient-stop-2:90%]",
          "[--gradient-color-1=rgba(255,255,255,1)] [--gradient-color-2=rgba(255,255,255,0.8)] [--gradient-color-3=rgba(255,255,255,0)]"
        )}
        style={{
          background:
            "linear-gradient(180deg, var(--gradient-color-1) 0%, var(--gradient-color-2) var(--gradient-stop-1), var(--gradient-color-3) var(--gradient-stop-2), 100% transparent)",
        }}
      />
      <span className={cn(styles.leftLights, "opacity-100")} />
      <span className={cn(styles.rightLights, "opacity-100")} />
      <span className='absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-black to-transparent' />
      <span className='absolute left-0 top-[20vh] h-[50vh] w-full bg-gradient-to-b from-black to-transparent' />
      <CheggRepublicBackground />
    </div>
  );
};

export default Background;
