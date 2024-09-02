import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        address: [{
            region: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            town: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            phoneNumber: {
                type: String,
                required: true,
            },
        }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        profilePicture: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving the user model
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();

        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to match password
userSchema.methods.matchPassword = async function (enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        throw new Error(`Error comparing passwords: ${error.message}`);
    }
};

const User = mongoose.model("User", userSchema);

export default User;
