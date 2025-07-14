import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeBlogContent(url: string): Promise<string> {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    
    const paragraphs = $("p").map((_, el) => $(el).text().trim()).get();

    // Combine paragraphs into one string
    const fullText = paragraphs.join("\n\n");
    return fullText;
  } catch (err) {
    console.error("Scraping failed:", err);
    throw new Error("Failed to scrape blog content");
  }
}
