const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
  coins: { type: Number, default: 1000 },
  bank: { type: Number },
  Company: 
    {
    miners: { type: Number, require: true  },
    workers: { type: Number },
  },
  Items:
  {
    placeholder: { type: Number },
    Cookies: { type: Number },
    FishingRod: { type: Number },
  
  },
  cooldowns: 
  {
    Beg: {},
    Mine: {},
    Hourly: {},
  }

 
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;
