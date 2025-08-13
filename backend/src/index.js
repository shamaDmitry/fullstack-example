import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.routes.js";
import employeesRouter from "./routes/employees.routes.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/employees", employeesRouter);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
