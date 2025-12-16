import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
	throw new Error("JWT_SECRET is required");
}
if (!process.env.MONGO_URI) {
	throw new Error("MONGO_URI is required");
}

export const config = {
	port: parseInt(process.env.PORT) || 4000,
	mongoUri: process.env.MONGO_URI,
	jwtSecret: process.env.JWT_SECRET,
	jwtExpires: process.env.JWT_EXPIRES || "7d",
	corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000"
};
