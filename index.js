import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
dotenv.config();

import connectMongoDB from "./connection.js";

// import logReqRes from "./middlewares/index.js";
import authMiddlewares from "./middlewares/auth.js";
import staticRouter from "./routes/staticRouter.js";
import urlRouter from "./routes/url.js";
import userRouter from "./routes/user.js";

connectMongoDB(process.env.MONGO_URL)
    .then(() => console.log(`MongoDB connected`))
    .catch((err) => console.log(`Error: ${err}`));

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use(logReqRes("./log.txt"));

const { checkForAuthentication, restrictTo } = authMiddlewares;

app.use(checkForAuthentication);

app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRouter);

const port = process.env.PORT || 8002;

app.listen(port, () => console.log(`Server started on port: ${port}`));
