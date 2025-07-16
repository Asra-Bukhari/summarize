import { NextResponse } from "next/server";
import { connectToMongo, Blog } from "@/lib/mongo";
import { supabase } from "@/lib/supabase";
import { scrapeBlogContent } from "@/utils/scraper";
import { getCohereSummary } from "@/lib/cohere";
import { translateToUrdu } from "@/lib/translator";
import { sendBugReport } from "@/utils/bugReporter";

export async function POST(req: Request) {
  try {
    const { url, length = "medium", format = "paragraph" } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required." }, { status: 400 });

    let content = "";
    try {
      content = await scrapeBlogContent(url);
    } catch (scrapeError: any) {
      await sendBugReport(url, `Scraping failed: ${scrapeError.message}`);
      return NextResponse.json(
        { error: "Could not fetch content from the blog URL. Please check if it's valid and accessible." },
        { status: 400 }
      );
    }

    if (!content) {
      await sendBugReport(url, "No readable content found on the blog.");
      return NextResponse.json({ error: "No readable content found on the blog." }, { status: 404 });
    }

    let summary = "";
    try {
      summary = await getCohereSummary(content, length, format);
    } catch (summaryError: any) {
      await sendBugReport(url, `Summarization failed: ${summaryError.message}`);
      return NextResponse.json({ error: "Summarization failed." }, { status: 500 });
    }

    let urdu = "";
    try {
      if (format === "bullets") {
        const bullets = summary
          .split(/\n|•|-/)
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        const translatedBullets = await Promise.all(
          bullets.map(async (point) => {
            const translated = await translateToUrdu(point);
            return `- ${translated}`;
          })
        );

        urdu = translatedBullets.join("\n");
      } else {
        urdu = await translateToUrdu(summary);
      }
    } catch (translationError: any) {
      await sendBugReport(url, `Translation failed: ${translationError.message}`);
      return NextResponse.json({ error: "Translation to Urdu failed." }, { status: 500 });
    }

    try {
      await connectToMongo();
      await Blog.create({ url, content });
    } catch (mongoError: any) {
      await sendBugReport(url, `MongoDB save failed: ${mongoError.message}`);
    }

    try {
      await supabase.from("summaries").insert([{ url, summary, urdu_summary: urdu }]);
    } catch (supabaseError: any) {
      await sendBugReport(url, `Supabase save failed: ${supabaseError.message}`);
    }

    return NextResponse.json({ summary, urdu }, { status: 200 });

  } catch (err: any) {
    console.error("API error:", err.message || err);
    await sendBugReport("Unknown", `Unhandled server error: ${err.message}`);
    return NextResponse.json({ error: "Something went wrong on the server." }, { status: 500 });
  }
}
