import { backendendpoint } from "@/hooks/endpoint";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { identifier, password } = await req.json();

  try {
    const response = await fetch(`${backendendpoint}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ sessionId: data.sessionId, ...data });
    } else {
      const { error } = await response.json();
      return NextResponse.json({ error: error || "Invalid credentials" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
