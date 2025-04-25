import express from "express";
import cors from "cors";
import postRoutes from "./routes/postRoutes";
import scraperRoutes from "./routes/scraperRoutes";
import blogRoutes from "./routes/blogRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/scraper", scraperRoutes);
app.use("/api/blogs", blogRoutes);

export default app;