import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        text : {
            type : String,
            required : true,
            unique : true
        },
        tags : {
            type : Array,
            default : []
        },
        viewsCounter : {
            type : Number,
            default : 0
        },
        user : {
            type : mongoose.Types.ObjectId,
            ref : 'User',
            required : true
        },
        imageUrl : String
    },
    {
        timestamps : true
    }
);

export default mongoose.model('Post', PostSchema);