import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCertificationById, verifyCertification } from '../store/slices/certificationSlice';

const CertificationDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentCertification, loading, error } = useSelector((state) => state.certifications);

  useEffect(() => {
    dispatch(fetchCertificationById(id));
  }, [dispatch, id]);

  const handleVerify = async () => {
    await dispatch(verifyCertification(id));
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!currentCertification) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Certification not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{currentCertification.title}</h1>
          {currentCertification.verified && (
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
              Verified
            </span>
          )}
        </div>
        
        <p className="text-gray-600 mb-6">{currentCertification.description}</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Certification Details</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Price:</span> ${currentCertification.price}</p>
              <p><span className="font-medium">Duration:</span> {currentCertification.duration}</p>
              <p><span className="font-medium">Level:</span> {currentCertification.level}</p>
              <p><span className="font-medium">Issuing Organization:</span> {currentCertification.issuingOrganization}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-2">
              {currentCertification.requirements?.map((requirement, index) => (
                <li key={index} className="text-gray-600">{requirement}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Certification Process</h2>
          <div className="space-y-4">
            {currentCertification.process?.map((step, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Step {index + 1}: {step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button className="btn-primary px-8">
            Purchase Certification
          </button>
          {!currentCertification.verified && (
            <button
              onClick={handleVerify}
              className="px-8 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50"
            >
              Verify Certification
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationDetail; 