import express from "express";
import prisma from "../libs/prisma.js";

const router = express.Router();

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
    });

    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST /api/users
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "name and email required" });
  }

  try {
    const user = await prisma.user.create({ data: { name, email } });

    return res.status(201).json(user);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
