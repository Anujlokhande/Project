const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Air");
}

main()
  .then(() => {
    console.log("Working");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await Listing.deleteMany({});
  data.data = data.data.map((obj) => ({
    ...obj,
    owner: "673f184db13c9b92706632d5",
  }));
  await Listing.insertMany(data.data);
  console.log("Data Was Initialized");
};

initDB();
