import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";
import serverless from "serverless-http";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  "mongodb+srv://itayh2:itayH123!@recipes.jamhxgc.mongodb.net/recipes?retryWrites=true&w=majority"
);

const router = express.Router();
router.get("/", (req, res) => {
  res.send("App is running..");
});
app.use("/", router);
export const handler = serverless(app);

// app.listen(3001, () => {
//   console.log("SERVER RUNNING");
// });
