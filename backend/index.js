import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import app from "./app/app.js";
dotenv.config();

ConnectDB().then(() => {
	console.log("Server is starting....");
	app.listen(process.env.PORT, () => {
		console.log(`server is running on http://localhost:${process.env.PORT}`);
	})
}).catch((error) => {
	console.log(error);
})
