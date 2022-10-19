require("dotenv").config();
import config from "config";
import express from "express";
import router from "./routes";

const app = express();

const port = config.get("port");

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
