import mongoose from "mongoose";

export const connectDB = () => {
	mongoose
		.connect(process.env.MONBODB_URL, {
			dbName: "backendApi",
		})
		.then(() => {
			console.log("Database Connected");
		})
		.catch((e) => console.log(e));
};
