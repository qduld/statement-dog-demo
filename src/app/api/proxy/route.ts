import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_BASE_URL = "https://api.finmindtrade.com";
const API_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wNy0wMyAwNDoyMDoxNCIsInVzZXJfaWQiOiJmcmFua2xpbnplbG8iLCJpcCI6IjE0MC4yNDUuOTkuMTMxIn0.W9w7clO6TLb6BHjp3zyGkJ-xNUYJj3zJVVXfjQucDmA";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "";
  const params = Object.fromEntries(searchParams.entries());

  // Remove the path param since it's not part of the actual API request
  delete params.path;

  try {
    // Remove leading slash from path if present
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    const apiUrl = `${API_BASE_URL}/${cleanPath}?${new URLSearchParams(
      params
    ).toString()}`;

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: API_TOKEN,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`API request failed: ${response.status} - ${errorData}`);
      throw new Error(`API request failed: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
