import express from "express";
import cors from "cors";
import postRoutes from "./routes/postRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/post", postRoutes);

export default app;