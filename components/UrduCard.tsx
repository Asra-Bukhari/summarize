'use client';

declare global {
  interface Window {
    responsiveVoice: any;
  }
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Check, Copy, Mic, MicOff, Share2 } from "lucide-react";

export default function UrduCard({ summary }: { summary: string }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceLoaded, setVoiceLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load voices after responsiveVoice is ready
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.responsiveVoice?.speak) {
        setVoiceLoaded(true);
        clearInterval(interval);
      }
    }, 300);

    return () => {
      clearInterval(interval);
      window.responsiveVoice?.cancel();
    };
  }, []);

  const toggleSpeak = () => {
    if (!voiceLoaded) return console.warn("Urdu voice not ready.");

    if (isSpeaking) {
      window.responsiveVoice.cancel();
      setIsSpeaking(false);
    } else {
      const voices = window.responsiveVoice.getVoices();
      const urduVoice =
        voices.find((v: any) =>
          v.name.toLowerCase().includes("urdu")
        )?.name || "Hindi Male"; 

      window.responsiveVoice.speak(summary, urduVoice, {
        onend: () => setIsSpeaking(false),
      });
      setIsSpeaking(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const shareSummary = () => {
    if (navigator.share) {
      navigator.share({ title: "اردو خلاصہ", text: summary });
    } else {
      console.log("Sharing not supported.");
    }
  };

  return (
    <Card dir="rtl" className="relative">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-green-700">اردو خلاصہ</CardTitle>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSpeak}
              disabled={!voiceLoaded}
              className={`${isSpeaking ? "text-blue-600" : "text-gray-700"} ${
                !voiceLoaded ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSpeaking ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button onClick={copyToClipboard}>
              {copied ? (
                <Check size={20} className="text-green-500" />
              ) : (
                <Copy size={20} />
              )}
            </button>
            <button onClick={shareSummary}>
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-900 font-urdu text-right leading-loose whitespace-pre-line">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
}
