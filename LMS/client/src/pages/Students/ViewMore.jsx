import React from "react";
import { useParams } from "react-router-dom";
import { useGetCertificationByIdQuery } from "../../Features/Api/certificationsApi";

const ViewMore = () => {
  const { id } = useParams(); // Get the certification ID from the URL
  const { data: certification, isLoading, isError } = useGetCertificationByIdQuery(id);

  if (isLoading) return <p>Loading certification details...</p>;
  if (isError) return <p>Failed to load certification details.</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto border rounded-lg shadow-md p-6">
        <img
          src={certification.image}
          alt={certification.title}
          className="w-full h-60 object-cover rounded-md mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{certification.title}</h1>
        <p className="text-sm text-gray-600 mb-4">{certification.category}</p>
        <p className="text-lg text-gray-800 font-bold mb-4">${certification.price}</p>
        <p className="text-sm text-gray-600 mb-4">{certification.duration}</p>
        <p className="text-gray-700">{certification.description}</p>
      </div>
    </div>
  );
};

export default ViewMore;