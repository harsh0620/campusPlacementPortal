import mongoose from "mongoose";

const ExampleSchema = new mongoose.Schema(
  {
    contentExample: {
      type: String,
      required: [true, "Please provide content example"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Example", ExampleSchema);
