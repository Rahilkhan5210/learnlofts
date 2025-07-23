import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../Models/Blog.Model.js";
import connectDB from "./db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getBlogsData() {
    try {
        const filePath = path.join(__dirname, '../backendassets/frontend_assets/blogs.json');
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('No blog objects found in the file');
        }
        console.log('Blogs loaded from JSON:', data.length);
        return data;
    } catch (error) {
        console.error('Error reading blogs file:', error);
        throw error;
    }
}

async function sendBlogsToDB() {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        // Clear existing blogs
        await Blog.deleteMany({});
        console.log('Cleared existing blogs');

        // Get blogs from JSON file
        const blogs = await getBlogsData();
        console.log(`Found ${blogs.length} blogs`);

        // Insert new data
        await Blog.insertMany(blogs);
        console.log('Successfully inserted new blogs');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

sendBlogsToDB(); 