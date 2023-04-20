// before starting: npm i mongoose
const { read } = require("fs");

// ----------------------------------- Import Mongoose ------------------------------------
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/warehouse");
// mongoose.connect("mongodb://localhost:27017/factory");
const db = mongoose.connection;

// -------------------------- Database Connection Error Handling --------------------------
db.on("error", console.error.bind(console, "connection error"));

// ------------------------------- Terminal Readline Section ------------------------------
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);
function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// -------------------------------- Start Function and Schema -------------------------------
async function start() {
  const robotSchema = new mongoose.Schema({
    creatorName: String,
    robotName: String,
    robotColor: String,
    killer: Boolean,
    friend: Boolean,
    serialNumber: Number,
    date: Date,
  });


// ------------------------------------------ Models -----------------------------------------
const Robot = mongoose.model("robots", robotSchema);

// ---------------------------------------- User Input ---------------------------------------
let action = await ask(
  `Welcome to the robot factory! What do you want to do? (Create, Read, Update, Delete)`
);

//                                        Assigning User Input
// ----------------------------------------- (C)reate -----------------------------------------
if (action === "Create" || action === "create") {
  let creatorName = await ask("Who is the creator?");
  let robotName = await ask("Designate this robot?");
  let robotColor = await ask("What color is this robot?");
  let friend = await ask("Is this robot a friend? Enter Y or N");

  if (friend === "N" || friend === "n") {
    let confirm = await ask("Are you sure your robot is a killer?");
    if (confirm === "y" || confirm === "Y") {
      friend = false;
      killer = true;
      console.log("Oh no! A killer robot!");
      date = new Date();
    } else {
      console.log(`Oh, good! Let's start over`);
      start();
    }

    //                                       Storing User Input
    // ----------------------------------------------------------------------------------------------
    const response = new Robot({
      creatorName: creatorName,
      robotName: robotName,
      robotColor: robotColor,
      friend: friend || null,
      killer: killer || null,
      serialNumber: serialNumber,
      date: date,
    });

    await response.save();
    console.log("Your robot has been created!");

    // -------------------------------------------- (R)ead ------------------------------------------
  } else if (action === "Read" || action === "read") {
    console.log("here")
    let allRobots = await Robot.find({});
    console.log(allRobots);

    // -------------------------------------------- (U)pdate ----------------------------------------
  } else if (action === "Update" || action === "update") {
    let allRobots = await Robot.find({});
    console.log(allRobots);

    let updateTarget = await ask(
      "What is the ID of the robot you want to update?"
    );
    let updateField = await ask("What field do you want to update?      ");
    let update = await ask("Enter a new value       ");

    // --------------------------------------------- (D)elete ---------------------------------------
  } else if (action === "Delete") {
    let allRobots = await Robot.find({});
    console.log(allRobots);
    let target = await ask(
      "What is the ID of the entry you want to delete?     "
    );
    await Robot.deleteOne({ _id: target });
    console.log("Your entry has been deleted.");
  } else {
    console.log("Invalid entry, try again.");
  }
  let answer = await ask("Would you like to create make another CRUD request?");
  if (
    answer === "y" ||
    answer === "Y" ||
    answer === "yes" ||
    answer === "Yes"
  ) {
    start();
  } else {
    process.exit();
  }
}
}
start();
