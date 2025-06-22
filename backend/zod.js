const zod = require("zod");

const createTodo = zod.object({
  title: zod.string().min(3, "Title is required"),
  description: zod.string().min(3, "Description is required"),
});

const updateTodo = zod.object({
  id: zod.string().length(24, "Invalid ID"),
});

module.exports = {
  createTodo,
  updateTodo,
};
