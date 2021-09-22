import express from "express";
import { HOST, PORT } from "./constants";
import { ContainersController } from "./controllers/containers";

const app = express();

app.use("/containers", ContainersController);

app.listen(PORT, HOST, () => console.log("Started"));