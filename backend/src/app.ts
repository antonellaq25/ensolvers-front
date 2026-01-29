import "dotenv/config";
import express from "express";
import cors from "cors";
import noteRoutes from "./routes/note.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/notes", noteRoutes);

export default app;
