import axios from "axios";

const COHERE_API_KEY = process.env.COHERE_API_KEY;

if (!COHERE_API_KEY) {
  throw new Error("Cohere API key not found in .env.local");
}

export async function getCohereSummary(
  text: string,
  length: "short" | "medium" | "long" = "medium",
  format: "paragraph" | "bullets" = "paragraph"
): Promise<string> {
  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/summarize",
      {
        text,
        length,
        format,
        extractiveness: "low",
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.summary;
  } catch (error: any) {
    console.error("Cohere summarization failed:", error?.response?.data || error.message);
    throw new Error("Failed to summarize text with Cohere.");
  }
}

