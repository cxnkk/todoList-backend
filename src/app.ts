import express from "express";
import postgres from "postgres";

const sql = postgres("postgres://cenk:luffy@localhost:5432/db");

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
  INSERT INTO todos (item)
  VALUES (${toDoItem})`;

  return res.send(list).status(200);
});

app.delete("/deletedToDo", async (req, res) => {
  const { todoId } = req.body;

  const check = await sql`
  SELECT
  FROM
    todos
  WHERE
    todos.id = ${todoId}`;

  if (check.length === 0) {
    return res.sendStatus(404);
  } else {
    const deletedToDo = await sql`
    DELETE
    FROM
      todos
    WHERE
      todos.id = ${todoId}`;
    console.log(deletedToDo);
  }

  return res.sendStatus(200);
});

app.post("/changeToDo", async (req, res) => {
  const { todoId, changedToDo } = req.body;

  const check = await sql`
  SELECT
  FROM
    todos
  WHERE
    todos.id = ${todoId}`;

  if (check.length === 0) {
    return res.sendStatus(404);
  } else {
    const updatedoDo = await sql`
  UPDATE todos
  SET item = ${changedToDo}
  WHERE todos.id = ${todoId}`;
    console.log(updatedoDo);
  }

  return res.sendStatus(200);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
