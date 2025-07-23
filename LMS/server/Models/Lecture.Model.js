import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    lectureTitle: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: false, // Allow it to be optional initially
        validate: {
            validator: function(v) {
                // Allow null/empty or valid URL
                if (!v) return true;
                try {
                    new URL(v);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            message: props => `${props.value} is not a valid video URL!`
        }
    },
    publicId: {
        type: String,
        required: false // Allow it to be optional initially
    },
    isPreviewFree: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            // Ensure videoUrl is always returned as a string
            ret.videoUrl = ret.videoUrl || '';
            return ret;
        }
    }
});

// Middleware to validate videoUrl before saving
lectureSchema.pre('save', function(next) {
    if (this.isModified('videoUrl') && this.videoUrl) {
        // Ensure the URL is properly formatted
        try {
            new URL(this.videoUrl);
        } catch (e) {
            next(new Error('Invalid video URL'));
            return;
        }
    }
    next();
});

export const Lecture = mongoose.model("Lecture", lectureSchema);