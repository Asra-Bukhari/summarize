import axios from "axios";

export async function sendBugReport(url: string, error: string) {
  try {
    await axios.post("https://asrabukhari.app.n8n.cloud/webhook/bug-report", {
      url,
      error,
      time: new Date().toISOString(),
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("❌ Failed to send bug report to n8n:", e.message);
    } else {
      console.error("❌ Unknown error type while sending bug report to n8n:", e);
    }
  }
}

