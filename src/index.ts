import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`running on port: ${port}`);
});