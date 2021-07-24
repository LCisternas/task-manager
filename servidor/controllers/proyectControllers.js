/* Dependencies */
const Proyect = require('../models/Proyect');
const { validationResult } = require('express-validator');
/* Function that creates a new proyect */
const newProyect = async (req, res) => {
  /* Error handling */
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    /* Creating proyect */
    const proyect = new Proyect(req.body)
    /* SET USER CREATOR PROYECT */
    proyect.creator = req.user.id
    /* SAVE PROYECT */
    proyect.save()
    /* Send Proyect */
    res.json(proyect)
  }
  catch (err) {
    console.log(err)
    res.status(500).send('ERROR!')
  }
}
/* Function that get all proyects */
const getProyects = async (req, res) => {
  try {
    /* Find proyect */
    const proyects = await Proyect.find({ creator: req.user.id })
    /* Send Proyect */
    res.json({ proyects })
  }
  catch (err) {
    console.log(err)
    res.status(500).send('ERROR!')
  }
}
/* Function that update proyect */
const updateProyect = async (req, res) => {
  /* Error handling */
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { name } = req.body;
  const newProyect = {};
  if(name) {
    newProyect.name = name
  }

  try {
    let proyect = await Proyect.findById(req.params.id);
    /* Validation */
    if(!proyect) {
      return res.status(404).json({ msg: 'Not found' })
    }
    /* Validation */
    if(proyect.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Permission Denied' })
    }
    /* ¡¡¡UPDATE!!! */
    proyect = await Proyect.findByIdAndUpdate(
      { _id: req.params.id },
      /* SET UPDATE */
      { $set: newProyect },
      { new: true }
    )
    /* Send update proyect */
    res.json({ proyect })
  }
  catch (err) {
    console.log(err)
    res.status(500).send('ERROR!')
  }
}
/* Function that delete proyect */
const deleteProyect = async (req, res) => {
  try {
    let proyect = await Proyect.findById(req.params.id);
    /* Validation */
    if(!proyect) {
      return res.status(404).json({ msg: 'Not found' })
    }
    /* Validation */
    if(proyect.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Permission Denied' })
    }
    /* ¡¡¡DELETE!!! */
    await Proyect.findOneAndRemove({ _id: req.params.id })
    res.json({ msg: 'Proyect Deleted' })
  } 
  catch (err) {
    console.log(err)
    return res.status(500).send('Permission Denied')
  }
}


module.exports = {
  newProyect,
  getProyects,
  updateProyect,
  deleteProyect
}