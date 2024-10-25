import express from "express";
import noteRoutes from "./routes/note.router";
import storeRoutes from "./routes/store.router";
import bookRoutes from "./routes/book.router";
import userRouter from "./routes/user.router";
import cors from "cors";
import bodyParser from "body-parser";
import auditRouter from "./routes/audit.router";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { errorHandlerMW } from "./middlewares/errorHandler.middleware";
import authRouter from "./routes/auth.router";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/stores", storeRoutes);
app.use("/api/v1/audit-logs", auditRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/login", authRouter);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandlerMW);
export default app;

//@s34XEzW3pdKpbt---mettwaly-labs
