
import express from "express";
import LikeController from "./like.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

const router = express.Router();

const likeController = new LikeController();

router.post('/', jwtAuth, (req, res, next)=>{
    likeController.likeItem(req, res, next);
})

export default router;
