"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const steps = [
  "Checking the url",
  "Summarizing your blog",
  "Translating to Urdu",
  "Refining content",
  "Almost there",
];

export default function LoadingView() {
  const [index, setIndex] = useState(0);

useEffect(() => {
  if (index >= steps.length - 1) return; 

  const interval = setInterval(() => {
    setIndex((prev) => prev + 1); 
  }, 5000);

  return () => clearInterval(interval);
}, [index]);


  return (
    <div className="flex flex-col items-center justify-center mt-8 space-y-4">
      {/* Animated Step Line */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold text-blue-800"
        >
          {steps[index]}
        </motion.div>
      </AnimatePresence>

      {/* Animated Dots */}
      <div className="flex items-center space-x-1 text-2xl font-bold text-blue-800">
        <span className="animate-bounce [animation-delay:0ms]">.</span>
        <span className="animate-bounce [animation-delay:200ms]">.</span>
        <span className="animate-bounce [animation-delay:400ms]">.</span>
      </div>

      {/* AI Thinking Note */}
      <p className="text-sm text-gray-600">Our AI bot is thinking 🤖</p>
    </div>
  );
}
