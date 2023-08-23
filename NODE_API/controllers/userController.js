import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/errorhandler.js";

export const register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		let data = await User.findOne({ email });

		if (data) return next(new ErrorHandler("User already Exist", 400));

		const hashPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			name,
			email,
			password: hashPassword,
		});

		sendCookie(user, res, "Registered Successfully", 201);
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email }).select("+password");

		if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch)
			return next(new ErrorHandler("Invalid Email or Password", 400));

		sendCookie(user, res, `Welcome back, ${user.name}`, 201);
	} catch (error) {
		next(error);
	}
};

export const getMyDetails = (req, res) => {
	const { user } = req;
	res.status(200).json({
		success: true,
		user,
	});
};

export const logout = (req, res) => {
	res
		.status(200)
		.cookie("token", "", {
			expires: new Date(Date.now()),
			sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
			secure: process.env.NODE_ENV === "Development" ? false : true,
		})
		.json({
			success: true,
		});
};
