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

export default router;
