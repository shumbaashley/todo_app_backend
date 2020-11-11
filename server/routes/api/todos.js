const { json } = require('body-parser');
const express = require('express');
const Todo = require('../../models/Todo');
const router = express.Router();


// GET ALL TODOS
router.get('/', async (req,res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.json({ "message" : err });
        
    }
});

// CREATE A TODO
router.post('/', async (req, res) => {
    const todo =  new Todo({
        todo : req.body.todo
    });

    try {
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo); 
    } catch (err) {
        res.json({"message" : err});
    }
});

//GET TODO BY ID
router.get('/:todoId', async (req,res)=>{
    try {
        const todo = await Todo.findById(req.params.todoId);
        res.json(todo)
    } catch (err) {
        res.json(err)
    }
});

// MARK SPECIFIC TODO COMPLETE
router.put('/:todoId', async (req,res)=>{
    try {
        const completedTodo = await Todo.updateOne({"_id" : req.params.todoId}, {$set : {"done" : req.body.done}}, {new : true});
        res.json(completedTodo)
    } catch (err) {
        res.json(err)
    }
});



// UPDATE SPECIFIC TODO
router.patch('/:todoId', async (req,res)=>{
    try {
        const updatedTodo = await Todo.updateOne({"_id" : req.params.todoId}, {$set : {"todo" : req.body.todo}});
        res.json(updatedTodo)
    } catch (err) {
        res.json(err)
    }
});

// DELETE A TODO
router.delete('/:todoId', async (req,res) => {
    try {
        const result = await Todo.deleteOne({"_id" : req.params.todoId})
        res.json(result)
    } catch (err) {
        
    }
});

module.exports = router;