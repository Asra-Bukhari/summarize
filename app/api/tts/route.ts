import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const body = {
      input: { text },
      voice: {
        languageCode: "ur-IN",
        name: "ur-IN-Wavenet-A",
      },
      audioConfig: {
        audioEncoding: "MP3",
      },
    };

    const apiKey = process.env.GOOGLE_TTS_API_KEY;

    const res = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    if (!data.audioContent || res.status !== 200) {
      return NextResponse.json(
        { error: "TTS failed", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ audioContent: data.audioContent });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal server error", details: err.message || err },
      { status: 500 }
    );
  }
}
