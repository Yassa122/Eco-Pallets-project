// src/utils/cors.ts
import cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: process.env.FRONTEND_URL ?? "http://localhost:3001", // Allow specific or all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Explicitly include OPTIONS
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};

export default cors(corsOptions);
