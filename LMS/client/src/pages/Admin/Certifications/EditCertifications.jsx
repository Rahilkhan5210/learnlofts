import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCertificationByIdQuery, useUpdateCertificationMutation } from "../../../Features/Api/certificationsApi";

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

const EditCertifications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: certification, isLoading, isError } = useGetCertificationByIdQuery(id);
  const [updateCertification] = useUpdateCertificationMutation();

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
    requirements: defaultValues.requirements,
    exam_details: defaultValues.exam_details,
    policies: defaultValues.policies
  });

  useEffect(() => {
    if (certification) {
      setFormData({
        ...certification,
        requirements: {
          experience: certification.requirements?.experience || defaultValues.requirements.experience,
          decision_making: certification.requirements?.decision_making || defaultValues.requirements.decision_making
        },
        exam_details: {
          format: certification.exam_details?.format || defaultValues.exam_details.format,
          duration: certification.exam_details?.duration || defaultValues.exam_details.duration,
          delivery: certification.exam_details?.delivery || defaultValues.exam_details.delivery,
          windows: certification.exam_details?.windows || defaultValues.exam_details.windows,
          retake_fee: certification.exam_details?.retake_fee || defaultValues.exam_details.retake_fee
        },
        policies: certification.policies || defaultValues.policies,
        Road_map: certification.Road_map || []
      });
    }
  }, [certification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Add all fields to FormData
      Object.keys(formData).forEach(key => {
        if (typeof formData[key] === 'object') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      console.log("Updating certification with data:", {
        ...Object.fromEntries(formDataToSend),
        requirements: JSON.parse(formDataToSend.get('requirements')),
        exam_details: JSON.parse(formDataToSend.get('exam_details')),
        policies: JSON.parse(formDataToSend.get('policies'))
      });

      await updateCertification({ id, formData: formDataToSend });
      alert("Certification updated successfully!");
      navigate("/admin/certifications");
    } catch (error) {
      console.error("Failed to update certification:", error);
      alert("Failed to update certification: " + (error.data?.error || error.message || "Please try again."));
    }
  };

  if (isLoading) return <p>Loading certification details...</p>;
  if (isError) return <p>Failed to load certification details. Please try again later.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Certification</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="3"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tag</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tag Color</label>
          <input
            type="text"
            name="tagColor"
            value={formData.tagColor}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Introduction</label>
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Key 1</label>
          <input
            type="text"
            name="key_1"
            value={formData.key_1}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Key 2</label>
          <input
            type="text"
            name="key_2"
            value={formData.key_2}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Key 3</label>
          <input
            type="text"
            name="key_3"
            value={formData.key_3}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Course Benefits</label>
          <textarea
            name="Course_Benefits"
            value={formData.Course_Benefits}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Course Benefits 2</label>
          <textarea
            name="Course_Benefits_2"
            value={formData.Course_Benefits_2}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Course Benefits 3</label>
          <textarea
            name="Course_Benefits_3"
            value={formData.Course_Benefits_3}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Road Map</label>
          <textarea
            name="Road_map"
            value={formData.Road_map}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="3"
          ></textarea>
        </div>

        {/* Requirements Section */}
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          
          {/* Experience Requirements */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Experience Requirements:</label>
            {formData.requirements.experience.map((exp, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={exp}
                  onChange={(e) => handleArrayChange('requirements', 'experience', index, e.target.value)}
                  className="flex-grow border border-gray-300 p-2 rounded"
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
            <label className="block text-sm font-medium mb-2">Decision Making Role:</label>
            <textarea
              value={formData.requirements.decision_making}
              onChange={(e) => handleNestedChange('requirements', 'decision_making', e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              rows="3"
            />
          </div>
        </div>

        {/* Exam Details Section */}
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-4">Exam Details</h2>
          
          {/* Format */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Format:</label>
            <input
              type="text"
              value={formData.exam_details.format}
              onChange={(e) => handleNestedChange('exam_details', 'format', e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Duration:</label>
            <input
              type="text"
              value={formData.exam_details.duration}
              onChange={(e) => handleNestedChange('exam_details', 'duration', e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Delivery Methods */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Delivery Methods:</label>
            {formData.exam_details.delivery.map((method, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={method}
                  onChange={(e) => handleArrayChange('exam_details', 'delivery', index, e.target.value)}
                  className="flex-grow border border-gray-300 p-2 rounded"
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
            <label className="block text-sm font-medium mb-2">Exam Windows:</label>
            <input
              type="text"
              value={formData.exam_details.windows}
              onChange={(e) => handleNestedChange('exam_details', 'windows', e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Retake Fee */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Retake Fee:</label>
            <input
              type="text"
              value={formData.exam_details.retake_fee}
              onChange={(e) => handleNestedChange('exam_details', 'retake_fee', e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>

        {/* Policies Section */}
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-4">Policies</h2>
          
          {/* Materials */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Materials Policy:</label>
            <textarea
              value={formData.policies.materials}
              onChange={(e) => handleNestedChange('policies', 'materials', e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              rows="3"
            />
          </div>

          {/* ID Requirements */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ID Requirements:</label>
            <textarea
              value={formData.policies.id_requirements}
              onChange={(e) => handleNestedChange('policies', 'id_requirements', e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              rows="3"
            />
          </div>

          {/* Refund Policy */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Refund Policy:</label>
            <textarea
              value={formData.policies.refund_policy}
              onChange={(e) => handleNestedChange('policies', 'refund_policy', e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              rows="3"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Certification
        </button>
      </form>
    </div>
  );
};

export default EditCertifications;