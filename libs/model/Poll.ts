import mongoose, { Schema } from "mongoose";

const PollSchema = new Schema(
  {
    question: { type: String, required: true },
    options: [
      {
        name: { type: String, required: true },
        count: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const Poll = mongoose.models.Poll || mongoose.model("Poll", PollSchema);

export default Poll;
