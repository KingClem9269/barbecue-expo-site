import { NextRequest, NextResponse } from "next/server";

const BREVO_API_URL = "https://api.brevo.com/v3/contacts";

export async function POST(request: NextRequest) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("BREVO_API_KEY is not configured");
    return NextResponse.json(
      { errorCode: "service_unconfigured" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const { email, listIds } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ errorCode: "email_required" }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { errorCode: "invalid_email" },
        { status: 400 },
      );
    }

    const payload: {
      email: string;
      listIds?: number[];
      updateEnabled?: boolean;
    } = {
      email: trimmedEmail,
      updateEnabled: true,
    };

    if (listIds && Array.isArray(listIds) && listIds.length > 0) {
      payload.listIds = listIds
        .map((id: unknown) => Number(id))
        .filter(Boolean);
    }

    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Brevo API error:", response.status, errorData);

      if (response.status === 400) {
        return NextResponse.json(
          { errorCode: "invalid_request" },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { errorCode: "unable_to_subscribe" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { errorCode: "unexpected_error" },
      { status: 500 },
    );
  }
}
