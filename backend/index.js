const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mata3im_rahma", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: String,
  availability: String,
  shifts: [{ date: String, time: String, task: String }],
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);
const shiftSchema = new mongoose.Schema({
  date: String,
  time: String,
  task: String,
  spots: Number,
});

const Shift = mongoose.model("Shift", shiftSchema);

app.post("/api/volunteers", async (req, res) => {
  const { name, email, skills, availability } = req.body;
  const volunteer = new Volunteer({ name, email, skills, availability, shifts: [] });
  await volunteer.save();
  res.status(201).json({ message: "Volunteer signed up successfully", volunteer });
});

app.get("/api/volunteers", async (req, res) => {
  const volunteers = await Volunteer.find();
  res.json(volunteers);
});


app.get("/api/shifts", async (req, res) => {
  const shifts = await Shift.find();
  if (shifts.length === 0) {
    const initialShifts = [
      { date: "2025-03-15", time: "4:00 PM - 6:00 PM", task: "Meal Preparation", spots: 5 },
      { date: "2025-03-16", time: "5:00 PM - 7:00 PM", task: "Serving Iftar", spots: 3 },
      { date: "2025-03-17", time: "3:00 PM - 5:00 PM", task: "Cleanup", spots: 4 },
    ];
    await Shift.insertMany(initialShifts);
    res.json(initialShifts);
  } else {
    res.json(shifts);
  }
});

app.post("/api/volunteers/:email/shifts", async (req, res) => {
  const { email } = req.params;
  const { shiftId } = req.body;
  const shift = await Shift.findById(shiftId);
  if (!shift || shift.spots <= 0) {
    return res.status(400).json({ message: "Shift not available" });
  }
  const volunteer = await Volunteer.findOne({ email });
  if (!volunteer) {
    return res.status(404).json({ message: "Volunteer not found" });
  }
  volunteer.shifts.push({ date: shift.date, time: shift.time, task: shift.task });
  shift.spots -= 1;
  await volunteer.save();
  await shift.save();
  res.json({ message: "Shift assigned successfully", shift });
});

app.listen(5000, () => console.log("Server running on port 5000"));