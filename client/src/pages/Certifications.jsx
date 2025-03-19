import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCertifications } from '../store/slices/certificationSlice';

const Certifications = () => {
  const dispatch = useDispatch();
  const { certifications, loading, error } = useSelector((state) => state.certifications);

  useEffect(() => {
    dispatch(fetchCertifications());
  }, [dispatch]);

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Professional Certifications</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((certification) => (
          <div key={certification._id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{certification.title}</h3>
              {certification.verified && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Verified
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-4">{certification.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-primary-600 font-semibold">
                ${certification.price}
              </span>
              <Link
                to={`/certifications/${certification._id}`}
                className="btn-primary"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications; 