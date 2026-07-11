"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroBg() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="hero-bg"
      initial={{ scale: 1 }}
      animate={reduce ? { scale: 1 } : { scale: 1.05 }}
      transition={{ duration: 15, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
    />
  );
}
