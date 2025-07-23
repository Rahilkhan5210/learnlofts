import FormSubmission from '../Models/FormSubmission.js';

export const submitForm = async (req, res) => {
  try {
    const { fullName, whatsappNumber, email, desiredCertificate, countryCode, country } = req.body;

    // Validate required fields
    if (!fullName || !whatsappNumber || !email || !desiredCertificate || !countryCode || !country) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        error: 'Missing required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
        error: 'Invalid email'
      });
    }

    // Create new form submission
    const formSubmission = new FormSubmission({
      fullName,
      whatsappNumber,
      countryCode,
      country,
      email,
      desiredCertificate
    });

    // Save to database
    await formSubmission.save();

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: formSubmission
    });
  } catch (error) {
    console.error('Error in form submission:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting form',
      error: error.message
    });
  }
}; 