const User =  require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const Project = require("../models/projectModel.js");

const signupUser = async (req, res) => {
	try {
		const { name, email, username, password ,type} = req.body;
		const user = await User.findOne({ $or: [{ email }, { username }] });

		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			username,
			password: hashedPassword,
            type,
            profilePicture: "",
            bio: "",
            location: "",
            skillsAndExpertise: [],
            availability: "",
            researchInterests: [],
            verificationStatus: false,
            lastActivityTimestamp: Date.now(),
            
		});
		await newUser.save();
		

		if (newUser) {

			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				username: newUser.username,
				bio: newUser.bio,
                type: newUser.type,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });


		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			username: user.username,
			bio: user.bio,
            type: user.type,
			profilePic: user.profilePic,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log("Error in loginUser: ", error.message);
	}
};
const updateUser = async (req, res) => {
    const userId = req.params.userId; // Extract the user ID from the URL
    const updates = req.body; // Data to update

    try {
        // Find the user by ID and update their information
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
const getUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find projects where the user is a contributor
        const contributorProjects = await Project.find({ contributors: userId });

        // Find projects where the user is a creator
        const creatorProjects = await Project.find({ creators: userId });

        // Fetch contributor user data for creator projects
        const creatorProjectsWithContributors = await Promise.all(
            creatorProjects.map(async (project) => {
                const contributorsData = await User.find({ _id: { $in: project.contributors } });
                return {
                    ...project.toObject(),
                    contributorsData: contributorsData
                };
            })
        );

        // Return the user data, contributor projects, and creator projects with contributor data
        res.json({
            user: user,
            contributorProjects: contributorProjects,
            creatorProjects: creatorProjectsWithContributors
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const incProfileViews = async (req, res) => {
    try {
        const { userId, day } = req.params;
    
        // Find the user by userId
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Find the daily stats object for the specified day
        const dailyStat = user.dailyStats.find((stat) => stat.day === day);
    
        if (!dailyStat) {
          return res.status(404).json({ error: 'Daily statistics not found for this day' });
        }
    
        // Increment profile views for the specified day
        dailyStat.profileViews += 1;
    
        // Save the updated user document
        await user.save();
    
        res.status(200).json({ message: 'Profile view incremented successfully' });
      } catch (error) {
        console.error('Error incrementing profile view:', error);
        res.status(500).json({ error: 'An error occurred while incrementing profile view' });
      }
  };
  
  const incTasksCompleted = async (req, res) => {
    try {
        const { userId, day } = req.params;
    
        // Find the user by userId
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Find the daily stats object for the specified day
        const dailyStat = user.dailyStats.find((stat) => stat.day === day);
    
        if (!dailyStat) {
          return res.status(404).json({ error: 'Daily statistics not found for this day' });
        }
    
        // Increment tasks completed for the specified day
        dailyStat.tasksCompleted += 1;
    
        // Save the updated user document
        await user.save();
    
        res.status(200).json({ message: 'Task completed incremented successfully' });
      } catch (error) {
        console.error('Error incrementing task completed:', error);
        res.status(500).json({ error: 'An error occurred while incrementing task completed' });
      }
  };



// Define the route



module.exports =  { signupUser,loginUser ,updateUser,getUser,incProfileViews,incTasksCompleted};