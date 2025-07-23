
//sendData.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Certification from "../Models/Certifications.Model.js";
import connectDB from "./db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function getAssetsData() {
    try {
        const filePath = path.join(__dirname, '../backendassets/frontend_assets/certifications.json');
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);

        // Flatten all certifications into a single array from all categories
        const certifications = [];
        for (const categoryKey in data) {
            if (Array.isArray(data[categoryKey])) {
                certifications.push(...data[categoryKey]);
            }
        }

        if (certifications.length === 0) {
            throw new Error('No certification objects found in the file');
        }

        console.log('Certifications loaded from JSON:', certifications.length);

        return certifications;
    } catch (error) {
        console.error('Error reading certifications file:', error);
        throw error;
    }
}


async function createCertificationRecords(certifications) {
    return certifications.map(cert => {
        // Handle key highlights (could be key_1, key_2, key_3 or key_points)
        let keyHighlights = [];
        if (cert.key_1 || cert.key_2 || cert.key_3) {
            keyHighlights = [cert.key_1, cert.key_2, cert.key_3].filter(Boolean);
        } else if (Array.isArray(cert.key_points)) {
            keyHighlights = cert.key_points;
        }

        // Handle course benefits (could be Course_Benefits, Course_Benefits_2, Course_Benefits_3, or course_benefits)
        let courseBenefits = [];
        if (cert.Course_Benefits || cert.Course_Benefits_2 || cert.Course_Benefits_3) {
            courseBenefits = [cert.Course_Benefits, cert.Course_Benefits_2, cert.Course_Benefits_3].filter(Boolean);
        } else if (Array.isArray(cert.course_benefits)) {
            courseBenefits = cert.course_benefits;
        }

        // Handle roadmap (could be Road_map or road_map)
        let roadMap = [];
        if (Array.isArray(cert.Road_map)) {
            roadMap = cert.Road_map;
        } else if (Array.isArray(cert.road_map)) {
            roadMap = cert.road_map;
        }

        return {
            id: cert.id,
            title: cert.title,
            description: cert.description,
            price: cert.price,
            image: cert.image ? `/frontend_assets/${cert.image}` : undefined,
            publicId: cert.image ? cert.image.split('.')[0] : undefined,
            category: cert.category,
            duration: cert.duration,
            tag: cert.tag,
            tagColor: cert.tagColor,
            syllabus_pdf: cert.syllabus_pdf || null,
            introduction: cert.introduction,
            key_1: cert.key_1 || (Array.isArray(cert.key_points) ? cert.key_points[0] : undefined),
            key_2: cert.key_2 || (Array.isArray(cert.key_points) ? cert.key_points[1] : undefined),
            key_3: cert.key_3 || (Array.isArray(cert.key_points) ? cert.key_points[2] : undefined),
            Course_Benefits: cert.Course_Benefits || (Array.isArray(cert.course_benefits) ? cert.course_benefits[0] : undefined),
            Course_Benefits_2: cert.Course_Benefits_2 || (Array.isArray(cert.course_benefits) ? cert.course_benefits[1] : undefined),
            Course_Benefits_3: cert.Course_Benefits_3 || (Array.isArray(cert.course_benefits) ? cert.course_benefits[2] : undefined),
            Road_map: Array.isArray(cert.Road_map) ? cert.Road_map : (Array.isArray(cert.road_map) ? cert.road_map : []),
            course_content: cert.course_content || []
        };
    });
}

async function sendDataToDB() {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        // Clear existing data
        await Certification.deleteMany({});
        console.log('Cleared existing certifications');

        // Get certifications from JSON file
        const certifications = await getAssetsData();
        console.log(`Found ${certifications.length} certifications`);

        // Create certification records
        const certificationRecords = await createCertificationRecords(certifications);

        // Insert new data
        await Certification.insertMany(certificationRecords);
        console.log('Successfully inserted new certifications');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

sendDataToDB();

