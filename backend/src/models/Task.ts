import mongoose from "mongoose";

export interface ITask {
  userId: mongoose.Types.ObjectId;
  name: string;
  desc: string;
  dt: string;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    desc: { type: String, default: "" },
    dt: { type: String, required: true },
  },
  { timestamps: true },
);

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
