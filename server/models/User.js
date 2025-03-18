const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'instructor', 'admin'],
    default: 'user'
  },
  profileImage: {
    type: String
  },
  bio: {
    type: String,
    maxlength: 500
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  enrolledCertifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certification'
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'wishlistType'
  }],
  wishlistType: [{
    type: String,
    enum: ['Course', 'Certification']
  }],
  orders: [{
    items: [{
      item: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'itemType'
      },
      itemType: {
        type: String,
        enum: ['Course', 'Certification']
      },
      price: Number
    }],
    totalAmount: Number,
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
      default: 'Pending'
    },
    paymentMethod: String,
    orderDate: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Update the updatedAt timestamp before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User; 