//controller
import Certification from "../Models/Certifications.Model.js";
import { uploadMedia, deleteMediaFromCloudinary } from "../Utils/Cloudinary.js";

// Upload a new certification
export const uploadCertification = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const {
      id,
      title,
      description,
      category,
      price,
      duration,
      tag,
      tagColor,
      introduction,
      key_1,
      key_2,
      key_3,
      Course_Benefits,
      Course_Benefits_2,
      Course_Benefits_3,
      syllabus_pdf,
      Road_map,
      course_content,
      requirements,
      exam_details,
      policies
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !price || !duration) {
      return res.status(400).json({ 
        error: "Missing required fields",
        missing: {
          title: !title,
          description: !description,
          category: !category,
          price: !price,
          duration: !duration
        }
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const file = req.file.path;
    console.log("File path:", file);

    const uploadResponse = await uploadMedia(file);
    console.log("Upload response:", uploadResponse);

    // Initialize default values for nested objects and arrays
    const defaultRequirements = {
      experience: ["5 years total work experience (1 year in decision-making role)",
        "Education waivers:",
        "Associate degree - 1 year waived",
        "Bachelor's degree - 3 years waived",
        "Graduate degree - 4 years waived"],
      decision_making: "Defined as authority to execute/control processes with outcome responsibility"
    };

    const defaultExamDetails = {
      format: "145 multiple-choice questions (135 scored)",
      duration: "4 hours 18 minutes (CBT)",
      delivery: [
        "Computer-Based Testing (Prometric)",
        "Paper-Based Testing (4 hours)"
      ],
      windows: "July and November annually",
      retake_fee: "333.00 (valid for 2 years)"
    };

    const defaultPolicies = {
      materials: "Open-book (bring approved references)",
      id_requirements: "Government-issued photo ID with signature",
      refund_policy: "130.00 processing fee for denied applications"
    };

    // Parse JSON strings and handle arrays properly
    let parsedRequirements;
    let parsedExamDetails;
    let parsedPolicies;
    let parsedCourseContent;
    let parsedRoadMap;

    try {
      // Handle requirements
      parsedRequirements = requirements ? 
        (typeof requirements === 'string' ? JSON.parse(requirements) : requirements) : 
        defaultRequirements;

      // Ensure experience array is not empty
      if (!parsedRequirements.experience || !parsedRequirements.experience.length) {
        parsedRequirements.experience = defaultRequirements.experience;
      }

      // Handle exam details
      parsedExamDetails = exam_details ?
        (typeof exam_details === 'string' ? JSON.parse(exam_details) : exam_details) :
        defaultExamDetails;

      // Ensure delivery array is not empty
      if (!parsedExamDetails.delivery || !parsedExamDetails.delivery.length) {
        parsedExamDetails.delivery = defaultExamDetails.delivery;
      }

      // Handle policies
      parsedPolicies = policies ?
        (typeof policies === 'string' ? JSON.parse(policies) : policies) :
        defaultPolicies;

      // Handle course content and road map
      parsedCourseContent = course_content ?
        (typeof course_content === 'string' ? JSON.parse(course_content) : course_content) :
        [];

      parsedRoadMap = Road_map ?
        (typeof Road_map === 'string' ? JSON.parse(Road_map) : Road_map) :
        [];

    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
      return res.status(400).json({ error: "Invalid JSON data in request" });
    }

    // Convert price to number if it's a string
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    const certification = new Certification({
      id,
      title,
      description,
      category,
      price: numericPrice,
      duration,
      tag,
      tagColor,
      introduction,
      key_1,
      key_2,
      key_3,
      Course_Benefits,
      Course_Benefits_2,
      Course_Benefits_3,
      Road_map: parsedRoadMap,
      course_content: parsedCourseContent,
      image: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      syllabus_pdf: syllabus_pdf || null,
      requirements: parsedRequirements,
      exam_details: parsedExamDetails,
      policies: parsedPolicies
    });

    console.log("Certification object before save:", certification);

    const savedCertification = await certification.save();
    console.log("Saved certification:", savedCertification);
    res.status(201).json(savedCertification);
  } catch (err) {
    console.error("Error creating certification:", err);
    res.status(500).json({ 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// Update a certification
export const updateCertification = async (req, res) => {
  try {
    console.log("Request Params:", req.params); // Log the route parameters
    console.log("Request Body:", req.body); // Log the request body

    const { id } = req.params;
    const {
      title,
      description,
      category,
      price,
      duration,
      tag,
      tagColor,
      introduction,
      key_1,
      key_2,
      key_3,
      Course_Benefits,
      Course_Benefits_2,
      Course_Benefits_3,
      Road_map,
      syllabus_pdf,
      requirements,
      exam_details,
      policies
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const certification = await Certification.findById(id);
    if (!certification) {
      return res.status(404).json({ message: "Certification not found" });
    }

    // Parse JSON strings if they exist
    const parsedRequirements = requirements ? JSON.parse(requirements) : undefined;
    const parsedExamDetails = exam_details ? JSON.parse(exam_details) : undefined;
    const parsedPolicies = policies ? JSON.parse(policies) : undefined;

    // Update fields
    certification.title = title || certification.title;
    certification.description = description || certification.description;
    certification.category = category || certification.category;
    certification.price = price || certification.price;
    certification.duration = duration || certification.duration;
    certification.tag = tag || certification.tag;
    certification.tagColor = tagColor || certification.tagColor;
    certification.introduction = introduction || certification.introduction;
    certification.key_1 = key_1 || certification.key_1;
    certification.key_2 = key_2 || certification.key_2;
    certification.key_3 = key_3 || certification.key_3;
    certification.Course_Benefits = Course_Benefits || certification.Course_Benefits;
    certification.Course_Benefits_2 = Course_Benefits_2 || certification.Course_Benefits_2;
    certification.Course_Benefits_3 = Course_Benefits_3 || certification.Course_Benefits_3;
    certification.Road_map = Road_map || certification.Road_map;
    certification.syllabus_pdf = syllabus_pdf || certification.syllabus_pdf;
    
    // Update new fields
    if (parsedRequirements) {
      certification.requirements = {
        ...certification.requirements,
        ...parsedRequirements
      };
    }
    
    if (parsedExamDetails) {
      certification.exam_details = {
        ...certification.exam_details,
        ...parsedExamDetails
      };
    }
    
    if (parsedPolicies) {
      certification.policies = {
        ...certification.policies,
        ...parsedPolicies
      };
    }

    const updatedCertification = await certification.save();
    res.status(200).json(updatedCertification);
  } catch (err) {
    console.error("Error updating certification:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Delete a certification


export const deleteCertification = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the certification by ID
    const certification = await Certification.findById(id);
    if (!certification) {
      return res.status(404).json({ message: "Certification not found" });
    }

    // If the certification has an associated image, delete it from Cloudinary
    if (certification.publicId) {
      await deleteMediaFromCloudinary(certification.publicId); // Use the utility function to delete the media
    }

    // Delete the certification from the database
    await Certification.findByIdAndDelete(id);

    res.status(200).json({ message: "Certification deleted successfully" });
  } catch (err) {
    console.error("Error deleting certification:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get all certifications
export const getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find();
    res.status(200).json(certifications); // Return array directly
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch certifications" });
  }
};

// Get a certification by ID
export const getCertificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const certification = await Certification.findById(id);
    if (!certification) {
      return res.status(404).json({ message: "Certification not found" });
    }
    res.status(200).json(certification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//
export const getCertificationAssets = async (req, res) => {
  const { certificationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(certificationId)) {
    return res.status(400).json({ error: "Invalid certification ID" });
  }

  try {
    const cert = await Certification.findById(certificationId);
    if (!cert) {
      return res.status(404).json({ error: "Certification not found" });
    }

    // Return certification assets
    const assets = {
      imageUrl: cert.imageUrl,
      title: cert.title,
      description: cert.description,
      issuedBy: cert.issuedBy,
      duration: cert.duration,
      validity: cert.validity
    };

    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};



