import connectMongoDB from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Poll from "@/libs/model/Poll";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    await connectMongoDB();
    const poll = await Poll.findById(id);
    return NextResponse.json({ poll }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = params;
  const { question, options } = await request.json();
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

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = params;
  await connectMongoDB();
  const deletedPoll = await Poll.findByIdAndDelete(id);
  if (!deletedPoll) {
    return NextResponse.json({ message: "Poll not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Poll deleted" }, { status: 200 });
}
