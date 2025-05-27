import {mongoose} from "mongoose"
import dotenv from "dotenv";
dotenv.config();

const ConnectDB = async () => {
	try {
		const res = await mongoose.connect(`mongodb+srv://kundanprogrammerz:kBH2VvI5HCByjWCF@cluster0.inizfbg.mongodb.net/${process.env.DBNAME}`);
		console.log(`MongoDB Connected!!!, HOST: ${res.connection.host}`);
	} catch (error) {
		console.log(error);
		
		throw new Error("Database Connection Failed!!!");
	}
}

export default ConnectDB;

