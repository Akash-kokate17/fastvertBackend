const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://akashkokate1717:wR8PkkcvYsWZqCIW@fastvertassigment.zl9ypz4.mongodb.net/dynamicH1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const h1Schema = new mongoose.Schema({
  text: String,
});

const H1Text = mongoose.model("H1Text", h1Schema);

app.get("/api/h1", async (req, res) => {
  const h1 = await H1Text.findOne();
  res.json(h1);
});

app.post("/api/h1", async (req, res) => {
  const { text } = req.body;
  let h1 = await H1Text.findOne();
  if (!h1) {
    h1 = new H1Text({ text });
  } else {
    h1.text = text;
  }
  await h1.save();
  res.json(h1);
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
