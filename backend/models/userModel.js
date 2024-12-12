import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["student", "recruiter"]
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resumeURL: { type: String },
        resumeName: { type: String },
        company: { type: mongoose.Schema.ObjectId, ref: "Company" },
        profilePhoto: {
            type: String,
            default: ""
        }
    }, 
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)