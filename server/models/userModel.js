const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const skillSchema = mongoose.Schema({
  skill: {
    type: String,
    required: true,
  },
  expertiseLevel: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

const dailyStatsSchema = mongoose.Schema({
  day: {
    type: String,
    enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    required: true,
  },
  profileViews: {
    type: Number,
    default: 0,
  },
  tasksCompleted: {
    type: Number,
    default: 0,
  },
});

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    username: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    bio: { type: String, required: false },
    skillsAndExpertise: [skillSchema],
    availability: {
      type: String,
    },
    researchInterests: [String],
    verificationStatus: {
      type: Boolean,
      default: false,
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    weeklyProfileViews: {
      type: Number,
      default: 0,
    },
    tasksCompletedPerWeek: {
      type: Number,
      default: 0,
    },
    dailyStats: [dailyStatsSchema], // Daily statistics from Sunday to Saturday
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
