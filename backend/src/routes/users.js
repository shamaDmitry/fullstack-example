const express = require("express");



module.exports = (prisma) => {
  const router = express.Router();

  // GET /api/users
  router.get("/", async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch users" });
    }   
  });

  // POST /api/users
  router.post("/", async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email)
      return res.status(400).json({ error: "name and email required" });

    try {
      const user = await prisma.user.create({ data: { name, email } });
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  return router;
};
