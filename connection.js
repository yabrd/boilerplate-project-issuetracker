const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
const db = mongoose.connect(url)

module.exports = db;