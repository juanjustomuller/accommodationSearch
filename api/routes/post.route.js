import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost); //Cuando creamos un post hay q ser autentificaado primero por eso le paso verifyToken
router.put("/:id", verifyToken, updatePost); //tmb cuando actualizamos
router.delete("/:id", verifyToken, deletePost); //tmb cuando borramos


export default router;