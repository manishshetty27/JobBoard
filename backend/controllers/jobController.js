import { Job } from "../models/jobModel.js"
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body
        if (!title || !description || !requirements || !salary || !location || !jobType || experience === undefined || !position || !companyId) {
            return res.status(400).json({
                message: "Fill all the fields!",
                success: false
            })
        }
        const userId = req.id
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceYears: experience,
            position,
            company: companyId,
            created_by: userId
        })
        return res.status(201).json({
            message: "Job created successfully",
            job,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: `Something went wrong: ${error.message}`,
            success: false
        })
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1})
        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: `Something went wrong: ${error.message}`,
            success: false
        })
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path:"company"
        }).sort({createdAt:-1})
        if (job.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error){
        res.status(400).json({
            message: `Something went wrong: ${error.message}`,
            success: false
        })
    }
}

export const jobsCreated = async (req, res) => {
    try {
        const adminId = req.id
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:"company"
        }).sort({createdAt:-1})
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error){
        res.status(400).json({
            message: `Something went wrong: ${error.message}`,
            success: false
        })
    }
}