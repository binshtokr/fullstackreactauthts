import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import { initDatabase } from '../src/models/Person';
import personRouter from '../src/routes/personRouter';
import { errorMiddleware } from "../src/middlewares/errorMiddlerware"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

initDatabase();

app.use(cors());
app.use(express.json());
app.use('/api', personRouter);
app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});