import express from "express";
import noteRoutes from "./routes/note.router";
import storeRoutes from "./routes/store.router";
import bookRoutes from "./routes/book.router";
import cors from "cors";
import bodyParser from "body-parser";
//import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/stores", storeRoutes);

export default app;
