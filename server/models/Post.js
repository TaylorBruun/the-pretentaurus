import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PostSchema = new Schema({
    title: { type: String, required: true },
    originalDescription: { type: String, required: true },
    editedDescription: { type: String, required: true },
    numberOfLikes: { type: Number, min: 0, default: 0 },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    likedBy: { type: Array },
    imgUrl: { type: String, default: "https://media.vanityfair.com/photos/5d56eac902bf930008778de7/3:2/w_1998,h_1332,c_limit/obi-wan-ewan-series.jpg" },
}, { timestamps: true, toJSON: { virtuals: true } })

PostSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})

