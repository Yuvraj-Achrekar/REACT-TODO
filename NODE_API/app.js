import express from "express";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { erroMiddleware } from "./middlewares/errorhandler.js";
import cors from "cors";

export const app = express();

// dotenv config setup
config({
	path: "./data/config.env",
});

//middlewares
app.use(express.urlencoded({ extended: true })); //accepts form data from request body
app.use(express.json()); //accept json data from request body
app.use(cookieParser());
app.use(
	cors({
		origin: [process.env.FRONTEND_URL],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
	res.send("Working");
});

// Using Error Middleware
app.use(erroMiddleware);
