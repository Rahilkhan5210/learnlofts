import React, { useState } from "react";
import { useCreateCertificationMutation } from "../../../Features/Api/certificationsApi";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  requirements: {
    experience: [
      "5 years total work experience (1 year in decision-making role)",
      "Education waivers:",
      "Associate degree - 1 year waived",
      "Bachelor's degree - 3 years waived",
      "Graduate degree - 4 years waived"
    ],
    decision_making: "Defined as authority to execute/control processes with outcome responsibility"
  },
  exam_details: {
    format: "145 multiple-choice questions (135 scored)",
    duration: "4 hours 18 minutes (CBT)",
    delivery: [
      "Computer-Based Testing (Prometric)",
      "Paper-Based Testing (4 hours)"
    ],
    windows: "July and November annually",
    retake_fee: "333.00 (valid for 2 years)"
  },
  policies: {
    materials: "Open-book (bring approved references)",
    id_requirements: "Government-issued photo ID with signature",
    refund_policy: "130.00 processing fee for denied applications"
  }
};

const AddCertifications = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    tag: "",
    tagColor: "",
    introduction: "",
    key_1: "",
    key_2: "",
    key_3: "",
    Course_Benefits: "",
    Course_Benefits_2: "",
    Course_Benefits_3: "",
    Road_map: [],
    course_content: [],
    file: null,
    syllabus_pdf: "",
    requirements: defaultValues.requirements,
    exam_details: defaultValues.exam_details,
    policies: defaultValues.policies
  });

  const [createCertification] = useCreateCertificationMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    });
  };

  const handleArrayChange = (section, field, index, value) => {
    const newArray = [...formData[section][field]];
    newArray[index] = value;
    handleNestedChange(section, field, newArray);
  };

  const addArrayItem = (section, field) => {
    const newArray = [...formData[section][field], ""];
    handleNestedChange(section, field, newArray);
  };

  const removeArrayItem = (section, field, index) => {
    const newArray = formData[section][field].filter((_, i) => i !== index);
    handleNestedChange(section, field, newArray);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Ensure arrays are not empty before submission
      const dataToSubmit = {
        ...formData,
        requirements: {
          ...formData.requirements,
          experience: formData.requirements.experience.length ? 
            formData.requirements.experience : 
            defaultValues.requirements.experience
        },
        exam_details: {
          ...formData.exam_details,
          delivery: formData.exam_details.delivery.length ? 
            formData.exam_details.delivery : 
            defaultValues.exam_details.delivery
        }
      };

      // Add all fields to FormData
      Object.keys(dataToSubmit).forEach(key => {
        if (key === 'file') return; // Skip file, handle it separately
        
        if (typeof dataToSubmit[key] === 'object') {
          formDataToSend.append(key, JSON.stringify(dataToSubmit[key]));
        } else {
          formDataToSend.append(key, dataToSubmit[key]);
        }
      });
      
      // File upload
      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      // Log the data being sent
      console.log("Submitting certification data:", {
        ...Object.fromEntries(formDataToSend),
        requirements: JSON.parse(formDataToSend.get('requirements')),
        exam_details: JSON.parse(formDataToSend.get('exam_details')),
        policies: JSON.parse(formDataToSend.get('policies'))
      });
      
      const response = await createCertification(formDataToSend).unwrap();
      console.log("Server response:", response);

      alert("Certification created successfully!");
      navigate("/admin/certifications");
    } catch (error) {
      console.error("Failed to create certification:", error);
      alert("Failed to create certification: " + (error.data?.error || error.message || 'Unknown error'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4" encType="multipart/form-data">
      <h1 className="text-2xl font-bold mb-4">Add Certification</h1>
      
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          rows="3"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block mb-2">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="duration" className="block mb-2">Duration:</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tag" className="block mb-2">Tag:</label>
        <input
          type="text"
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tagColor" className="block mb-2">Tag Color:</label>
        <input
          type="text"
          id="tagColor"
          name="tagColor"
          value={formData.tagColor}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      {/* Requirements Section */}
      <div className="mb-6 border-t pt-4">
        <h2 className="text-xl font-semibold mb-4">Requirements</h2>
        
        {/* Experience Requirements */}
        <div className="mb-4">
          <label className="block mb-2">Experience Requirements:</label>
          {formData.requirements.experience.map((exp, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={exp}
                onChange={(e) => handleArrayChange('requirements', 'experience', index, e.target.value)}
                className="border p-2 flex-grow"
                placeholder="Enter experience requirement"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('requirements', 'experience', index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('requirements', 'experience')}
            className="bg-green-500 text-white px-3 py-1 rounded mt-2"
          >
            Add Experience Requirement
          </button>
        </div>

        {/* Decision Making */}
        <div className="mb-4">
          <label className="block mb-2">Decision Making Role:</label>
          <textarea
            value={formData.requirements.decision_making}
            onChange={(e) => handleNestedChange('requirements', 'decision_making', e.target.value)}
            className="border p-2 w-full"
            rows="3"
          />
        </div>
      </div>

      {/* Exam Details Section */}
      <div className="mb-6 border-t pt-4">
        <h2 className="text-xl font-semibold mb-4">Exam Details</h2>
        
        {/* Format */}
        <div className="mb-4">
          <label className="block mb-2">Exam Format:</label>
          <input
            type="text"
            value={formData.exam_details.format}
            onChange={(e) => handleNestedChange('exam_details', 'format', e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="block mb-2">Exam Duration:</label>
          <input
            type="text"
            value={formData.exam_details.duration}
            onChange={(e) => handleNestedChange('exam_details', 'duration', e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* Delivery Methods */}
        <div className="mb-4">
          <label className="block mb-2">Delivery Methods:</label>
          {formData.exam_details.delivery.map((method, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={method}
                onChange={(e) => handleArrayChange('exam_details', 'delivery', index, e.target.value)}
                className="border p-2 flex-grow"
                placeholder="Enter delivery method"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('exam_details', 'delivery', index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('exam_details', 'delivery')}
            className="bg-green-500 text-white px-3 py-1 rounded mt-2"
          >
            Add Delivery Method
          </button>
        </div>

        {/* Windows */}
        <div className="mb-4">
          <label className="block mb-2">Exam Windows:</label>
          <input
            type="text"
            value={formData.exam_details.windows}
            onChange={(e) => handleNestedChange('exam_details', 'windows', e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* Retake Fee */}
        <div className="mb-4">
          <label className="block mb-2">Retake Fee:</label>
          <input
            type="text"
            value={formData.exam_details.retake_fee}
            onChange={(e) => handleNestedChange('exam_details', 'retake_fee', e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      </div>

      {/* Policies Section */}
      <div className="mb-6 border-t pt-4">
        <h2 className="text-xl font-semibold mb-4">Policies</h2>
        
        {/* Materials */}
        <div className="mb-4">
          <label className="block mb-2">Materials Policy:</label>
          <textarea
            value={formData.policies.materials}
            onChange={(e) => handleNestedChange('policies', 'materials', e.target.value)}
            className="border p-2 w-full"
            rows="3"
          />
        </div>

        {/* ID Requirements */}
        <div className="mb-4">
          <label className="block mb-2">ID Requirements:</label>
          <textarea
            value={formData.policies.id_requirements}
            onChange={(e) => handleNestedChange('policies', 'id_requirements', e.target.value)}
            className="border p-2 w-full"
            rows="3"
          />
        </div>

        {/* Refund Policy */}
        <div className="mb-4">
          <label className="block mb-2">Refund Policy:</label>
          <textarea
            value={formData.policies.refund_policy}
            onChange={(e) => handleNestedChange('policies', 'refund_policy', e.target.value)}
            className="border p-2 w-full"
            rows="3"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="file" className="block mb-2">Upload File:</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          className="border p-2 w-full"
          required
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Certification
      </button>
    </form>
  );
};

export default AddCertifications;