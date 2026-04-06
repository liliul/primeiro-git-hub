import cors from "cors";

const allowedOrigins = [
	"http://localhost:3000",
	"http://localhost:5173",
	"http://127.0.0.1:5173",
];

export const corsMiddleware = cors({
	origin: (origin, callback) => {
		if (process.env.NODE_ENV === "development") {
			return callback(null, true);
		}

		if (!origin) return callback(null, true);

		if (allowedOrigins.includes(origin)) {
			return callback(null, true);
		}

		return callback(new Error("Not allowed by CORS"));
	},
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
});
