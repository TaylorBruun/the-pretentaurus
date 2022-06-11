import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";



class CommentsService {

    async getAll(query = {}) {
        return await dbContext.Comments.find(query).populate('creator', 'name')
    }

    async getById(id) {
        const foundComment = await dbContext.Comments.findById(id)
        if (!foundComment) {
            throw new BadRequest("No comments with that Id")
        }
        await foundComment.populate('creator', 'name')
        return foundComment
    }

    async create(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator', 'name')
        return comment
    }

    async edit(update) {
        let original = await this.getById(update.id)
        if (original.creatorId.toString() !== update.creatorId) {
            throw new Forbidden("You did not create this comment")
        }
        original.originalDescription = update.originalDescription || original.originalDescription
        original.editedDescription = update.editedDescription || original.originalDescription
        original.numberOfLikes = update.numberOfLikes || original.numberOfLikes


        await original.save()

        return original
    }

    async like(body) {
        let original = await this.getById(body.id)
        let found = original.likedBy.find(id => id == body.creatorId)
        if (!found) {
            original.numberOfLikes++
            original.likedBy.push(body.creatorId)
        } else {
            original.numberOfLikes--
            original.likedBy = original.likedBy.filter(id => id != body.creatorId)
        }
        await original.save()
        return original
    }

    async remove(commentId, userId) {
        const comment = await this.getById(commentId)
        if (comment.creatorId.toString() !== userId) {
            throw new Forbidden("you did not create this comment")
        }
        await comment.remove()
        return `deleted your comment`
    }
}

export const commentsService = new CommentsService()