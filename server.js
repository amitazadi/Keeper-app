const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://admin-amitazadi:Amit-123@cluster0.b14tb.mongodb.net/keeperDB",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const noteSchema = {
  title: String,
  content: String,
};

const Note = mongoose.model("Note", noteSchema);

app.get("/", function (req, res) {
  res.redirect("/home");
});

app.get("/home", function (req, res) {
  Note.find({}, function (err, item) {
    if (!err) {
      res.json(item);
    }
  });
});

app.post("/add", function (req, res) {
  const title1 = req.body.title;
  const content1 = req.body.content;

  const newNote = new Note({
    title: title1,
    content: content1,
  });

  console.log(newNote);
  newNote.save();
  res.redirect("/home");
});

app.post("/delete", function (req, res) {
  var user_id = req.body.user_id;
  Note.findByIdAndDelete({ _id: user_id }, function (err, note) {
    if (err) {
      console.log(err);
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log("Server is working on port 3001");
});
