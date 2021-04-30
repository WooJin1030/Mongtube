import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares/middlewares";
// import { Mongoose } from "mongoose";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   maxAge: 20000,
    // },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

// app.use((req, res, next) => {
//   req.sessionStore.all((error, sessions) => {
//     console.log(sessions);
//     next();
//   });
// });

app.use(localsMiddleware);

// app.get("/add-one", (req, res, next) => {
//   return res.send(`${req.session.id}`);
// });

app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
