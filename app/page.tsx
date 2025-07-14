"use client";

import Image from "next/image";
import InputForm from "@/components/InputForm";
import { motion } from "framer-motion";
import { useState } from "react";
import LoadingView from "@/components/LoadingView";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#aee1f9] via-[#a6f0d1] to-[#c4e2ff] px-4 py-8 sm:py-0">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(80,201,206,0.35)] rounded-3xl p-6 sm:p-10 w-full max-w-lg sm:max-w-2xl transition-shadow duration-300"
      >
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="SummarAIze Logo"
            width={120}
            height={120}
            priority
            className="rounded-xl drop-shadow-xl animate-pulse sm:w-[160px] sm:h-[160px]"
          />

          <h1
            className="text-3xl sm:text-4xl font-bold mt-4"
            style={{
              textShadow: "1px 1px 0 #00000022, 2px 2px 0 #00000011",
            }}
          >
            <span className="text-[#50C9CE]">Summar</span>
            <span className="text-blue-900">AI</span>
            <span className="text-[#50C9CE]">ze</span>
          </h1>

          <p className="text-gray-600 mt-2 mb-6 sm:mb-8 text-sm sm:text-base max-w-xs sm:max-w-md">
            AI-Powered Blog Summarizer with Urdu Translation
          </p>
        </div>

        {/* Conditional LoadingView */}
        {isLoading ? <LoadingView /> : <InputForm setIsLoading={setIsLoading} />}
      </motion.div>
    </main>
  );
}
