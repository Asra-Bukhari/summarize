"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy, Mic, MicOff, Share2 } from "lucide-react";

export default function UrduCard({ summary }: { summary: string }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSpeak = async () => {
    if (isSpeaking) {
      audio?.pause();
      setIsSpeaking(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: summary }),
      });

      const data = await res.json();

      if (!data.audioContent) {
        alert("Urdu TTS failed.");
        return;
      }

      const audioElement = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
      audioElement.play();
      setIsSpeaking(true);
      setAudio(audioElement);

      audioElement.onended = () => {
        setIsSpeaking(false);
      };
    } catch (err) {
      console.error("TTS error:", err);
      alert("Error generating Urdu audio.");
    } finally {
      setLoading(false);
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

  
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  return (
    <Card dir="rtl" className="relative">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-green-700">اردو خلاصہ</CardTitle>
          <div className="flex items-center gap-4">
            {/* Mic Button */}
            <button
              onClick={toggleSpeak}
              disabled={loading}
              className={`${isSpeaking ? "text-blue-600" : "text-gray-700"} ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <svg
                  className="w-5 h-5 text-blue-600 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : isSpeaking ? (
                <MicOff size={20} />
              ) : (
                <Mic size={20} />
              )}
            </button>

            {/* Copy Button */}
            <button onClick={copyToClipboard}>
              {copied ? (
                <Check size={20} className="text-green-500" />
              ) : (
                <Copy size={20} />
              )}
            </button>

            {/* Share Button */}
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
