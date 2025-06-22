const express = require("express");
const { createTodo, updateTodo } = require("./zod");
let app = express();
const { db, Todo } = require("./database");
const cors = require('cors')

db();
//body {
// title : string
// description : string
// }
app.use(express.json());
app.use(cors());

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);
  if (!parsePayload.success) {
    return res.status(411).json({
      msg: "Invalid Inputs",
    });
  }
  await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  res.json({
    msg: "Todo Created ✅",
  });
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.json({
    todos,
  });
});

app.post("/completed", async (req, res) => {
  const updatePayload = req.body;
  const paresePayload = updateTodo.safeParse(updatePayloadPayload);
  if (!paresePayload.success) {
    res.status(411).json({
      msg: " Invalid Inputs ",
    });
    return;
  }
  await todo.update(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.json({
    msg: "Todo marked as complete 👌",
  });
});

// DELETE /todos/:id
app.delete("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).send("Not found");
  res.status(200).send("Deleted");
});


app.listen(3000, () => {
  console.log("port 3000 is on........");
});
