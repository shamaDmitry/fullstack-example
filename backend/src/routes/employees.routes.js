import express from "express";
import prisma from "../libs/prisma.js";

const router = express.Router();

// GET /api/employees
router.get("/", async (req, res) => {
  try {
    const employees = await prisma.employees.findMany({
      orderBy: { createdAt: "asc" },
    });

    return res.json(employees);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// POST /api/employees
router.post("/", async (req, res) => {
  const { fullName, email, position, department, salary } = req.body;

  if (!fullName || !email || !position || !department || !salary) {
    return res.status(400).json({ error: "all fields are required" });
  }

  try {
    const user = await prisma.employees.create({
      data: { fullName, email, position, department, salary },
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ error: "Failed to create user" });
  }
});

export default router;
