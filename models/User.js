const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: "Please enter First name", max: 50 },
  lastName: { type: String, required: "Please enter Last name", max: 50 },
  title: { type: String, required: "Please enter position title", max: 100 },
  company: { type: String, required: "Please enter company name", max: 100 }
});

// Virtual full name
UserSchema.virtual("name").get(function() {
  return this.firstName + " " + this.lastName;
});

// Create model
const User = mongoose.model("User", UserSchema);

// export model

module.exports = User;
