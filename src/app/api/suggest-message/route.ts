import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

// 1. IMPORTANT: This forces Next.js to fetch new data every single time
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    // 2. Use the Vercel AI SDK 'generateText' function
    const { text } = await generateText({
      // Configure the Google provider with your specific API key and model
      model: google("gemini-2.5-flash"),

      // Map your original system instruction here
      system:
        "You are a helpful assistant for an anonymous social messaging platform. Your output must ALWAYS be a single string of 3 questions separated strictly by '||'. Avoid sensitive topics.",

      // Map your original prompt here
      prompt:
        "Generate 3 unique, random, and intriguing questions for a diverse audience. Do not repeat common questions.",

      // Map your original generation config here
      temperature: 1.3,
    });

    // The SDK returns the string directly in the 'text' property
    return NextResponse.json({ data: text });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 }
    );
  }
}
