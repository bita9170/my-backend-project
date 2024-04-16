import mongoose, { Schema } from "mongoose";

const PollSchema = new Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Poll = mongoose.models.Poll || mongoose.model("Poll", PollSchema);

export default Poll;
