import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getAllJobs, getJobById, jobsCreated, postJob } from "../controllers/jobController.js";
 
const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/get", isAuthenticated, getAllJobs);
router.get("/getjobscreated", isAuthenticated, jobsCreated);
router.get("/get/:id", isAuthenticated, getJobById);

export default router;
