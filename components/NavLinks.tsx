"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export function NavLinks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return [
    ["Browse Jobs", "/browse-jobs"],
    ["Hackathons", "/hackathons"],
    ["Blog", "/blog"],
    ["Newsletter", "/newsletter"],
  ].map(([label, href], index) => (
    <Link
      key={label}
      href={href}
      className='hover:delay-[0ms] relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm transition-colors delay-150 hover:text-white/80'
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}>
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className='absolute inset-0 rounded-lg bg-gray-800/70'
            layoutId='hoverBackground'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <span className='relative z-10'>{label}</span>
    </Link>
  ));
}
