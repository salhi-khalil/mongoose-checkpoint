let mongoose = require("mongoose");
let express = require("express");
const connectDB = require("./database");
let app = express();
let port = 5600;
const Person = require('./models/personModel');
connectDB();
app.use(express.json());

app.listen(port, (err) =>
  err ? console.log("error in server running", err) : console.log(`server is running on ${port}`)
);

app.get('/', function(req, res) {
  res.send( '<h1>hello everybody : Each one of you is my friend</h1>');
});

app.get("/add", (req, res) => {
  const person1 = new Person({
    name: "yosra",
    age: 28,
    favoriteFoods: ["pizza", "couscous", "pasta"],
  });
  person1.save((err) => {
    err ? console.log("error while saving", err) : console.log("successfully saved");
  });
});

app.get("/add_many", (req, res) => {
  Person.create([
    { name: "wassim", age: 32, favoriteFoods: ["fruits", "lasagna", "fishs"] },
    { name: "nasr", age: 30, favoriteFoods: ["sushi", "loubya"] },
    { name: "nada", age: 15, favoriteFoods: ["cookies", "chicken wing", "spaghetti"] },
  ]);
});

let name = "bachir";                // it will  respond and give  an empty string
app.get("/search", (req, res) => {
  Person.find({ name: name })
    .then((result) => {
      console.log(result);
      res.send(result);

    })
    .catch((err) => {
      console.log("error occured while searching", err);
    });
});


app.get("/findOne", (req, res) => {
  Person.findOne({ favoriteFoods: { $in: ["chicken wings", "spaghetti"] } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("error occured while searching", err);
    });
});



const personId = "60d1275cdf8c75a941514c24";
app.get("/update", (req, res) => {
  Person.findById(personId, (err, personFound) => {
    if (err) {
      console.log("error while searching", err);
    } else {
      personFound.favoriteFoods.push("couscous");
      personFound
        .save()
        .then((response) => {
          console.log("person saved successfully", personFound);
        })
        .catch((err) => console.log("error occured while saving", err));
    }
  });
});
