
const express = require("express");
const router = express.Router();
const {create,
    addcreators,
    addcontributors,
    feed,
    collabfeed,
    getprojectforcreator,
    getproject,
    addTask,
    gettask,
    getprojectforcollab,
    assignTask,
    completeTask,
    getLatest,
    contributorTask,
    collabTask,
     search} = require("../controllers/projectController");


router.post("/create", create);
router.post('/addcreators', addcreators);
router.post('/addcontributors', addcontributors);
router.get('/feed/:userId', feed);
router.get('/collabfeed/:userId', collabfeed);
router.get('/getprojectforcreator/:userId', getprojectforcreator);
router.get('/:projectId', getproject);
router.post('/addTask/:projectId', addTask);
router.get('/gettask/:userId', gettask);
router.get('/search/:search',search);
router.get('/getprojectforcollab/:userId', getprojectforcollab);
router.put('/assignTask', assignTask);
router.put('/completeTask', completeTask);
router.get('/getlatest/:userId', getLatest);
router.get('/contributortask/:userId', contributorTask);
router.get('/collabtask/:userId', collabTask);
module.exports = router;
