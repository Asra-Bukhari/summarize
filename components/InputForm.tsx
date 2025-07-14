// components/InputForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type Props = {
  setIsLoading?: (val: boolean) => void;
};

export default function InputForm({ setIsLoading }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url) {
      setError("Please enter a blog URL.");
      return;
    }

    setLoading(true);
    setIsLoading?.(true); // Start global loading view

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("summary", data.summary);
        localStorage.setItem("urdu", data.urdu);
        router.push("/result");
      } else {
        setError(data.error || "Unable to process this blog. Please try another.");
        setIsLoading?.(false);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Something went wrong. Please check your internet or try again later.");
      setIsLoading?.(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="max-w-xl mx-auto mt-12 p-6 shadow-2xl border border-blue-200 rounded-2xl bg-white/80 backdrop-blur-md">
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="url"
              placeholder="Paste a blog URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="rounded-md px-4 py-2 text-lg border-blue-300 focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 transition-all duration-300 text-white font-bold py-2 rounded-md"
            >
              {loading ? "Summarizing..." : "Summarize Blog"}
            </Button>

            {error && (
              <div className="text-center text-red-600 text-sm mt-2 animate-pulse">
                {error}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
