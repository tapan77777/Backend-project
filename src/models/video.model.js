import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const videoSchema = new mongoose.Schema(
    {
    videoFile: {
        type: String, //cloudinary 
        required: true,
    },
    title: {
        type: String, 
        required: true,
    },
    thumbnil: {
        type: String, //cloudinary 
        required: true,
    },
    duration: {
        type: Number, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    views:{
        type:Number,
        defalut: 0,
    },
    isPublic: {
        type: Boolean,
        default:true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }


    },
{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)