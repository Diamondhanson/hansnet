"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const defaultTransition = { duration: 0.4, ease: "easeOut" as const };

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...defaultTransition, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
