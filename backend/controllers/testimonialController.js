import Testimonial from "../models/testimonialModel.js";

// Create a new testimonial
export const createTestimonial = async (req, res) => {
    try {
        const { userId, message } = req.body;

        // Create the testimonial
        const newTestimonial = new Testimonial({
            user: userId,
            message,
        });

        await newTestimonial.save();
        res.status(201).json({
            status: "success",
            message: "Testimonial created successfully",
            testimonial: newTestimonial,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to create testimonial",
            error: error.message,
        });
    }
};

// Get three random testimonials
export const getRandomTestimonials = async (req, res) => {
    try {
        // Fetch random testimonials
        const testimonials = await Testimonial.aggregate([{ $sample: { size: 3 } }]);

        // Optionally, if you need to populate user details
        const populatedTestimonials = await Promise.all(
            testimonials.map(async (testimonial) => {
                // Populate both name and profilePicture fields from the user document
                const populatedTestimonial = await Testimonial.findById(testimonial._id)
                    .populate({
                        path: 'user',
                        select: 'name profilePicture'
                    });
                return populatedTestimonial;
            })
        );

        res.json({
            status: "success",
            testimonials: populatedTestimonials,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch testimonials",
            error: error.message,
        });
    }
};

export const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().populate({
            path: 'user',
            select: 'name profilePicture'
        });

        res.json({
            status: "success",
            testimonials: testimonials,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch testimonials",
            error: error.message,
        });
    }
}

export const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the testimonial by ID
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

        if (!deletedTestimonial) {
            return res.status(404).json({
                status: "error",
                message: "Testimonial not found",
            });
        }

        res.json({
            status: "success",
            message: "Testimonial deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Failed to delete testimonial",
            error: error.message,
        });
    }
};
