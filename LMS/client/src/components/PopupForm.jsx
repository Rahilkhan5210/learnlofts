import { useState, useEffect } from 'react';
import axios from 'axios';



const PopupForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Track submission state
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [formData, setFormData] = useState({
    fullName: '',
    whatsappNumber: '',
    email: '',
    desiredCertificate: '',
    isOtherCertificate: false // Add new state to track if "Other" is selected
  });
 

  // Country codes with flags
  const countryCodes = [
    { code: 'IN', name: 'India', dialCode: '+91', flag: 'https://flagcdn.com/w20/in.png' },
    { code: 'US', name: 'USA', dialCode: '+1', flag: 'https://flagcdn.com/w20/us.png' },
    { code: 'GB', name: 'UK', dialCode: '+44', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: 'AE', name: 'UAE', dialCode: '+971', flag: 'https://flagcdn.com/w20/ae.png' },
    { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: 'https://flagcdn.com/w20/sa.png' },
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: 'https://flagcdn.com/w20/ca.png' },
    { code: 'AU', name: 'Australia', dialCode: '+61', flag: 'https://flagcdn.com/w20/au.png' },
    { code: 'SG', name: 'Singapore', dialCode: '+65', flag: 'https://flagcdn.com/w20/sg.png' },
    { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: 'https://flagcdn.com/w20/my.png' },
    { code: 'DE', name: 'Germany', dialCode: '+49', flag: 'https://flagcdn.com/w20/de.png' },
    { code: 'FR', name: 'France', dialCode: '+33', flag: 'https://flagcdn.com/w20/fr.png' },
    { code: 'JP', name: 'Japan', dialCode: '+81', flag: 'https://flagcdn.com/w20/jp.png' },
    // Add more countries as needed
  ];

  useEffect(() => {
    // Only show if not submitted
    if (!submitted) {
      // Show form after 5 seconds initially
      const initialTimer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      return () => clearTimeout(initialTimer);
    }
  }, [submitted]);

  useEffect(() => {
    // Only set reopen timer if not submitted and form is closed
    if (!isVisible && !submitted) {
      const reopenTimer = setTimeout(() => {
        setIsVisible(true);
      }, 300000);

      return () => clearTimeout(reopenTimer);
    }
  }, [isVisible, submitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'desiredCertificate') {
      if (value === 'other') {
        setFormData(prev => ({
          ...prev,
          desiredCertificate: '',
          isOtherCertificate: true
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          desiredCertificate: value,
          isOtherCertificate: false
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCertificateInput = (e) => {
    setFormData(prev => ({
      ...prev,
      desiredCertificate: e.target.value
    }));
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedCountryData = countryCodes.find(country => country.code === selectedCountry);
      const submissionData = {
        ...formData,
        countryCode: selectedCountryData.dialCode,
        country: selectedCountryData.name
      };
      
      // Remove isOtherCertificate from submission data
      delete submissionData.isOtherCertificate;
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'https://learnlofts.onrender.com'}/api/submit-form`, submissionData);
      
      if (response.data.success) {
        alert('Thank you! Your information has been submitted successfully.');
        setIsVisible(false);
        setSubmitted(true);
        setFormData({ 
          fullName: '',
          whatsappNumber: '',
          email: '',
          desiredCertificate: '',
          isOtherCertificate: false
        });
      } else {
        alert(response.data.message || 'Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error submitting form. Please try again.';
      alert(errorMessage);
    }
  };
  

  if (!isVisible) {
    return null;
  }

  const selectedCountryData = countryCodes.find(country => country.code === selectedCountry) || countryCodes[0];

  return (
    <div className="fixed inset-0   flex items-center justify-center p-4 z-50" onClick={() => setIsVisible(false)}>
     
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-4 sm:p-6 rounded-xl shadow-2xl relative w-full max-w-md mx-4 border border-blue-400" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white hover:text-gray-200 text-xl font-bold transition-colors"
          aria-label="Close form"
        >
          &times;
        </button>
        
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Enquire Now</h2>
          <p className="text-blue-100 text-sm sm:text-base">Get information about our certification programs</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/90 placeholder-gray-500 text-sm sm:text-base"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              WhatsApp Number <span className="text-red-400">*</span>
            </label>
            <div className="flex">
              <div className="relative w-32 sm:w-36">
                <select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="appearance-none w-full h-full pl-2 pr-8 py-2 sm:pl-3 sm:py-2.5 rounded-l-lg border border-r-0 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/90 text-gray-800 text-xs sm:text-sm"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} {country.dialCode}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none flex items-center">
                  {selectedCountryData && (
                    <>
                      <img 
                        src={selectedCountryData.flag} 
                        alt={`${selectedCountryData.name} flag`}
                        className="w-4 h-3 sm:w-5 sm:h-auto mr-1"
                      />
                      <span className="text-xs text-gray-600 hidden sm:inline">{selectedCountryData.code}</span>
                    </>
                  )}
                </div>
              </div>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                required
                placeholder="Enter WhatsApp number"
                className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 rounded-r-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/90 placeholder-gray-500 text-sm sm:text-base"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
              className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/90 placeholder-gray-500 text-sm sm:text-base"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Desired Certificate <span className="text-red-400">*</span>
            </label>
            {!formData.isOtherCertificate ? (
              <div className="relative">
                <select
                  name="desiredCertificate"
                  value={formData.desiredCertificate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/90 text-gray-800 text-sm sm:text-base appearance-none"
                >
                  <option value="">Choose Certificate</option>
                  <option value="aws">AWS Certification</option>
                  <option value="azure">Azure Certification</option>
                  <option value="gcp">Google Cloud Certification</option>
                  <option value="cisco">Cisco Certification</option>
                  <option value="comptia">CompTIA Certification</option>
                  <option value="pm">Project Management (PMP)</option>
                  <option value="ceh">CEH Certification</option>
                  <option value="itil">ITIL Certification</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  name="desiredCertificate"
                  value={formData.desiredCertificate}
                  onChange={handleCertificateInput}
                  required
                  placeholder="Enter your desired certificate"
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/90 placeholder-gray-500 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isOtherCertificate: false, desiredCertificate: '' }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2.5 sm:py-3 px-4 rounded-lg font-semibold hover:bg-red-700 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm sm:text-base"
          >
            Get Information
          </button>
        </form>
        
        <div className="mt-3 sm:mt-4 text-center text-blue-100 text-xs">
          We respect your privacy. Your information will not be shared.
        </div>
      </div>
    </div>
  );
};

export default PopupForm;