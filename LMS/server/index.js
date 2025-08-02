import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./Database/db.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from 'fs';
import blogRoutes from "./Routes/Blog.Route.js";


//import All Routes
import userRoutes from "./Routes/User.Route.js";
import courseRoutes from "./Routes/Course.Route.js";
import mediaRoutes from "./Routes/Media.Route.js";
import CoursePurchaseRoutes from "./Routes/CoursePurchase.Route.js";
import CourseProgressRoutes from "./Routes/CourseProgress.Route.js";
import CertificationsRoutes from "./Routes/Certifications.Route.js";
import formRoutes from './Routes/formRoutes.js';
dotenv.config();

connectDB();
const PORT = process.env.PORT || 8080;

 // Get the root directory
// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log the absolute paths for debugging
// console.log('Server root directory:', __dirname);
// console.log('PDF directory:', path.join(__dirname, "backendassets/pdfs"));
// console.log('Frontend assets directory:', path.join(__dirname, "backendassets/frontend_assets"));

// Configure CORS before any routes
app.use(cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.onrender.com"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Serve static files from the "Config/frontend_assets" folder
app.use("/frontend_assets", express.static(path.join(__dirname, "backendassets/frontend_assets")));

// Serve PDF files with CORS and logging
app.use("/pdfs", (req, res, next) => {
    try {
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.header('Access-Control-Allow-Methods', 'GET');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Credentials', 'true');
        
        const requestedFile = req.path;
        const pdfDir = path.join(__dirname, "backendassets/pdfs");
        
        console.log('PDF Request Debug:', {
            requestedPath: requestedFile,
            fullPath: path.join(pdfDir, requestedFile.substring(1)),
            pdfDirExists: fs.existsSync(pdfDir),
            pdfDirContents: fs.existsSync(pdfDir) ? fs.readdirSync(pdfDir) : [],
            __dirname: __dirname
        });
        
        // Get the list of files in the PDF directory
        if (!fs.existsSync(pdfDir)) {
            console.error('PDF directory does not exist:', pdfDir);
            return res.status(500).json({ 
                error: 'PDF directory not found',
                details: {
                    pdfDir,
                    __dirname
                }
            });
        }
        
        const files = fs.readdirSync(pdfDir);
        
        // Find a case-insensitive match
        const matchingFile = files.find(file => 
            file.toLowerCase() === requestedFile.substring(1).toLowerCase()
        );
        
        if (matchingFile) {
            // Use the actual filename with correct case
            const fullPath = path.join(pdfDir, matchingFile);
            console.log('PDF file found:', {
                requestedFile,
                matchedFile: matchingFile,
                fullPath,
                exists: true
            });
            // Set the matched file path for the static middleware
            req.url = '/' + matchingFile;
            next();
        } else {
            console.error('PDF file not found:', {
                requestedFile,
                availableFiles: files,
                pdfDir
            });
            return res.status(404).json({ 
                error: 'PDF file not found',
                requested: requestedFile,
                availableFiles: files,
                searchPath: pdfDir
            });
        }
    } catch (error) {
        console.error('Error in PDF middleware:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message,
            stack: error.stack
        });
    }
}, express.static(path.join(__dirname, "backendassets/pdfs")));

// default middlewares
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello, World!");
})

// All Api
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/certifications",CertificationsRoutes);
app.use("/api/v1/media",mediaRoutes);
app.use("/api/v1/purchase",CoursePurchaseRoutes);
app.use("/api/v1/progress", CourseProgressRoutes);
app.use('/api', formRoutes);
app.use('/api/v1/blogs', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});