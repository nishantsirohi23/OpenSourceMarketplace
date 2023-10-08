const Project =  require('../models/projectModel.js');
const User = require('../models/userModel.js');

  
const create = async (req, res) => {
    const {
        name,
        projectId,
        description,
        skillsRequired,
        timeline,
        creatorId,
        tasks,
        tags // First creator ID from the request body
    } = req.body;

    try {
        // Check if a project with the same projectId already exists
        const existingProject = await Project.findOne({ projectId });

        if (existingProject) {
            return res.status(400).json({ error: 'Project with the same projectId already exists' });
        }

        // Create a new project with the provided data
        const newProject = new Project({
            name,
            projectId, // Unique projectId field
            description,
            skillsRequired,
            timeline,
            tags,
            tasks,
            creators: [creatorId], // Store the first creator ID in the creators array
        });

        const savedProject = await newProject.save();

        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const addcontributors = async (req, res) => {
    const { projectId, userId } = req.body;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        if (project.contributors.includes(userId)) {
            return res.status(400).json({ error: 'User is already a contributor of this project' });
        }

        // Add the user ID to the contributors array
        project.contributors.push(userId);

        // Save the updated project
        const updatedProject = await project.save();

        res.json(updatedProject);
    } catch (error) {
        console.error('Error adding contributor to project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const addcreators = async (req, res) => {
    const { projectId, creatorId, userId } = req.body;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        if (!project.creators.includes(creatorId)) {
            return res.status(400).json({ error: 'You are not authorized to add creator' });
        }
        if (project.creators.includes(userId)) {
            return res.status(400).json({ error: 'User is already a creator of this project' });
        }

        // Add the user ID to the creators array
        project.creators.push(userId);

        // Save the updated project
        const updatedProject = await project.save();

        res.json(updatedProject);
    } catch (error) {
        console.error('Error adding creator to project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getproject = async (req, res) => {
  try {
    // Retrieve a project by its ID
    const projectId = req.params.projectId;

    const project = await Project
      .findById(projectId)
      .populate('contributors', 'username pic') // Populate the contributors field with username and profilePicture
      .populate('creators', 'username pic') // Populate the creator field with username and profilePicture
      .populate('tasks.assignedTo', 'username pic'); // Populate the assignedTo field of tasks with username and profilePicture

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const feed = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch all projects from the database with populated creator, contributors, and collaborators
    const allProjects = await Project.find()
      .populate('creators', 'username pic')
      .populate('contributors', 'username pic')
      .populate('creators', 'username pic');

    // Filter out projects in which the user is either a creator or contributor
    const nonContributorProjects = allProjects.filter((project) => {
      const isUserCreator = project.creators.some((creator) => creator._id.toString() === userId);
      const isUserContributor = project.contributors.some((contributor) => contributor._id.toString() === userId);
      return !isUserCreator && !isUserContributor;
    });

    // Calculate match percentages for each remaining project
    const projectsWithMatchPercentage = nonContributorProjects.map((project) => ({
      project,
      matchPercentage: calculateMatchPercentage(user.skillsAndExpertise, project.skillsRequired.map(skill => skill.name)),
    }));

    // Filter projects with a match percentage above or equal to 20 percent
    const relevantProjects = projectsWithMatchPercentage.filter((projectWithMatch) => projectWithMatch.matchPercentage >= 20);

    // Return user skills and matching percentages with projects
    const userSkillsAndMatch = relevantProjects.map((projectWithMatch) => ({
      userSkills: user.skillsAndExpertise,
      project: projectWithMatch.project,
      matchPercentage: projectWithMatch.matchPercentage,
    }));

    res.json({ userSkillsAndMatch });
  } catch (error) {
    console.error('Error fetching relevant projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const getprojectforcreator = async (req, res) => {
    try {
        const userId = req.params.userId;
    
        // Find all projects where the user is a creator
        const projects = await Project.find({ creators: userId });
    
        // Fetch contributors and their profile pictures for each project
        const projectsWithContributors = await Promise.all(
          projects.map(async (project) => {
            const contributors = await User.find({ _id: { $in: project.contributors } });
            const contributorsWithProfilePictures = contributors.map((contributor) => ({
              _id: contributor._id,
              username: contributor.username,
              profilePicture: contributor.pic,
            }));
    
            return {
              project: {
                _id: project._id,
                name: project.name,
                description: project.description,
                tasks: project.tasks,
                // Add other project fields as needed
              },
              contributors: contributorsWithProfilePictures,
            };
          })
        );
    
        res.json({ projects: projectsWithContributors });
      } catch (error) {
        console.error('Error fetching projects for creator:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
};
const collabfeed = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find projects where the user is a creator
      const creatorProjects = await Project.find({ creators: userId });
  
      // Fetch relevant users for each creator project
      const relevantUsersWithMatch = await Promise.all(
        creatorProjects.map(async (project) => {
          // Extract the project IDs from creatorProjects
          const creatorProjectIds = creatorProjects.map((project) => project._id);
  
          // Find users who are not included in the creator or contributor of the project
          const relevantUsers = await User.find({
            $and: [
              { _id: { $ne: userId } }, // Exclude the user themself
              { _id: { $nin: project.contributors } }, // Exclude users in project's contributors
              { _id: { $nin: project.creators } }, // Exclude users in project's creators
            ],
          });
  
          // Retrieve the required skills for the project (assuming it's an array of skill names)
          const requiredSkills = project.skillsRequired.map((skill) => skill.name);
  
          // Calculate the match percentage for each relevant user
          const usersWithMatch = relevantUsers.map((relevantUser) => {
            const matchPercentage = calculateMatchPercentage(relevantUser.skillsAndExpertise, requiredSkills);
  
            // Include the user, project, and match percentage
            return {
              user: relevantUser,
              project: project,
              matchPercentage: matchPercentage,
            };
          });
  
          // Filter users with a match percentage above or equal to 20 percent
          const filteredUsersWithMatch = usersWithMatch.filter((userWithMatch) => userWithMatch.matchPercentage >= 20);
  
          return filteredUsersWithMatch;
        })
      );
  
      // Flatten the array of usersWithMatch
      const relevantUsers = relevantUsersWithMatch.flat();
  
      // Return the relevant users with match percentages
      res.json({ relevantUsers });
    } catch (error) {
      console.error('Error fetching relevant users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
function calculateMatchPercentage(userSkills, projectSkills) {
  // Ensure both userSkills and projectSkills are arrays
  if (!Array.isArray(userSkills) || !Array.isArray(projectSkills)) {
   throw new Error('Skills must be provided as arrays');
  }
  
    // Calculate the number of matching skills
  const matchingSkills = userSkills.filter((userSkill) => projectSkills.includes(userSkill.skill));
  
    // Calculate the match percentage
  const matchPercentage = (matchingSkills.length / projectSkills.length) * 100;
  
  return matchPercentage;
}
const update = async (req,res) => {

};
const addTask = async (req,res) => {
  try {
    const projectId = req.params.projectId;

    // Find the project by its ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Create a new task based on the request body
    const newTask = {
      name: req.body.name,
      description: req.body.description,
      link: req.body.link,
      status: req.body.status,
    };

    // Add the task to the project's tasks array
    project.tasks.push(newTask);

    // Save the updated project
    await project.save();

    res.status(201).json({ message: 'Task added successfully', task: newTask });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const gettask = async (req,res) => {
  const userId = req.params.userId;

  try {
    // Find the user's projects where they are a creator or contributor
    const projects = await Project.find({
      $or: [{ creators: userId }, { contributors: userId }],
    })
      .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
      .limit(6) // Limit to the six most recent tasks
      .select('tasks'); // Select only the tasks field

    // Extract and flatten the tasks from all projects
    const tasks = projects.reduce((result, project) => {
      return result.concat(project.tasks);
    }, []);

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const search = async (req,res) => {
  const searchString = req.params.search;
  
  try {
    // Use a regular expression with 'i' flag for case-insensitive search
    const projects = await Project.find({
      $or: [
        { name: { $regex: new RegExp(searchString, 'i') } }, // Search project name
        { tags: { $in: [new RegExp(searchString, 'i')] } }, // Search tags
        { 'skillsRequired.name': { $regex: new RegExp(searchString, 'i') } }, // Search skill names
      ],
    });

    res.json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getprojectforcollab = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find projects where the user is a contributor
    const collaboratorProjects = await Project.find({
      contributors: userId,
    }).populate('creators', 'username pic').populate('contributors', 'username pic');
    
    // Now `collaboratorProjects` will contain the populated creator and contributor details
    

    // Iterate through collaborator projects and fetch user details for assigned tasks
    const projectsWithAssignedUser = await Promise.all(
      collaboratorProjects.map(async (project) => {
        const projectWithAssignedTasks = await Promise.all(
          project.tasks.map(async (task) => {
            if (task.assignedTo) {
              const assignedUser = await User.findById(task.assignedTo);
              return {
                ...task.toObject(),
                assignedUser: assignedUser ? assignedUser.toObject() : null,
              };
            }
            return task.toObject();
          })
        );

        return {
          ...project.toObject(),
          tasks: projectWithAssignedTasks,
        };
      })
    );

    res.json({ collaboratorProjects: projectsWithAssignedUser });
  } catch (error) {
    console.error('Error fetching collaborator projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const assignTask = async (req,res) => {
  
    const { projectId, taskId,userId } = req.body;
  
    try {
      // Find the project by ID
      const project = await Project.findById(projectId);
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      // Find the task within the project
      const taskIndex = project.tasks.findIndex((task) => task._id == taskId);
  
      if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found in the project' });
      }
  
      // Update the task's assignedTo and status
      project.tasks[taskIndex].assignedTo = userId;
      project.tasks[taskIndex].status = 'assigned';
  
      // Save the updated project
      await project.save();
  
      res.json({ message: 'Task assignment updated successfully' });
    } catch (error) {
      console.error('Error updating task assignment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  
};
const completeTask = async (req,res) => {
  const { projectId, taskId } = req.body;

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Find the task within the project
    const taskIndex = project.tasks.findIndex((task) => task._id == taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found in the project' });
    }

    // Update the task status to completed
    project.tasks[taskIndex].status = 'completed';

    // Save the updated project
    await project.save();

    res.json({ message: 'Task status updated to completed' });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getLatest = async (req,res) => {
  try {
    const userId = req.params.userId;

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Query the Task collection to find the latest completed task by the user
    const latestCompletedTask = await Task.findOne({
      assignedTo: userId,
      status: 'completed'
    })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order to get the latest
      .limit(1);

    if (!latestCompletedTask) {
      return res.json({ message: 'No completed tasks found for this user' });
    }

    // Return the latest completed task as a JSON response
    res.json(latestCompletedTask);
  } catch (error) {
    console.error('Error fetching latest completed task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

};
const contributorTask = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find all projects where the user is a contributor
    const projects = await Project.find({ contributors: userId });

    if (!projects || projects.length === 0) {
      return res.status(200).json({ assignedTasks: [], completedTasks: [] });
    }

    const assignedTasks = [];
    const completedTasks = [];

    // Iterate through projects and tasks to categorize them
    projects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (task.assignedTo && task.assignedTo.equals(userId)) {
          if (task.status === 'assigned') {
            assignedTasks.push(task);
          } else if (task.status === 'completed') {
            completedTasks.push(task);
          }
        }
      });
    });

    res.status(200).json({ assignedTasks, completedTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const collabTask = async (req,res) => {
  const userId = req.params.userId;

  try {
    // Find all projects where the user is the creator
    const projects = await Project.find({ creators: userId });

    if (!projects || projects.length === 0) {
      return res.status(200).json({  notDoneTasks, assignedTasks, completedTasks });
    }

    const notDoneTasks = [];
    const assignedTasks = [];
    const completedTasks = [];

    // Iterate through projects and tasks to categorize them
    projects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (task.status === 'not done') {
          notDoneTasks.push(task);
        } else if (task.status === 'assigned') {
          assignedTasks.push(task);
        } else if (task.status === 'completed') {
          completedTasks.push(task);
        }
      });
    });

    res.status(200).json({ notDoneTasks, assignedTasks, completedTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports =  { create,
  collabTask,
   addcreators,
   contributorTask,
    addcontributors,
     getproject,
      feed ,
      collabfeed,
      getprojectforcreator,
      addTask,
      gettask,
      search,
      getprojectforcollab,
    assignTask,
  completeTask,getLatest};
