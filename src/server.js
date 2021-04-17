import express from "express";
import morgan from "morgan";

const PORT = 4000;
const app = express();
const logger = morgan("dev");

app.use(logger);

app.get("/", (req, res) => {
  res.send("<h1> get! </h1>");
});

const handleListening = () =>
  console.log(`✔️  Server listening on port http://localhost:${PORT}`);
app.listen(4000, handleListening);
