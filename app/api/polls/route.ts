import connectMongoDB from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Poll from "@/libs/model/Poll";

export async function GET() {
  try {
    await connectMongoDB();
    const allPolls = await Poll.find();
    return NextResponse.json({ polls: allPolls }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { question, options } = await req.json();
    await connectMongoDB();
    await Poll.create({ question, options });
    return NextResponse.json({ message: "Poll Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 201 });
  }
}
