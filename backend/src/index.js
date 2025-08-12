const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter(prisma));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
