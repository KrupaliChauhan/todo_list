import type { Request, Response } from "express";
import Task from "../../models/Task.js";

const toClient = (doc: any) => ({
  id: doc._id.toString(),
  name: doc.name,
  desc: doc.desc,
  dt: doc.dt,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    return res.json(tasks.map(toClient));
  } catch {
    return res.status(500).json({ message: "server error" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const task = await Task.findOne({ _id: id, userId });
    if (!task) return res.status(404).json({ message: "task not found" });

    return res.json(toClient(task));
  } catch {
    return res.status(500).json({ message: "server error" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { name, desc, dt } = req.body as {
      name?: string;
      desc?: string;
      dt?: string;
    };

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (!name || !dt) {
      return res.status(400).json({ message: "name and dt are required" });
    }

    const task = await Task.create({ userId, name, desc: desc || "", dt });
    return res.status(201).json(toClient(task));
  } catch {
    return res.status(500).json({ message: "server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    const { name, desc, dt } = req.body as {
      name?: string;
      desc?: string;
      dt?: string;
    };

    if (!name || !dt) {
      return res.status(400).json({ message: "name and dt are required" });
    }

    const updated = await Task.findOneAndUpdate(
      { _id: id, userId },
      { name, desc: desc || "", dt },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "task not found" });
    }

    return res.json(toClient(updated));
  } catch {
    return res.status(500).json({ message: "server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const deleted = await Task.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ message: "task not found" });
    }

    return res.json({ message: "deleted" });
  } catch {
    return res.status(500).json({ message: "server error" });
  }
};
