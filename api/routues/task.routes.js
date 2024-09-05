import express from 'express'
import { addTask, getTask, deleteTask } from '../controller/task.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express();

router.post('/add-task' ,verifyToken, addTask)
router.post('/get-task' ,verifyToken, getTask)
router.delete("/delete/:id", verifyToken, deleteTask)

export default router;