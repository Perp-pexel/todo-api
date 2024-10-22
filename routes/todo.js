import { Router } from "express";
import { addTodo, countTodos, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todo.js";
import { localUpload, todoIconUpload } from "../middlewares/upload.js";
// create a router
const todoRouter = Router();

// Define routes
todoRouter.post('/todos', todoIconUpload.single('icon'), addTodo);

todoRouter.get('/todos', getTodos);

todoRouter.get('/todos/count', countTodos);

todoRouter.get('/todos/:id', getTodo)

todoRouter.patch('/todos/:id', updateTodo);

todoRouter.delete('/todos/:id', deleteTodo);

// Export router
export default todoRouter;