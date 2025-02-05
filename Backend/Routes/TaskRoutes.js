import express from "express";
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../Controllers/TaskController.js";
import {verify} from "../Utils/WebToken.js";

const router = express.Router();

router.post("/create", verify, createTask);      
router.get("/getall", verify, getTasks);         
router.get("/:id", verify, getTaskById);   
router.put("/:id", verify, updateTask);    
router.delete("/:id", verify, deleteTask);  

export default router;
