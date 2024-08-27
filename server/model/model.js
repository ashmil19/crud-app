import mongoose from "mongoose"

const crudModel = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

export default mongoose.model('crudModel', crudModel)