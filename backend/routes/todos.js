import express from 'express';
import {boolean, z} from 'zod';

const router = express.Router();
const TodoSchema = z.object({
    id: z.number(),
    task: z.string(),
    checked: z.boolean(),
})

let todos = [
    {id:1, task: 'Play Dota', checked:true},
    {id:2, task: 'Play With My Brother', checked:false},
    {id:3, task: 'Watch Anime', checked:false},

];

  
//GET /todos
router.get('/', (req, res)=>{
    res.status(200).send(todos);
})

//GET /todos/:id
router.get ('/:id', (req, res) =>{
    const todoId = Number(req.params.id);
    const foundIndex = todos.findIndex(ci => ci.id === Number (todoId))

    if (foundIndex === -1){
        res.status(404).send('Not Found')
    }else{
        res.status(200).send(todos[foundIndex])
    } 
    
})

//POST /todos - { "task": "Make a wish" }
//POST /todos validation
router.post('/', (req,res) =>{
    const newTodoItem = { ...req.body, id: new Date().getTime() }
    const parsedResult = TodoSchema.safeParse(newTodoItem)

     if (!parsedResult.success){
        return res.status(400).send(parsedResult.error)
     } 
    todos = [...todos, parsedResult.data]
    res.status(201).send(parsedResult.data);

})

//PATCH /todos/:id - { "checked": true }
router.patch ('/:id', (req,res) =>{
    const todoId = Number(req.params.id);
    const foundIndex = todos.findIndex(ci => ci.id === Number (todoId))
    const checked = req.body.checked;
    
  
    if (foundIndex === -1){
        res.status(404).send('Not Found')
    }else{
        const updateCheck = {...todos[foundIndex], checked: checked};
        const parsedResult = TodoSchema.safeParse(updateCheck);

        if (!parsedResult.success){
            return res.status(400).send(parsedResult.error)
        }
        todos[foundIndex] = parsedResult.data;
        res.status(200).send(parsedResult.data);
    }

})

router.delete('/:id', (req, res) => {
    const todoId = Number(req.params.id);
    const foundIndex = todos.findIndex(ci => ci.id === Number (todoId))

    if (foundIndex === -1){
      return  res.status(404).send('Not Found')
    }else{
        todos[foundIndex] = [],
        res.status(204).send()
    }

})


export default router;