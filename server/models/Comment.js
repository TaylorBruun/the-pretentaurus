import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema({
    originalDescription: { type: String, required: true },
    editedDescription: { type: String },
    numberOfLikes: { type: Number, min: 0, default: 0 },
    likedBy: { type: Array },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps: true, toJSON: { virtuals: true } })


CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})