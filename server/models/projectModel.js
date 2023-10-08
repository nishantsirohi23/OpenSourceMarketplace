const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    name: {
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
const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
   
    
},{timestamps:true});

const projectSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    skillsRequired: {
        type: [skillSchema], // Array of skill objects
        required: true,
    },
    tasks:{
        type:[taskSchema], //Array of task objects
        required:false,
    },
    tags:{
        type:[String],
        required:false,
    },
    creators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    contributors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    timeline: {
        type: String, // You can use Date type if you need date-based timelines
        required: true,
    },
    // Other project fields
    // ...
    createdDate: {
        type: Date,
        default: Date.now,
    },
    
},{
    timestamps:true,});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;