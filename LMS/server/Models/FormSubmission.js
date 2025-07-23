import mongoose from 'mongoose';

const formSubmissionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  whatsappNumber: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  desiredCertificate: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('FormSubmission', formSubmissionSchema); 