import React from "react";
import { Outlet, Link } from "react-router-dom";

const CertificationsTab = () => {
  return (
    <div>
      <nav className="mb-4">
        <Link to="/admin/certifications" className="mr-4 text-blue-500">
          View Certifications
        </Link>
        <Link to="/admin/certifications/add-certification" className="text-blue-500">
          Add Certification
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};
export default CertificationsTab;