import { Auth0Provider } from "@bcwdev/auth0provider"
import { commentsService } from "../services/CommentsService"
import { postsService } from "../services/PostsService"
import BaseController from "../utils/BaseController"


export class PostsController extends BaseController {
    constructor() {
        super('api/posts')
        this.router
            .get('', this.getAll)
            .get('/:id/comments', this.getComments)
            .get('/:id', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.edit)
            .put('/:id/likes', this.like)
            .delete('/:id', this.remove)
    }


    async getAll(req, res, next) {
        try {
            let posts = await postsService.getAll()
            return res.send(posts)
        } catch (error) {
            next(error)
        }
    }
    async getComments(req, res, next) {
        try {
            let comments = await commentsService.getAll({ postId: req.params.id })
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const foundPost = await postsService.getById(req.params.id)
            return res.send(foundPost)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            req.body.numberOfLikes = 0
            req.body.creatorId = req.userInfo.id
            let post = await postsService.create(req.body)
            return res.send(post)
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            req.body.id = req.params.id
            req.body.creatorId = req.userInfo.id
            const post = await postsService.edit(req.body)
            return res.send(post)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            let postId = req.params.id
            let userId = req.userInfo.id
            let message = await postsService.remove(postId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }

    async like(req, res, next) {
        try {
            req.body.id = req.params.id
            req.body.creatorId = req.userInfo.id
            let liked = await postsService.like(req.body)
            return res.send(liked)
        } catch (error) {
            next(error)
        }
    }
}
