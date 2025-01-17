import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure your API key is configured
  timeout: 10000, // 10 seconds
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const audioFile = formData.get("audio");

    if (!audioFile || !(audioFile instanceof Blob)) {
      return NextResponse.json(
        { error: "Invalid or missing audio file" },
        { status: 400 }
      );
    }

    const file = new File([audioFile], "audio.mp3", { type: audioFile.type });

    // Ensure you provide the correct file and model to the API
    const transcription = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
      response_format: "text",
    });

    console.log("Transcription result:", transcription);

    return NextResponse.json({
      transcript: transcription,
    });
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.json(
      { error: "Error processing audio" },
      { status: 500 }
    );
  }
}
