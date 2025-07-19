import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mic, MicOff, Share2 } from "lucide-react";

export default function SummaryCard({ summary }: { summary: string }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const toggleSpeak = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(summary);
      utterance.lang = "en-US";
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
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
      navigator.share({ title: "English Summary", text: summary });
    } else {
      console.log("Sharing not supported.");
    }
  };

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-green-700">English Summary</CardTitle>
          <div className="flex items-center gap-4">
            <button onClick={toggleSpeak} className={isSpeaking ? "text-blue-600" : "text-gray-700"}>
              {isSpeaking ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button onClick={copyToClipboard}>
              {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            </button>
            <button onClick={shareSummary}>
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{summary}</p>
      </CardContent>
    </Card>
  );
}
