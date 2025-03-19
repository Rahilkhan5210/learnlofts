import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCourseById } from '../store/slices/courseSlice';

const CourseDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentCourse, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourseById(id));
  }, [dispatch, id]);

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

  if (!currentCourse) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Course not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">{currentCourse.title}</h1>
        <p className="text-gray-600 mb-6">{currentCourse.description}</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Course Details</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Price:</span> ${currentCourse.price}</p>
              <p><span className="font-medium">Duration:</span> {currentCourse.duration}</p>
              <p><span className="font-medium">Level:</span> {currentCourse.level}</p>
              <p><span className="font-medium">Instructor:</span> {currentCourse.instructor}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
            <ul className="list-disc list-inside space-y-2">
              {currentCourse.learningObjectives?.map((objective, index) => (
                <li key={index} className="text-gray-600">{objective}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
          <div className="space-y-4">
            {currentCourse.curriculum?.map((module, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Module {index + 1}: {module.title}</h3>
                <p className="text-gray-600">{module.description}</p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  {module.lessons?.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} className="text-gray-600">{lesson}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="btn-primary px-8">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail; 