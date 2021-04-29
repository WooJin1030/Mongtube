import express from "express";
import {
  getEdit,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  postEdit,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get(":/id", see);

export default userRouter;
