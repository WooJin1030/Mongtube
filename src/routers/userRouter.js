import express from "express";
import {
  getEdit,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  postEdit,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middlewares/middlewares";

const userRouter = express.Router();

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get(":/id", see);

export default userRouter;
