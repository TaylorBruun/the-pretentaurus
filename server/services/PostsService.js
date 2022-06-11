import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { logger } from "../utils/Logger"


class PostsService {

    async getAll() {
        const posts = await dbContext.Posts.find().sort('roomNumber').populate('creator', 'name')
        //  posts.map(async(p) =>   {
        //     await p.populate('creator', 'name')
        // } )
        return posts
    }
    async create(body) {
        const post = await dbContext.Posts.create(body)
        await post.populate('creator', 'name')
        logger.log(body)
        return post
    }

    async edit(update) {
        let original = await this.getById(update.id)
        if (original.creatorId.toString() !== update.creatorId) {
            throw new Forbidden("You cannot edit this post")
        }
        original.title = update.title || original.title
        original.description = update.originalDescription || original.originalDescription
        original.editedDescription = update.editedDescription || original.editedDescription
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


    async getById(id) {
        const foundPost = await dbContext.Posts.findById(id)
        if (!foundPost) {
            throw new BadRequest('No Post found with that Id')
        }
        await foundPost.populate('creator', 'name')
        return foundPost
    }

    async remove(postId, userId) {
        const post = await this.getById(postId)
        if (post.creatorId.toString() !== userId) {
            throw new Forbidden('You did not create this Post')
        }
        await post.remove()
        return `deleted ${post.title}`
    }
}

export const postsService = new PostsService()