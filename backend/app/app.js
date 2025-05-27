import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "../routes/user.route.js";
import movieRouter from "../routes/movie.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => { res.end("Welcome back!!") })

app.use("/user", userRouter);
app.use("/movie", movieRouter);

export default app;
