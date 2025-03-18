const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');
const { auth, instructorAuth } = require('../middleware/auth');

// Get all certifications
router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.find();
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single certification
router.get('/:id', async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    res.json(certification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create certification (protected)
router.post('/', auth, instructorAuth, async (req, res) => {
  const certification = new Certification({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    level: req.body.level,
    duration: req.body.duration,
    examDuration: req.body.examDuration,
    numberOfQuestions: req.body.numberOfQuestions,
    passingScore: req.body.passingScore,
    topics: req.body.topics,
    image: req.body.image,
    instructor: req.user._id,
  });

  try {
    const newCertification = await certification.save();
    res.status(201).json(newCertification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update certification (protected)
router.put('/:id', auth, instructorAuth, async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    // Check if user is the instructor
    if (certification.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this certification' });
    }

    Object.assign(certification, req.body);
    const updatedCertification = await certification.save();
    res.json(updatedCertification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete certification (protected)
router.delete('/:id', auth, instructorAuth, async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    // Check if user is the instructor
    if (certification.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this certification' });
    }

    await certification.remove();
    res.json({ message: 'Certification deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 