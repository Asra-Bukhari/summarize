import { NextResponse } from "next/server";
import { connectToMongo, Blog } from "@/lib/mongo";
import { supabase } from "@/lib/supabase";
import { scrapeBlogContent } from "@/utils/scraper";
import { getCohereSummary } from "@/lib/cohere";
import { translateToUrdu } from "@/lib/translator";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required." }, { status: 400 });

    // 1. Scrape blog content
    let content = "";
    try {
      content = await scrapeBlogContent(url);
    } catch (scrapeError) {
      return NextResponse.json({ error: "Could not fetch content from the blog URL. Please check if it's valid and accessible." }, { status: 400 });
    }

    if (!content) {
      return NextResponse.json({ error: "No readable content found on the blog." }, { status: 404 });
    }

    // 2. Summarize
    const summary = await getCohereSummary(content);

    // 3. Translate
    const urdu = await translateToUrdu(summary);

    // 4. Save to Mongo
    await connectToMongo();
    await Blog.create({ url, content });

    // 5. Save to Supabase
    await supabase.from("summaries").insert([{ url, summary, urdu_summary: urdu }]);

    return NextResponse.json({ summary, urdu }, { status: 200 });

  } catch (err: any) {
    console.error("API error:", err.message || err);
    return NextResponse.json({ error: "Something went wrong on the server." }, { status: 500 });
  }
}
