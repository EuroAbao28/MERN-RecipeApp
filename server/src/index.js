import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/user-route.js";
import { recipesRouter } from "./routes/recipes-route.js";

const app = express();

// all the data sent in frontend will be converted into json format
app.use(express.json());
app.use(cors());

app.use("/", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  "mongodb+srv://abaoeuro2002:mymongodbpassword@recipe.4kr7scy.mongodb.net/recipe?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("SERVER STARTED!"));
