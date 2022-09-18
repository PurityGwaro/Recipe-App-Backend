import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    }
});

export default mongoose.model("Recipe", recipeSchema);