/* Dependencies */
const Task = require('../models/Task');
const Proyect = require('../models/Proyect');
const { validationResult } = require('express-validator');
/* Function that create a new task */
const newTask = async (req, res) => {
  /* Error handling */
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { proyect } = req.body;
    const oneProyect = await Proyect.findById(proyect)
    /* Validation */
    if(!oneProyect) {
      return res.status(404).json({ msg: 'Proyect not found' })
    }
    /* Validation */
    if(oneProyect.creator.toString() !== req.user.id) {
      return res.status(401).json({ mag: 'Permission Denied' })
    }
    /* Creating and add a new task */
    const task = new Task(req.body);
    await task.save()
    res.json({ task })

  } 
  catch (error) {
    console.log(error);
    res.status(500).send('ERROR!')
  }
}
/* Function that get all tasks by proyect */
const getTaskByProyect = async (req, res) => {
  try {
    const { proyect } = req.query;
    const oneProyect = await Proyect.findById(proyect)
    /* Validation */
    if(!oneProyect) {
      return res.status(404).json({ msg: 'Not found' })
    }
    /* Validation */
    if(oneProyect.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Permission Denied' })
    }
    /* Find task by id proyect */
    const task = await Task.find({ proyect });
    res.status(200).json({ task })
  } 
  catch (error) {
    console.log(error)
    res.status(500).send('ERROR!')  
  }
}
/* Function that update task */
const updateTask = async (req, res) => {
  try {
    const { proyect, name, state } = req.body;
    let oneTask = await Task.findById(req.params.id)
    /* Validation */
    if(!oneTask) {
      return res.status(404).json({ msg: 'Not found' })
    }
    const oneProyect = await Proyect.findById(proyect);
    /* Validation */
    if(oneProyect.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Permission Denied' })
    }
    const newTask = {};
    newTask.name = name;
    newTask.state = state;    
    /* ¡¡¡UPDATE!!! */
    oneTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      /* SETTING UP THE UPDATED TASK  */
      newTask,
      { new: true } 
    )
    res.status(200).json({ oneTask })
  } 
  catch (error) {
    console.log(error)
    res.status(500).send('ERROR!')  
  }
}
/* Function that delete task */
const deleteTask = async (req, res) => {
  try {
    const { proyect } = req.query
    let oneTask = await Task.findById(req.params.id)
    /* Validation */
    if(!oneTask) {
      return res.status(404).json({ msg: 'Not found' })
    }
    const oneProyect = await Proyect.findById(proyect);
    /* Validation */
    if(oneProyect.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Permission Denied' })
    }
    /* ¡¡¡DELETE!!! */
    await Task.findOneAndRemove({ _id: req.params.id })
    res.json({ msg: 'Task deleted' })
  } 
  catch (error) {
    console.log(error)
    res.status(500).send('ERROR!')  
  }
}

module.exports = {
  newTask,
  getTaskByProyect,
  updateTask,
  deleteTask
}