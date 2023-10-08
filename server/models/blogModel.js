const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
	{
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
			maxLength: 4000,
			required: true,
		},
		title: {
			type: String,
			maxLength: 50,
			required: true,
		},
		"description": {
			type: String,
			maxLength: 500,
			required: true,
		},
		img: {
			type: String,
		},
		likes: {
			// array of user ids
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
        category:[
            {type:String,
            required:false,
        },
        
        ],
		
	},
	{
		timestamps: true,
	}
);

const Blog = mongoose.model("blogs", blogSchema);

module.exports = Blog;
