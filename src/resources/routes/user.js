import express from "express";
import { studentControllerDetail,createStudentController,loginUserController } from "../controllers/studentController.js";
const router = express.Router();
router.get('/vinh/:id',studentControllerDetail)
router.get('/student', (req, res) => {
    res.send('dang xuan vinh')
})
router.post('/acb',createStudentController)
router.post('/login',loginUserController)

export default router