const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  branch: String,
  Date_of_Joining: String,
  company: String,
  duration: String,
  stipend: String
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
