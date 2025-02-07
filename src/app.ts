import express from "express";
import { list } from "./data";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(list);
});

app.put("/newToDo", (req, res) => {
  const { toDoItem } = req.body;

  list.push(toDoItem);

  return res.sendStatus(200);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
