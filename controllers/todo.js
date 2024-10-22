import { TodoModel } from "../models/todo.js";
import { addTodoValidator,updateTodoValidator } from "../validator/todo.js";

export const addTodo = async (req, res, next) =>{
    try {
        // console.log(req.body);
    
        // validate user inputs
        const { error, value } = addTodoValidator.validate({
            ...req.body,
            icon: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Write todo to database
        await TodoModel.create(value);
        // Respond to request
        res.status(201).json('Todo was added!');
    } catch (error) {
        next(error)
    }
}
 
export const getTodos = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
        const { error, value } = updateTodoValidator. validate(req.body);
        // Fetch todos from database
        const todos = await TodoModel
        .find(JSON.parse(filter))
        .sort(JSON.parse(sort))
        .limit(limit)
        .skip(skip);
        // Return response
        res.status(200).json(todos);
    } catch (error) {
        next(error);
        
    }
}
export const countTodos = async (req, res, next) => {
    try {
        const { filter = "{}" } = req.query;
        // count todos in database
        const count = await TodoModel.countDocuments(JSON.parse(filter));
        // respond to request
        res.json({ count });
    } catch (error) {
        next (error);
        
    }
}
export const getTodo = async(req, res, next) => {
   try {
    const { id } = req.params;
    // get todo by id from database
    const todo =await TodoModel.findById(id);
    // respond to request
     res.json(todo);
   } catch (error) {
    next (error);
    
   }
}

export const updateTodo =(req, res, next) => {
    res.json ('Todo updates!');
}

export const deleteTodo = (req, res, next) => {
    res.json('Todo deleted!')
}

// const filter = { "title":{"$regex":'${searchTerm}', "$options":"i"}}