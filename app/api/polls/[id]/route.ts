import connectMongoDB from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Poll from "@/libs/model/Poll";
import { ParsedUrlQuery } from "querystring";

export async function GET(request: NextRequest, { params }: { params: ParsedUrlQuery}) {
  const { id } = params;
  await connectMongoDB();
  const allPolls = await Poll.findById(id);
  return NextResponse.json({ allPolls }, { status: 200 });
}

