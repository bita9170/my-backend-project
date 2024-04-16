import connectMongoDB from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Poll from "@/libs/model/Poll";

export async function GET() {
  await connectMongoDB();
  const allPolls = await Poll.find();
  return NextResponse.json({ polls: allPolls }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { question, options } = await req.json();
  await connectMongoDB();
  await Poll.create({ question, options });
  return NextResponse.json({ message: "Poll Created" }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, question, options } = await req.json();
  await connectMongoDB();
  const updatedPoll = await Poll.findByIdAndUpdate(
    id,
    { question, options },
    { new: true }
  );
  if (!updatedPoll) {
    return NextResponse.json({ message: "Poll not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "Poll updated", poll: updatedPoll },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await connectMongoDB();
  const deletedPoll = await Poll.findByIdAndDelete(id);
  if (!deletedPoll) {
    return NextResponse.json({ message: "Poll not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Poll deleted" }, { status: 200 });
}
