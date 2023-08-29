import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const itemSchema = mongoose.Schema({
  name: String,
  chain: Number
});

const Item = mongoose.model("Item", itemSchema)

const item1 = new Item({
  name: "Welcome to ToDoList",
  chain: 1
});
const item2 = new Item({
  name: "Hit the + button to add a new item",
  chain: 1
});
const item3 = new Item({
  name: "-- Hit to delete an item",
  chain: 1
});

const defaultItems = [item1, item2, item3];

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  let data = wave();  
  let items = await Item.find({chain: 1});
  res.render("index.ejs", {dannie: data, divi: items});
}); 

app.post("/", async (req, res) => {
  let info = req.body.some;
  let data = wave();
  let newItem = new Item({
    name: info,
    chain: 1
  });
  await newItem.save();
  let items = await Item.find({chain: 1}); 
  defaultItems.push(newItem);
  res.render("index.ejs", {dannie: data, divi: items});
});

app.get("/work", async (req, res) => {  
  let data = wave();
  let items = await Item.find({chain: 2});
  res.render("work.ejs", {dannie: data, divi: items});
});

app.post("/work", async (req, res) => {
  let info = req.body.some;
  let data = wave();
  let newItem = new Item({
    name: info,
    chain: 2
  });
  await newItem.save();
  let items = await Item.find({chain: 2});
  defaultItems.push(newItem);
  res.render("index.ejs", {dannie: data, divi: items});
});

app.post("/deleteformain", async (req, res) => {
  let toDel = req.body.id;
  await Item.deleteMany({_id: toDel});  
  let data = wave();
  let items = await Item.find({chain: 1});
  res.render("index.ejs", {dannie: data, divi: items});
});

app.post("/deleteforwork", async(req, res) => {
  let toDel = req.body.id;
  await Item.deleteMany({_id: toDel});  
  let data = wave();
  let items = await Item.find({chain: 2});
  res.render("index.ejs", {dannie: data, divi: items});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

let wave = function(){
  let date = new Date();
  let week = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday", "Sunday"];
  let month = date.getMonth();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let day = date.getDay();
  let data = {
    monthdate: months[month],
    dayofweek: week[day],
    dayofmonth: date.getDate(),
  };
  return data;
}