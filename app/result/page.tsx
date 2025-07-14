"use client";

import { useEffect, useState } from "react";
import SummaryCard from "@/components/SummaryCard";
import UrduCard from "@/components/UrduCard";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import Image from "next/image";
import jsPDF from "jspdf";

export default function ResultPage() {
  const [summary, setSummary] = useState("");
  const [urduSummary, setUrduSummary] = useState("");
  const router = useRouter();

  useEffect(() => {
    const eng = localStorage.getItem("summary") || "";
    const urdu = localStorage.getItem("urdu") || "";
    setSummary(eng);
    setUrduSummary(urdu);
  }, []);

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("English Summary", 20, 30);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(summary, 170);
    doc.text(lines, 20, 50);

    doc.save("SummarAIze_Blog_Summary.pdf");
  };

  if (!summary && !urduSummary) {
    return (
      <p className="text-center mt-20 text-gray-600">
        No summaries found. Please submit a blog URL first.
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#aee1f9] via-[#a6f0d1] to-[#c4e2ff] px-4 py-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.1)] rounded-3xl p-6 sm:p-10 max-w-3xl w-full space-y-6 relative"
      >
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 z-10 flex items-center text-blue-800 hover:text-[#50C9CE] transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="absolute top-4 right-4 z-10 flex items-center text-green-700 hover:text-[#50C9CE] transition-colors duration-300"
        >
          <Download className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Download PDF</span>
        </button>

       {/* Title with Logo */}
<div className="flex items-center justify-center mt-6 sm:mt-0">
  <Image src="/logo.png" alt="logo" width={52} height={52} />
  <h1
    className="text-2xl sm:text-2xl font-bold text-center"
    style={{
      textShadow: "1px 1px 0 #00000022, 2px 2px 0 #00000011",
    }}
  >
    <span className="text-[#50C9CE]">Summar</span>
    <span className="text-blue-900">AI</span>
    <span className="text-[#50C9CE]">ze</span>
  </h1>
</div>


        {/* English Summary */}
        <SummaryCard summary={summary} />

        {/* Urdu Summary */}
        <UrduCard summary={urduSummary} />
      </motion.div>
    </main>
  );
}
