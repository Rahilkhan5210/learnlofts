import express from "express";
const router=express.Router();

import  upload from "../Utils/Multer.js";
import {uploadMedia} from "../Utils/Cloudinary.js";

router.route("/upload-video").post(upload.single("file"),async(req,res)=>{
    try {
       const result = await uploadMedia(req.file.path);
       res.status(200).json({
        success:true,
        message:"Video uploaded successfully",
        data:result
       }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"error",
            message:"Error uploading video",
        })
    }
});

export default router;