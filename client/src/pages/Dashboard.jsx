import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCourses } from '../store/slices/courseSlice';
import { fetchCertifications } from '../store/slices/certificationSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);
  const { certifications } = useSelector((state) => state.certifications);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchCertifications());
  }, [dispatch]);

  // Filter enrolled courses and certifications for the current user
  const enrolledCourses = courses.filter(course => 
    course.enrolledStudents?.includes(user?._id)
  );
  const userCertifications = certifications.filter(cert => 
    cert.issuedTo?.includes(user?._id)
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-gray-600">Manage your learning journey</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Enrolled Courses */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
          {enrolledCourses.length === 0 ? (
            <div className="card">
              <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="btn-primary">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course._id} className="card">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-600 font-semibold">
                      Progress: {course.progress || 0}%
                    </span>
                    <Link
                      to={`/courses/${course._id}`}
                      className="btn-primary"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Certifications</h2>
          {userCertifications.length === 0 ? (
            <div className="card">
              <p className="text-gray-600 mb-4">You haven't earned any certifications yet.</p>
              <Link to="/certifications" className="btn-primary">
                View Certifications
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {userCertifications.map((certification) => (
                <div key={certification._id} className="card">
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
                      Issued: {new Date(certification.issuedDate).toLocaleDateString()}
                    </span>
                    <Link
                      to={`/certifications/${certification._id}`}
                      className="btn-primary"
                    >
                      View Certificate
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 