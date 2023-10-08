const { model } = require('mongoose');
const Blog = require('../models/blogModel')
const User = require('../models/userModel.js')
const createBlog = async (req, res) => {
  try {
      // Extract the blog data from the request body
      const { postedBy, text, category, title, description } = req.body;
      const img = "https://cdn.dribbble.com/users/485324/screenshots/1581316/media/064c8ebfd6fe64a102e9223e64ef2457.jpg?resize=800x600&vertical=center";

      // Convert each string inside the 'category' array to lowercase
      const lowercaseCategories = category.map((cat) => cat.toLowerCase());

      // Create a new blog document
      const newBlog = new Blog({
          postedBy,
          text,
          category: lowercaseCategories, // Use the converted array
          img,
          title,
          description
      });

      // Save the new blog document to the database
      await newBlog.save();

      // Respond with a success message
      res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
      // Handle any errors that occur during the blog creation process
      console.error('Error creating blog:', error);
      res.status(500).json({ error: 'An error occurred while creating the blog' });
  }
};


const getUserBlogs = async (req, res) => {
    const { username } = req.params;
    try {
      // Find the user by their username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find all blogs posted by the user, sorted by updatedAt in descending order
      const userBlogs = await Blog.find({ postedBy: user._id }).sort({ updatedAt: -1 });
  
      // Respond with the user's blogs
      res.status(200).json({ blogs: userBlogs });
    } catch (error) {
      console.error('Error getting user blogs:', error);
      res.status(500).json({ error: 'An error occurred while getting the user blogs' });
    }
  };

const likeblog = async (req, res) => {
  try {
    const { blogId, userId } = req.body;

    // Check if the blog and user exist
    const blog = await Blog.findById(blogId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if(!blog){
      return res.status(404).json({error:"Blog not found"})
    }

    if(blog.postedBy.toString() == userId){
      return res.status(404).json({error:"You cannot like your own blog"})
    }

    // Check if the user has already liked the blog
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      // User has already liked the blog, so we'll unlike it
      blog.likes = blog.likes.filter((like) => like.toString() !== userId);

      // Save the updated blog document
      await blog.save();

      res.status(200).json({ message: "Blog unliked successfully" });
    } else {
      // User hasn't liked the blog, so we'll add the like
      blog.likes.push(userId);

      // Save the updated blog document
      await blog.save();

      res.status(200).json({ message: "Blog liked successfully" });
    }
  } catch (error) {
    console.error("Error liking/unliking blog:", error);
    res.status(500).json({ error: "An error occurred while liking/unliking the blog" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.body;

    // Check if the blog exists
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Delete the blog from the database using deleteOne
    await Blog.deleteOne({ _id: blogId });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "An error occurred while deleting the blog" });
  }
};
const blogsbycategory = async (req, res) => {
  try {
    let { category } = req.params;
    category = category.toLowerCase();

    // Query blogs that match the specified category
    const blogs = await Blog.find({ category });

    res.status(200).json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    res.status(500).json({ error: "An error occurred while fetching blogs by category" });
  }
};

const feed = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get the user's interests
    const userInterests = user.researchInterests || [];

    // Define the query for blogs
    let blogQuery = {};

    // If userInterests is not empty, filter by interests
    if (userInterests.length > 0) {
      blogQuery = { category: { $in: userInterests } };
    }

    // Query blogs based on the defined query
    const blogs = await Blog.find(blogQuery).sort({ updatedAt: -1 });

    res.status(200).json({ blogs });
  } catch (error) {
    console.error("Error fetching user's feed:", error);
    res.status(500).json({ error: "An error occurred while fetching the user's feed" });
  }
};

const getBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ blog });
  } catch (error) {
    console.error("Error getting blog:", error);
    res.status(500).json({ error: "An error occurred while getting the blog" });
  }
};
  

module.exports = { createBlog , getUserBlogs,likeblog,deleteBlog,blogsbycategory,feed,getBlog};