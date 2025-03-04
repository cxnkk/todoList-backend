import express from "express";
import postgres from "postgres";

const sql = postgres("postgres://username:password@localhost:5432/db");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  const toDos = await sql`select * from todos`;
  res.send(toDos);
});

app.put("/newToDo", async (req, res) => {
  const { toDoItem } = req.body;

  const list = await sql`
  INSERT INTO todos
  VALUES (${toDoItem})`;

  return res.sendStatus(200);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
