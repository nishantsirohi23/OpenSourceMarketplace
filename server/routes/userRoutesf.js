const  express = require("express");

const router = express.Router();

const  { signupUser, loginUser ,updateUser,getUser,incProfileViews,incTasksCompleted} = require("../controllers/userController.js");
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.put("/update/:userId", updateUser);
router.get("/get/:userId", getUser);
router.patch("/incProfileViews/:userId/:day", incProfileViews);
router.patch("/incTasksCompleted/:userId/:day", incTasksCompleted);


module.exports =  router;
