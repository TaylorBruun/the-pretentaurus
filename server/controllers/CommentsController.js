import { Auth0Provider } from "@bcwdev/auth0provider"
import { commentsService } from "../services/CommentsService"
import BaseController from "../utils/BaseController"

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.edit)
            .put('/:id/likes', this.like)
            .delete('/:id', this.remove)
    }


    async getAll(req, res, next) {
        try {
            let comments = await commentsService.getAll(req.query)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            let comment = await commentsService.getById(req.params.id)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            req.body.numberOfLikes = 0
            req.body.creatorId = req.userInfo.id
            let comment = await commentsService.create(req.body)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            req.body.id = req.params.id
            req.body.creatorId = req.userInfo.id
            const comment = await commentsService.edit(req.body)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async like(req, res, next) {
        try {
            req.body.id = req.params.id
            req.body.creatorId = req.userInfo.id
            let liked = await commentsService.like(req.body)
            return res.send(liked)
        } catch (error) {
            next(error)
        }
    }


    async remove(req, res, next) {
        try {
            let commentId = req.params.id
            let userId = req.userInfo.id
            let message = await commentsService.remove(commentId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}