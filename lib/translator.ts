export async function translateToUrdu(text: string): Promise<string> {
  const chunks = text.match(/.{1,500}/g) || []; 
  let translated = "";

  for (const chunk of chunks) {
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|ur`
      );
      const data = await res.json();
      translated += data.responseData.translatedText + " ";
    } catch (error: any) {
      console.error("Translation chunk failed:", error.message || error);
      translated += "\n[ترجمہ ناکام ہو گیا]\n";
    }
  }

  return translated.trim();
}
