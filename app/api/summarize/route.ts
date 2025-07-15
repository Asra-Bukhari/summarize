import { NextResponse } from "next/server";
import { connectToMongo, Blog } from "@/lib/mongo";
import { supabase } from "@/lib/supabase";
import { scrapeBlogContent } from "@/utils/scraper";
import { getCohereSummary } from "@/lib/cohere";
import { translateToUrdu } from "@/lib/translator";

export async function POST(req: Request) {
  try {
    const { url, length = "medium", format = "paragraph" } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required." }, { status: 400 });

    let content = "";
    try {
      content = await scrapeBlogContent(url);
    } catch (scrapeError) {
      return NextResponse.json({ error: "Could not fetch content from the blog URL. Please check if it's valid and accessible." }, { status: 400 });
    }

    if (!content) {
      return NextResponse.json({ error: "No readable content found on the blog." }, { status: 404 });
    }

    const summary = await getCohereSummary(content, length, format);
    
    let urdu = "";
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

    await connectToMongo();
    await Blog.create({ url, content });

    await supabase.from("summaries").insert([{ url, summary, urdu_summary: urdu }]);

    return NextResponse.json({ summary, urdu }, { status: 200 });

  } catch (err: any) {
    console.error("API error:", err.message || err);
    return NextResponse.json({ error: "Something went wrong on the server." }, { status: 500 });
  }
}

