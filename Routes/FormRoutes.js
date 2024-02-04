import express from "express";
import { createForm, getAllForms, getFormById, updateFormById, deleteFormById } from '../Controllers/FormController.js'

const FormRouter = express.Router();

FormRouter.post('/', createForm)
FormRouter.get('/', getAllForms)
FormRouter.get('/:id', getFormById)
FormRouter.put('/:id', updateFormById)
FormRouter.delete('/:id', deleteFormById)

export default FormRouter;