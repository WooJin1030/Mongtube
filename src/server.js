import express from "express";

const PORT = 4000;
const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.get("/", logger, (req, res) => {
  res.send("<h1> get! </h1>");
});

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);
app.listen(4000, handleListening);
