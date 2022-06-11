import { ProxyState } from "../AppState.js";
import { api } from "./AxiosService.js";
import { Comment } from "../Models/Comment.js";


class CommentsService {

    async getComments() {
        const res = await api.get('api/comments')
        console.log(res.data);
        ProxyState.comments = res.data.map(c => new Comment(c))
        console.log(ProxyState.comments);
    }
    async createComment(data) {
        const res = await api.post('api/comments', data)
        console.log(res.data);
        ProxyState.currentComments = [...ProxyState.currentComments, new Comment(res.data)]

    }

    async deleteComment(id) {
        const res = await api.delete('api/comments/' + id)
        console.log(res.data);
        ProxyState.currentComments = ProxyState.currentComments.filter(c => c.id !== id)
    }

    async likeComment(id) {
        const res = await api.put('api/comments/' + id + '/likes')
        console.log(res.data);
        ProxyState.currentComments.find(c => c.id == id)
        console.log(ProxyState.currentComments.find(c => c.id == id));

    }

}

export const commentsService = new CommentsService()