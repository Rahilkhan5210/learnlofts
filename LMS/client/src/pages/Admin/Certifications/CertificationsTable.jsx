import React from "react";
import { useGetAllCertificationsQuery, useDeleteCertificationMutation } from "../../../Features/Api/certificationsApi";
import { Link } from "react-router-dom";

const CertificationsTable = () => {
  const { data: certifications, isLoading, isError } = useGetAllCertificationsQuery();
  const [deleteCertification, { isLoading: isDeleting }] = useDeleteCertificationMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      try {
        await deleteCertification(id).unwrap(); // Ensure the mutation is unwrapped to handle errors
        alert("Certification deleted successfully!");
      } catch (error) {
        console.error("Failed to delete certification:", error);
        alert("Failed to delete certification. Please try again.");
      }
    }
  };

  if (isLoading) return <p>Loading certifications...</p>;
  if (isError) return <p>Failed to load certifications. Please try again later.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Certifications</h1>
      <Link to="/admin/certifications/add-certification" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add New Certification
      </Link>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Duration</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {certifications?.map((cert) => (
            <tr key={cert._id}>
              <td className="border border-gray-300 p-2">{cert.title}</td>
              <td className="border border-gray-300 p-2">{cert.category}</td>
              <td className="border border-gray-300 p-2">${cert.price}</td>
              <td className="border border-gray-300 p-2">{cert.duration}</td>
              <td className="border border-gray-300 p-2">
                <Link to={`/admin/certifications/edit-certification/${cert._id}`} className="text-blue-500 mr-2">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(cert._id)}
                  className={`text-red-500 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CertificationsTable;